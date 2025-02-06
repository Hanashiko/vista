from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Quest, Rating

quest_bp = Blueprint('quest', __name__)

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