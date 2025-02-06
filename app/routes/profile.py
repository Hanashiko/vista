from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import logger
from ..models import User

profile_bp = Blueprint('profile', __name__)

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