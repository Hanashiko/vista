from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Task, TaskOption, MapInteraction, Quest
from ..config import Config
from werkzeug.utils import secure_filename
import os
import uuid

task_bp = Blueprint('task', __name__)

def allowed_file_image(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file_video(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'gif','mp4','avi'}

@task_bp.route('/v1/quests/<int:quest_id>/tasks', methods=['POST'])
@jwt_required()
def add_task_to_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    
    logger.info(f"User {user_id} is trying to add a task to quest {quest_id}")
    
    if int(quest.author_id) != int(user_id):
        logger.warning(f"User {user_id} is not the author of quest {quest_id}")
        return jsonify({"message": "You are not the author of this quest"}), 403
    
    data = request.get_json()

    new_task = Task(
        text=data['text'],
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

@task_bp.route('/v1/quests/<int:quest_id>/tasks/<int:task_id>', methods=['DELETE'])
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

@task_bp.route('/v1/quests/<int:quest_id>/tasks/<int:task_id>/image', methods=['POST'])
@jwt_required()
def upload_task_image(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message":"You are not authorized to upload an image for this task"}), 403

    if 'image' not in request.files:
        return jsonify({"message":"No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"message":"No selected file"}), 400

    if file and allowed_file_image(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"task_{task_id}_{uuid.uuid4()}.{ext}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        task.image = filename
        db.session.commit()
        logger.info(f"Image updated for task: {task.id} from quest: {quest.id} - {quest.title}")
        return jsonify({"message":"Image of task updated successfully","image_url":f"{request.host_url}uploads/{filename}"}),200
    return jsonify({"message":"Invalid file type"}),400

@task_bp.route('/v1/quests/<int:quest_id>/tasks/<int:task_id>/video', methods=['POST'])
@jwt_required()
def uploads_task_video(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message":"You are not authorized to upload an video for this task"}), 403
    
    if 'video' not in request.files:
        return jsonify({"message":"No video file provided"}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({"message":"No selected file"}), 400

    if file and allowed_file_video(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"task_{task_id}_{uuid.uuid4()}.{ext}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        task.video = filename
        db.session.commit()
        logger.info(f"Video updated for task: {task.id} from quest: {quest.id} - {quest.title}")
        return jsonify({"message":"Video of task updated successfully","image_url":f"{request.host_url}uploads/{filename}"})
    return jsonify({"message":"Invalid file type"}),400
        
