from .extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    avatar = db.Column(db.String(150), nullable=True)
    quests_created = db.relationship('Quest', backref='author', lazy=True)
    quests_taken = db.relationship('UserQuest', backref='participant', lazy=True)

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    num_tasks = db.Column(db.Integer, nullable=False)
    time_limit = db.Column(db.Integer, nullable=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='quest', lazy=True)
    ratings = db.relationship('Rating', backref='quest', lazy=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(150), nullable=True)
    video = db.Column(db.String(150), nullable=True)
    question_type = db.Column(db.String(50), nullable=False)
    correct_answer = db.Column(db.Text, nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)

class UserQuest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    time_spent = db.Column(db.Integer, nullable=False, default=0)

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    
class RevokedToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120), nullable=False)