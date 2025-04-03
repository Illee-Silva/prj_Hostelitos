from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Adicionei CORS
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os
from typing import List

# Modelo Pydantic opcional (recomendado para validação)
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

# Configure CORS - Essencial para comunicação com frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção restrinja aos domínios corretos
    allow_methods=["*"],
    allow_headers=["*"],
)
# Conexão com MongoDB
# Certifique-se de que o arquivo .env contém a variável MONGO_URI
client = MongoClient(os.getenv("MONGO_URI"))
db = client["sample_mflix"]

# Modelo Pydantic para validação
class CommentCreate(BaseModel):
    name: str
    email: str
    text: str

class CommentResponse(CommentCreate):
    id: str

@app.get("/comments", response_model=List[CommentResponse])  # Usando response model
async def listar_comentarios():
    try:
        comments = []
        # Convertendo ObjectId para string
        for comment in db.comments.find().limit(1):  # Adicionei limite para segurança
            comment["_id"] = str(comment["_id"])
            comments.append(comment)
        return comments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/comments", response_model=CommentResponse)
async def agregar_comentario(comment: CommentCreate):  # Usando modelo Pydantic
    try:
        result = db.comments.insert_one(comment.dict())
        new_comment = db.comments.find_one({"_id": result.inserted_id})
        new_comment["_id"] = str(new_comment["_id"])
        return new_comment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))