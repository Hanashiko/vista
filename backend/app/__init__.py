import logging
from flask import Flask
from .config import Config
from .extensions import db, migrate, bcrypt, login_manager, jwt
from .models import User, RevokedToken, Quest, Task, UserQuest, Rating
from .routes import auth_bp, profile_bp, quest_bp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
login_manager.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(quest_bp)