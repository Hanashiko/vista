from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Task, TaskOption, MapInteraction, Quest
from ..config import Config
from werkzeug.utils import secure_filename
import os

task_bp = Blueprint('task', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

def save_file(file, folder):
    filename = secure_filename(file.filename)
    file_path = os.path.join(folder, filename)
    file.save(file_path)
    return filename

@task_bp.route('/quests/<int:quest_id>/tasks', methods=['POST'])
@jwt_required()
def add_task_to_quest(quest_id):
    user_id = int(get_jwt_identity())
    quest = Quest.query.get_or_404(quest_id)
    
    logger.info(f"User {user_id} is trying to add a task to quest {quest_id}")
    
    if int(quest.author_id) != user_id:
        logger.warning(f"User {user_id} is not the author of quest {quest_id}")
        return jsonify({"message": "You are not the author of this quest"}), 403
    
    data = request.get_json()

    image = None
    video = None

    if 'image' in request.files and allowed_file(request.files['image'].filename):
        image = save_file(request.files['image'], current_app.config['UPLOAD_FOLDER'])

    if 'video' in request.files and allowed_file(request.files['video'].filename):
        video = save_file(request.files['video'], current_app.config['UPLOAD_FOLDER'])

    new_task = Task(
        text=data['text'],
        image=image,
        video=video,
        question_type=data['question_type'],
        correct_answer=data.get('correct_answer'),
        points=data.get('points', 0),
        quest_id=quest_id
    )
    db.session.add(new_task)
    db.session.commit()

    if 'options' in data:
        for option in data['options']:
            new_option = TaskOption(
                text=option['text'],
                is_correct=option['is_correct'],
                task_id=new_task.id
            )
            db.session.add(new_option)
        db.session.commit()
    
    if 'map_interactions' in data:
        for interaction in data['map_interactions']:
            new_interaction = MapInteraction(
                description=interaction['description'],
                latitude=interaction['latitude'],
                longitude=interaction['longitude'],
                task_id=new_task.id
            )
            db.session.add(new_interaction)
        db.session.commit()
    
    logger.info(f"Task added to quest {quest.title} by user {user_id}")
    return jsonify({"message": "Task added successfully"}), 201

@task_bp.route('/quests/<int:quest_id>/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not authorized to delete this task"}), 403

    logger.info(f"Deleting task {task_id} from quest {quest_id} by user {user_id}")

    TaskOption.query.filter_by(task_id=task_id).delete()
    MapInteraction.query.filter_by(task_id=task_id).delete()

    db.session.delete(task)
    db.session.commit()
    logger.info(f"Task {task_id} deleted from quest {quest_id} by user {user_id}")
    return jsonify({"message": "Task deleted successfully"}), 200

@task_bp.route('/quests/<int:quest_id>/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def edit_task(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not authorized to edit this task"}), 403

    data = request.get_json()

    if task.question_type != data.get('question_type'):
        TaskOption.query.filter_by(task_id=task_id).delete()
        MapInteraction.query.filter_by(task_id=task_id).delete()

    task.text = data.get('text', task.text)
    task.image = data.get('image', task.image)
    task.video = data.get('video', task.video)
    task.question_type = data.get('question_type', task.question_type)
    task.correct_answer = data.get('correct_answer', task.correct_answer)
    task.points = data.get('points', task.points)
    db.session.commit()

    if 'options' in data:
        for option in data['options']:
            new_option = TaskOption(
                text=option['text'],
                is_correct=option['is_correct'],
                task_id=task.id
            )
            db.session.add(new_option)
        db.session.commit()

    if 'map_interactions' in data:
        for interaction in data['map_interactions']:
            new_interaction = MapInteraction(
                description=interaction['description'],
                latitude=interaction['latitude'],
                longitude=interaction['longitude'],
                task_id=task.id
            )
            db.session.add(new_interaction)
        db.session.commit()

    logger.info(f"Task {task_id} in quest {quest_id} edited by user {user_id}")
    return jsonify({"message": "Task edited successfully"}), 200


