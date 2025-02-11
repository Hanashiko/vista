from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db, logger
from ..models import Quest, Task, TaskOption, Rating, MapInteraction

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
        time_limit=data['time_limit'],
        author_id=user_id
    )
    db.session.add(new_quest)
    db.session.commit()
    logger.info(f"Quest created successfully: {new_quest.title}")
    return jsonify({"message": "Quest created successfully"}), 201

@quest_bp.route('/quests_tasks', methods=['POST'])
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

@quest_bp.route('/quests/<int:quest_id>/public', methods=['GET'])
@jwt_required()
def get_public_quest(quest_id):
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
                "points": task.points,
                "options": [
                    {
                        "text": option.text
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
    logger.info(f"Public quest data retrieved: {quest.title}")
    return jsonify(quest_data), 200

@quest_bp.route('/quests/<int:quest_id>/tasks', methods=['POST'])
@jwt_required()
def add_task_to_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    
    if int(quest.author_id) != int(user_id):
        return jsonify({"message": "You are not the author of this quest"}), 403
    
    data = request.get_json()
    new_task = Task(
        text=data['text'],
        image=data.get('image'),
        video=data.get('video'),
        question_type=data['question_type'],
        correct_answer=data.get('correct_answer'),
        points=data.get('points',0),
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

@quest_bp.route('/quests/<int:quest_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks_for_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    tasks = Task.query.filter_by(quest_id=quest_id).all()
    tasks_data = [
            {
                "id":task.id,
                "text":task.text,
                "image":task.image,
                "video":task.video,
                "question_type":task.question_type,
                "correct_answer":task.correct_answer,
                "points":task.points,
                "options": [
                    {
                        "text":option.text,
                        "is_correct":option.is_correct
                    } for option in task.options
                ],
                "map_interactions": [
                    {
                        "description":interaction.description,
                        "latitude":interaction.latitude,
                        "longitude":interaction.longitude
                    } for interaction in task.map_interactions
                ]
            } for task in tasks
    ]

    logger.info(f"Tasks for quest {quest.title} retrieved")
    return jsonify(tasks_data), 200

@quest_bp.route('/quests/<int:quest_id>/tasks/<int:task_id>',methods=['DELETE'])
@jwt_required()
def delete_task(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if quest.author_id != user_id:
        return jsonify({"message":"You are not authorized to delete this task"}), 403

    db.session.delete(task)
    db.session.commit()
    logger.info(f"Task {task_id} deleted from quest {quest_id} by user {user_id}")
    return jsonify({"message":"Task deleted successfully"}), 200

@quest_bp.route('/quests/<int:quest_id>',methods=['DELETE'])
@jwt_required()
def delete_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if quest.author_id != user_id:
        return jsonify({"message":"You are not authorized to delete this quest"}), 403

    db.session.delete(quest)
    db.session.commit()
    logger.info(f"Quest {quest_id} deleted by user {user_id}")
    return jsonify({"message":"Quest deleted successfully"}), 200

@quest_bp.route('/quests/<int:quest_id>',methods=['PUT'])
@jwt_required()
def edit_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)

    if quest.author_id != user_id:
        return jsonify({"message":"You are not authorized to edit this quest"}),403

    data = request.get_json()
    quest.title = data.get('title', quest.title)
    quest.description = data.get('description',quest.description)
    quest.time_limit = data.get('time_limit', quest.time_limit)
    db.session.commit()
    logger.info(f"Quest {quest_id} edited by user {user_id}")
    return jsonify({"message":"Quest edited successfully"}), 200

@quest_bp.route('/quests/<int:quest_id>/tasks/<int:task_id>',methods=['PUT'])
@jwt_required()
def edit_task(quest_id, task_id):
    user_id = get_jwt_identity()
    quest = Quest.query.get_or_404(quest_id)
    task = Task.query.get_or_404(task_id)

    if quest.author_id != user_id:
        return jsonify({"message":"You are not authorized to edit this task"}),403

    data = request.get_json()
    task.text = data.get('text',task.text)
    task.image = data.get('image',task.image)
    task.video = data.get('video',task.video)
    task.question_type = data.get('question_type', task.question_type)
    task.correct_answer = data.get('correct_answer', task.correct_answer)
    task.points = data.get('points', task.points)
    db.session.commit()
    logger.info(f"Task {task_id} in quest {quest_id} edited by user {user_id}")
    return jsonify({"message":"Task edited successfully"}),200

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
