from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from ..extensions import db, logger
from ..models import MapInteraction, Quest, Task, UserQuest

progress_bp = Blueprint("progress", __name__)


@progress_bp.route("/v1/quests/<int:quest_id>/start", methods=["POST"])
@jwt_required()
def start_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    existing_progress = UserQuest.query.filter_by(
        user_id=user_id, quest_id=quest_id
    ).first()

    if existing_progress:
        return jsonify({"message": "You have already started this quest"}), 400

    new_progress = UserQuest(
        user_id=user_id, quest_id=quest_id, start_time=datetime.utcnow()
    )
    db.session.add(new_progress)
    db.session.commit()

    logger.info(f"User {user_id} started quest {quest.title}")
    return jsonify({"message": "Quest started successfully"}), 201


@progress_bp.route(
    "/v1/quests/<int:quest_id>/tasks/<int:task_id>/answer", methods=["POST"]
)
@jwt_required()
def answer_task(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)
    progress = UserQuest.query.filter_by(
        user_id=user_id, quest_id=quest_id
    ).first_or_404()

    if progress.progress >= task_id:
        return jsonify({"message": "You have already answered this task"}), 400

    data = request.get_json()
    user_answer = data.get("answer")
    points_earned = 0

    if task.question_type == "multiple_choice":
        correct_options = [option for option in task.options if option.is_correct]
        if all(option.text in user_answer for option in correct_options) and len(
            user_answer
        ) == len(correct_options):
            points_earned = task.points
    elif task.question_type == "open_ended":
        if user_answer.strip().lower() == task.correct_answer.strip().lower():
            points_earned = task.points
    elif task.question_type == "map_interactive":
        correct_interaction = MapInteraction.query.filter_by(task_id=task_id).first()
        if correct_interaction and user_answer == {
            "description": correct_interaction.description,
            "latitude": correct_interaction.latitude,
            "longitude": correct_interaction.longitude,
        }:
            points_earned = task.points

    progress.points_earned += points_earned
    progress.progress += 1
    db.session.commit()

    logger.info(f"User {user_id} answered task {task_id} in quest {quest.title}")
    return (
        jsonify(
            {"message": "Answer recorded successfully", "points_earned": points_earned}
        ),
        200,
    )


@progress_bp.route("/v1/quests/<int:quest_id>/complete", methods=["POST"])
@jwt_required()
def complete_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    progress = UserQuest.query.filter_by(
        user_id=user_id, quest_id=quest_id
    ).first_or_404()

    total_tasks = len(quest.tasks)
    if progress.progress < total_tasks:
        return jsonify({"message": "You have not completed all tasks"}), 400

    time_spent = (datetime.utcnow() - progress.start_time).total_seconds()
    progress.time_spent = int(time_spent)
    db.session.commit()

    logger.info(f"User {user_id} completed quest {quest.title}")
    return (
        jsonify(
            {
                "message": "Quest completed successfully",
                "total_points_earned": progress.points_earned,
            }
        ),
        200,
    )
