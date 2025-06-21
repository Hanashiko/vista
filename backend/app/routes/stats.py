from flask import Blueprint, request, jsonify
from ..extensions import db, logger
from ..models import Rating, User

stats_bp = Blueprint("stats", __name__)


@stats_bp.route("/v1/top_reviewers", methods=["GET"])
def get_top_reviewers():
    limit = request.args.get("limit", default=10, type=int)
    top_reviewers = (
        db.session.query(User, db.func.count(Rating.id).label("reviews_count"))
        .join(Rating, User.id == Rating.user_id)
        .group_by(User.id)
        .order_by(db.func.count(Rating.id).desc())
        .limit(limit)
        .all()
    )
    reviewers_data = [
        {
            "user_id": reviewer.User.id,
            "email": reviewer.User.email,
            "reviews_count": reviewer.reviews_count,
        }
        for reviewer in top_reviewers
    ]
    logger.info("Top reviewers retrieved")
    return jsonify(reviewers_data), 200
