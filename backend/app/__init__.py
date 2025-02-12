import logging
from flask import Flask
from .config import Config
from .extensions import db, migrate, bcrypt, login_manager, jwt
from .models import User, RevokedToken, Quest, Task, UserQuest, Rating
from .routes import auth_bp, profile_bp, quest_bp, progress_bp, user_bp, rating_bp, stats_bp, task_bp
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
login_manager.init_app(app)
jwt.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(quest_bp)
app.register_blueprint(progress_bp)
app.register_blueprint(user_bp)
app.register_blueprint(rating_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(task_bp)
