from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger, bcrypt
from ..models import User
import os

profile_bp = Blueprint('profile', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

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
    logger.info(f"Full request data: {request.__dict__}")
    return jsonify(user_data), 200

@profile_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()

    if 'email' in data:
        user.email = data['email']
    if 'name' in data:
        user.name = data['name']
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()
    logger.info(f"Profile updated for user: {user.email}")
    return jsonify({"message": "Profile updated successfully"}), 200

@profile_bp.route('/profile/avatar', methods=['POST'])
@jwt_required()
def upload_avatar():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if 'avatar' not in request.files:
        return jsonify({"message": "No avatar file provided"}), 400

    file = request.files['avatar']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = f"{user_id}_{file.filename}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        user.avatar = file_path
        db.session.commit()
        logger.info(f"Avatar updated for user: {user.email}")
        return jsonify({"message": "Avatar updated successfully", "avatar_url": file_path}), 200

    return jsonify({"message": "Invalid file type"}), 400