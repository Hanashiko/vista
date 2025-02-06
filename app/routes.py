from flask import Blueprint, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .extensions import db, bcrypt, logger
from .models import User, Quest, Task, UserQuest, Rating

auth_bp = Blueprint('auth', __name__)
profile_bp = Blueprint('profile', __name__)
quest_bp = Blueprint('quest', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    logger.info(f"Register request: {data}")
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], password=hashed_password, name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    logger.info(f"User registered successfully: {new_user.email}")
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    logger.info(f"Login request: {data}")
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        access_token = create_access_token(identity=str(user.id))
        logger.info(f"User logged in successfully: {user.email}")
        return jsonify({"message": "Logged in successfully", "access_token": access_token}), 200
    else:
        logger.warning(f"Login failed for email: {data['email']}")
        return jsonify({"message": "Login failed"}), 401

@auth_bp.route('/logout')
@login_required
def logout():
    logger.info(f"User logged out: {current_user.email}")
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    user_data = {
        "email": user.email,
        "name": user.name,
        "avatar": user.avatar,
        "quests_created": [quest.title for quest in user.quests_created],
        "quests_taken": [user_quest.quest.title for user_quest in user.quests_taken]
    }
    logger.info(f"Profile data retrieved for user: {user.email}")
    return jsonify(user_data), 200

@quest_bp.route('/quests', methods=['POST'])
@jwt_required()
def create_quest():
    user_id = get_jwt_identity()
    data = request.get_json()
    logger.info(f"Create quest request by user {user_id}: {data}")
    new_quest = Quest(
        title=data['title'],
        description=data['description'],
        num_tasks=data['num_tasks'],
        time_limit=data['time_limit'],
        author_id=user_id
    )
    db.session.add(new_quest)
    db.session.commit()
    logger.info(f"Quest created successfully: {new_quest.title}")
    return jsonify({"message": "Quest created successfully"}), 201

@quest_bp.route('/quests/<int:quest_id>', methods=['GET'])
@jwt_required()
def get_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    quest_data = {
        "title": quest.title,
        "description": quest.description,
        "num_tasks": quest.num_tasks,
        "time_limit": quest.time_limit,
        "tasks": [
            {
                "text": task.text,
                "image": task.image,
                "video": task.video,
                "question_type": task.question_type,
                "correct_answer": task.correct_answer
            } for task in quest.tasks
        ]
    }
    logger.info(f"Quest data retrieved: {quest.title}")
    return jsonify(quest_data), 200

@quest_bp.route('/quests/<int:quest_id>/rate', methods=['POST'])
@jwt_required()
def rate_quest(quest_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    logger.info(f"Rate quest request by user {user_id} for quest {quest_id}: {data}")
    new_rating = Rating(
        user_id=user_id,
        quest_id=quest_id,
        stars=data['stars'],
        comment=data['comment']
    )
    db.session.add(new_rating)
    db.session.commit()
    logger.info(f"Quest rated successfully by user {user_id}: {quest_id}")
    return jsonify({"message": "Quest rated successfully"}), 201