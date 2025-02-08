import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # DEBUG = True
    ALLOWED_HOSTS = ["*"]
    DEBUG = os.getenv("DEBUG", "False") == "True"
    # PORT = 5000
    HOST = os.getenv("HOST","0.0.0.0")
    PORT = int(os.getenv("PORT", 5000))
    # HOST = '192.168.90.16'
    # HOST = '192.168.0.106'
    UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    UPLOAD_URL = f'http://{HOST}:{PORT}/uploads'