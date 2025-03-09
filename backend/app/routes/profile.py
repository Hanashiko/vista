from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger, bcrypt
from ..models import User
import os
import uuid

profile_bp = Blueprint('profile', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@profile_bp.route('/v1/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    avatar_url = f"{request.host_url}uploads/{user.avatar}" if user.avatar else None
    user_data = {
        "email": user.email,
        "name": user.name,
        "avatar": avatar_url,
        "quests_created": [{"id": quest.id, "title": quest.title} for quest in user.quests_created],
        "quests_taken": [{"id":user_quest.quest.id, "title": user_quest.quest.title} for user_quest in user.quests_taken]
    }
    logger.info(f"Profile data retrieved for user: {user.email}")
    return jsonify(user_data), 200

@profile_bp.route('/v1/profile', methods=['PUT'])
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

@profile_bp.route('/v1/profile/avatar', methods=['POST'])
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
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"user_{user_id}_{uuid.uuid4()}.{ext}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        user.avatar = filename
        db.session.commit()
        logger.info(f"Avatar updated for user: {user.email}")
        return jsonify({"message": "Avatar updated successfully", "avatar_url": f"{request.host_url}uploads/{filename}"}), 200

    return jsonify({"message": "Invalid file type"}), 400

@profile_bp.route('/v1/uploads/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
