from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Configurações iniciais
load_dotenv()

app = Flask(__name__)

CORS(app)  # Permite requisições do frontend

# Conexão com MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = "sample_mflix"
collection = "comments"

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        data = list(collection.find({}, {'_id': 0}).limit(10))  # Pega 10 documentos
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)