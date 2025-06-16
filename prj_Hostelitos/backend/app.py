from flask import Flask, jsonify, Response, request, send_from_directory
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import json_util
from bson.objectid import ObjectId
import os
import logging
import werkzeug
import base64

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

load_dotenv()
app = Flask(__name__)
CORS(app)

# Defina manualmente o nome do banco e da coleção aqui
DB_NAME = "hostelitos"  # Exemplo
COLLECTION_NAME = "users"  # Exemplo

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../frontend/img')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        app.logger.debug("Iniciando conexão com MongoDB...")
        
        # Testar conexão
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        client.server_info()  # Força uma operação para testar a conexão
        app.logger.debug("Conexão com MongoDB estabelecida com sucesso!")

        # Acessar banco e coleção
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        app.logger.debug(f"Acessando coleção: {collection.name}")

        data = list(collection.find({}).limit(100)) #Limita a quantidade de documentos

        # Executar query
        return Response(

            json_util.dumps({'success': True, 'data': data}),
            mimetype='application/json'
            
        )
    
    except Exception as e:

        app.logger.error("ERRO CRÍTICO:", exc_info=True)

        return Response(

            json_util.dumps({'success': False, 'error': str(e)}),
            mimetype='application/json',
            status=500

        ), 500

@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        if not name or not email:
            return jsonify

        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        # Verifica se já existe usuário com o mesmo email
        if collection.find_one({'email': email}):
            return jsonify({'success': False, 'error': 'Email já cadastrado'}), 409

        user = {'name': name, 'email': email}
        collection.insert_one(user)
        return jsonify({'success': True, 'user': user}), 201
    except Exception as e:
        app.logger.error("Erro ao criar usuário:", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_user_by_email():
    email = request.args.get('email')
    if not email:
        return jsonify({'success': False, 'error': 'Email não fornecido'}), 400
    try:
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        user = collection.find_one({'email': email})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify({'success': True, 'user': user})
        else:
            return jsonify({'success': False, 'error': 'Usuário não encontrado'}), 404
    except Exception as e:
        app.logger.error("Erro ao buscar usuário:", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    try:
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['rooms']
        rooms = list(collection.find({}))
        for room in rooms:
            room['_id'] = str(room['_id'])
        return jsonify({'success': True, 'rooms': rooms})
    except Exception as e:
        app.logger.error("Erro ao buscar quartos:", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/rooms', methods=['POST'])
def create_room():
    try:
        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'Imagem é obrigatória'}), 400
        image = request.files['image']
        type_ = request.form.get('type')
        description = request.form.get('description')
        price = request.form.get('price')
        max_guests = request.form.get('max_guests')
        if not all([type_, description, price, image, max_guests]):
            return jsonify({'success': False, 'error': 'Campos obrigatórios faltando'}), 400
        # Salva a imagem como base64 no banco
        image_bytes = image.read()
        image_b64 = base64.b64encode(image_bytes).decode('utf-8')
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['rooms']
        room = {
            'type': type_,
            'description': description,
            'price': float(price),
            'image': image_b64,
            'max_guests': int(max_guests),
            'reserved': False
        }
        collection.insert_one(room)
        room['_id'] = str(room['_id'])
        return jsonify({'success': True, 'room': room}), 201
    except Exception as e:
        app.logger.error("Erro ao cadastrar quarto:", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/reserve', methods=['POST'])
@cross_origin(origins=["http://localhost:5173"], methods=["POST", "OPTIONS"])
def reserve_room():
    try:
        data = request.get_json()
        room_id = data.get('room_id')
        user_name = data.get('user_name')
        user_email = data.get('user_email')
        if not room_id or not user_name or not user_email:
            return jsonify({'success': False, 'error': 'Dados incompletos'}), 400
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['rooms']
        # Atualiza o quarto, marcando como reservado
        result = collection.update_one(
            {'_id': ObjectId(room_id), 'reserved': {'$ne': True}},
            {'$set': {'reserved': True, 'reserved_by': {'name': user_name, 'email': user_email}}}
        )
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Quarto já reservado ou não encontrado'}), 409
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error("Erro ao reservar quarto:", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/reservations', methods=['GET'])
@cross_origin(origins=["http://localhost:5173"], methods=["GET"])
def get_reservations():
    try:
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['rooms']
        rooms = list(collection.find({'reserved': True}))
        for room in rooms:
            room['_id'] = str(room['_id'])
        return jsonify({'success': True, 'reservations': rooms})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/cancel-reservation', methods=['POST'])
@cross_origin(origins=["http://localhost:5173"], methods=["POST", "OPTIONS"])
def cancel_reservation():
    try:
        data = request.get_json()
        room_id = data.get('room_id')
        if not room_id:
            return jsonify({'success': False, 'error': 'ID do quarto não informado'}), 400
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['rooms']
        result = collection.update_one({'_id': ObjectId(room_id)}, {'$set': {'reserved': False}, '$unset': {'reserved_by': ""}})
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Reserva não encontrada'}), 404
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/img/<filename>')
def serve_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/test-mongo', methods=['GET'])
@cross_origin(origins=["http://localhost:5173"], methods=["GET"])
def test_mongo():
    try:
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        client.server_info()
        return jsonify({'success': True, 'message': 'Conexão com MongoDB OK'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
