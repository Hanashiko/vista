import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///quests.db'
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    ALLOWED_HOSTS = ["*"]
    PORT = 5000
    HOST = '192.168.0.106'
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    MAIL_SERVER = 'smtp.example.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or '09d78f53-6609-4e02-9253-d73645fc1229'