import os

class Config:
    SQLALCHEMY_DATABASE_URI = (
        "mysql+mysqlconnector://cc5002:programacionweb@localhost:3306/tarea2"
        "?charset=utf8mb4&use_unicode=1"
    )
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "use_unicode": True,
            "charset": "utf8mb4",
            "collation": "utf8mb4_general_ci"
        }
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)
