from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import User

user_bp = Blueprint('user',__name__)

@user_bp.route('/user/<int:user_id>',methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.get_or_404(user_id)
    avatar_url = f"{request.host_url}uploads/{user.avatar}" if user.avatar else None
    user_data = {
            "email": user.email,
            "name": user.name,
            "avatar": avatar_url,
            "quests_created": [quest.title for quest in user.quests_created],
            "quests_taken": [user_quest.quest.title for user_quest in user.quests_taken]
    }
    logger.info(f"User data retrieved for user ID: {user_id}")
    return jsonify(user_data), 200

@user_bp.route('/users',methods=['GET'])    
@jwt_required()
def get_all_users():
    limit = request.args.get('limit', default=10, type=int)
    users = User.query.limit(limit).all()
    users_data = [
        {
            "id": user.id,
            "email": user.email,
            "name": user.name
        } for user in users
    ]
    logger.info(f"All {limit} users retrieved")
    return jsonify(users_data), 200
