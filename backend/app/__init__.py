import logging
from logging.handlers import RotatingFileHandler

from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import bcrypt, db, jwt, login_manager, migrate, swagger
from .models import Quest, Rating, RevokedToken, Task, User, UserQuest
from .routes import (auth_bp, backup_bp, profile_bp, progress_bp, quest_bp,
    rating_bp, stats_bp, task_bp, user_bp)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
login_manager.init_app(app)
jwt.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})
swagger.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(quest_bp)
app.register_blueprint(progress_bp)
app.register_blueprint(user_bp)
app.register_blueprint(rating_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(task_bp)
app.register_blueprint(backup_bp)
