from flask import Blueprint, request, jsonify, current_app
from app.routes.profile import allowed_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Quest, User, Task, TaskOption, MapInteraction
import os

quest_bp = Blueprint('quest', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@quest_bp.route('/v1/quests', methods=['POST'])
@jwt_required()
def create_quest():
    user_id = get_jwt_identity()
    data = request.get_json()
    logger.info(f"Create quest request by user {user_id}: {data}")

    new_quest = Quest(
        title=data['title'],
        description=data['description'],
        time_limit=data['time_limit'],
        author_id=user_id
    )
    db.session.add(new_quest)
    db.session.commit()

    logger.info(f"Quest created successfully: {new_quest.title}")
    return jsonify({"message": "Quest created successfully", "quest_id": new_quest.id}), 201

@quest_bp.route('/v2/quests', methods=['POST'])
@jwt_required()
def create_quest_with_tasks():
    user_id = get_jwt_identity()
    data = request.get_json()
    logger.info(f"Create quest request by user {user_id}: {data}")
    new_quest = Quest(
            title=data['title'],
            description=data['description'],
            time_limit=data['time_limit'],
            author_id=user_id
    )
    db.session.add(new_quest)
    db.session.commit()

    if 'tasks' in data:
        for task_data in data['tasks']:
            new_task = Task(
                text=task_data['text'],
                image=task_data.get('image'),
                video=task_data.get('video'),
                question_type=task_data['question_type'],
                correct_answer=task_data.get('correct_answer'),
                points=task_data.get('points',0),
                quest_id=new_quest.id
            )
            db.session.add(new_task)
            db.session.commit()

            if 'options' in task_data:
                for option in task_data['options']:
                    new_option = TaskOption(
                            text=option['text'],
                            is_correct=option['is_correct'],
                            task_id=new_task.id
                    )
                    db.session.add(new_option)
                db.session.commit()

            if 'map_interactions' in task_data:
                for interaction in task_data['map_interactions']:
                    new_interaction = MapInteraction(
                            description=interaction['description'],
                            latitude=interaction['latitude'],
                            longitude=interaction['longitude'],
                            task_id=new_task.id
                    )
                    db.session.add(new_interaction)
                db.session.commit()
        logger.info(f"Quest created successfully: {new_quest.title} with tasks")
        return jsonify({"message":"Quest and tasks created successfully"}),201


@quest_bp.route('/quests/<int:quest_id>', methods=['GET'])
@jwt_required()
def get_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    quest_data = {
        "title": quest.title,
        "description": quest.description,
        "time_limit": quest.time_limit,
        "tasks": [
            {
                "id": task.id,
                "text": task.text,
                "image": task.image,
                "video": task.video,
                "question_type": task.question_type,
                "correct_answer": task.correct_answer,
                "points": task.points,
                "options": [
                    {
                        "text": option.text,
                        "is_correct": option.is_correct
                    } for option in task.options
                ],
                "map_interactions": [
                    {
                        "description": interaction.description,
                        "latitude": interaction.latitude,
                        "longitude": interaction.longitude
                    } for interaction in task.map_interactions
                ]
            } for task in quest.tasks
        ]
    }
    logger.info(f"Quest data retrieved: {quest.title}")
    return jsonify(quest_data), 200

@quest_bp.route('/v1/quests/<int:quest_id>', methods=['PUT'])
@jwt_required()
def edit_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not authorized to edit this quest"}), 403

    data = request.get_json()

    if 'title' in data:
        quest.tite = data['title']
    if 'description' in data['description']:
        quest.description = data['description']
    if 'time_limit' in data['time_limit']:
        quest.time_limit = data['time_limit']

    db.session.commit()
    logger.info(f"Quest {quest_id} edited by user {user_id}")
    return jsonify({"message": "Quest edited successfully"}), 200

@quest_bp.route('/v2/quests/<int:quest_id>', methods=['PUT'])
@jwt_required()
def edit_quest_with_tasks(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not authorized to edit this quest"}), 403

    data = request.get_json()
    quest.title = data.get('title', quest.title)
    quest.description = data.get('description', quest.description)
    quest.time_limit = data.get('time_limit', quest.time_limit)
    
    if 'tasks' in data:
        for task_data in data['tasks']:
            task_id = task_data.get('id')
            if task_id:
                task = Task.query.get(task_id)
                if task and task.quest_id == quest_id:
                    if task.question_type != task_data.get('question_type'):
                        TaskOption.query.filter_by(task_id=task_id).delete()
                        MapInteraction.query.filter_by(task_id=task_id).delete()
                    
                    if 'text' in task_data:
                        task.text = task_data['text']
                    if 'image' in task_data:
                        task.image = task_data['image']
                    if 'video' in task_data:
                        task.video = task_data['video']
                    if 'question_type' in task_data:
                        task.question_type = task_data['question_type']
                    if 'correct_answer' in task_data:
                        task.correct_answer = task_data['correct_answer']
                    if 'points' in task_data:
                        task.points = task_data['points']
                    db.session.commit()

                    TaskOption.query.filter_by(task_id=task_id).delete()
                    MapInteraction.query.filter_by(task_id=task_id).delete()

                    if 'options' in task_data:
                        for option in task_data['options']:
                            new_option = TaskOption(
                                text=option['text'],
                                is_correct=option['is_correct'],
                                task_id=task.id
                            )
                            db.session.add(new_option)
                        db.session.commit()

                    if 'map_interactions' in task_data:
                        for interaction in task_data['map_interactions']:
                            new_interaction = MapInteraction(
                                description=interaction['description'],
                                latitude=interaction['latitude'],
                                longitude=interaction['longitude'],
                                task_id=task.id
                            )
                            db.session.add(new_interaction)
                        db.session.commit()

    db.session.commit()
    logger.info(f"Quest {quest_id} and its tasks edited by user {user_id}")
    return jsonify({"message": "Quest and tasks edited successfully"}), 200

@quest_bp.route('/quests/<int:quest_id>', methods=['DELETE'])
@jwt_required()
def delete_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not authorized to delete this quest"}), 403

    tasks = Task.query.filter_by(quest_id=quest_id).all()
    for task in tasks:
        TaskOption.query.filter_by(task_id=task.id).delete()
        MapInteraction.query.filter_by(task_id=task.id).delete()
        db.session.delete(task)

    db.session.delete(quest)
    db.session.commit()
    logger.info(f"Quest {quest_id} deleted by user {user_id}")
    return jsonify({"message": "Quest deleted successfully"}), 200

@quest_bp.route('/quests/user', methods=['GET'])
@jwt_required()
def get_user_quests():
    user_id = get_jwt_identity()
    limit = request.args.get('limit', default=10, type=int)
    quests = Quest.query.filter_by(author_id=user_id).order_by(Quest.id.desc()).limit(limit).all()
    quests_data = [
        {
            "id": quest.id,
            "title": quest.title,
            "description": quest.description,
            "time_limit": quest.time_limit
        } for quest in quests
    ]
    logger.info(f"Quests retrieved for user {user_id}")
    return jsonify(quests_data), 200

@quest_bp.route('/quests/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_quests_by_user_id(user_id):
    limit = request.args.get('limit', default=10, type=int)
    quests = Quest.query.filter_by(author_id=user_id).order_by(Quest.id.desc()).limit(limit).all()
    quests_data = [
        {
            "id": quest.id,
            "title": quest.title,
            "description": quest.description,
            "time_limit": quest.time_limit
        } for quest in quests
    ]
    logger.info(f"Quests retrieved for user {user_id}")
    return jsonify(quests_data), 200

@quest_bp.route('/quests/recent', methods=['GET'])
def get_recent_quests():
    limit = request.args.get('limit', default=10, type=int)
    recent_quests = Quest.query.order_by(Quest.id.desc()).limit(limit).all()
    recent_quests_data = [
        {
            "id": quest.id,
            "title": quest.title,
            "description": quest.description,
            "time_limit": quest.time_limit
        } for quest in recent_quests
    ]
    logger.info(f"Recent {limit} quests retrieved")
    return jsonify(recent_quests_data), 200

@quest_bp.route('/quests/all',methods=['GET'])
@jwt_required()
def get_all_quests():
    limit = request.args.get('limit',default=10, type=int)
    quests = Quest.query.order_by(Quest.id.desc()).limit(limit).all()
    quests_data = [
            {
                "id": quest.id,
                "title": quest.title,
                "description": quest.description,
                "time_limit": quest.time_limit 
            } for quest in quests 
    ]
    logger.info(f"All {limit} quests retrieved")
    return jsonify(quests_data),200

@quest_bp.route('/quests/<int:quest_id>/image', methods=['POST'])
@jwt_required()
def upload_quest_image(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if int(quest.author_id) != int(user_id):
        return jsonify({"message":"You are not authorized to upload an image for this quest"}), 403

    if 'image' not in request.files:
        return jsonify({"message":"No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"message":"No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = f"quest_{quest_id}_{file.filename}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        quest.image = filename
        db.session.commit()
        logger.info(f"Image updated for quest: {quest.id} - {quest.title}")
        return jsonify({"message":"Image of quest updated successfully", "image_url": f"{request.host_url}uploads/{filename}"}),200
    return jsonify({"message":"Invalid file type"}),400
