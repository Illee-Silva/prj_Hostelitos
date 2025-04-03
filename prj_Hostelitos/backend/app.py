from flask import Flask, jsonify, Response
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import json_util
import os
import logging

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        app.logger.debug("Iniciando conexão com MongoDB...")
        
        # Testar conexão
        client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
        client.server_info()  # Força uma operação para testar a conexão
        app.logger.debug("Conexão com MongoDB estabelecida com sucesso!")

        # Acessar banco e coleção
        db = client[os.getenv("DB_NAME")]
        collection = db[os.getenv("COLLECTION_NAME")]
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
