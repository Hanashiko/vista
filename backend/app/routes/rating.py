from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Rating

rating_bp = Blueprint('rating', __name__)

@rating_bp.route('/v1/quests/<int:quest_id>/rate', methods=['POST'])
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

@rating_bp.route('/v1/quests/<int:quest_id>/ratings', methods=['GET'])
@jwt_required()
def get_quest_ratings(quest_id):
    limit = request.args.get('limit', default=10, type=int)
    ratings = Rating.query.filter_by(quest_id=quest_id).order_by(Rating.id.desc()).limit(limit).all()
    ratings_data = [
        {
            "user_id": rating.user_id,
            "quest_id": rating.quest_id,
            "stars": rating.stars,
            "comment": rating.comment
        } for rating in ratings
    ]
    logger.info(f"Ratings retrieved for quest {quest_id}")
    return jsonify(ratings_data), 200

@rating_bp.route('/v1/ratings/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_ratings(user_id):
    limit = request.args.get('limit', default=10, type=int)
    ratings = Rating.query.filter_by(user_id=user_id).order_by(Rating.id.desc()).limit(limit).all()
    ratings_data = [
        {
            "user_id": rating.user_id,
            "quest_id": rating.quest_id,
            "stars": rating.stars,
            "comment": rating.comment
        } for rating in ratings
    ]
    logger.info(f"Ratings retrieved for user {user_id}")
    return jsonify(ratings_data), 200
