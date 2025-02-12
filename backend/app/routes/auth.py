from flask import Blueprint, request, jsonify
from jinja2.runtime import identity
from flask_login import login_user, logout_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity, create_refresh_token
from ..extensions import db, bcrypt, logger
from ..models import User, RevokedToken

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    logger.info(f"Register request: {data}")
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], password=hashed_password, name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    logger.info(f"User registered successfully: {new_user.email}")
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    logger.info(f"Login request: {data}")
    user = User.query.filter_by(email=data['email']).first()
    
    if not user and bcrypt.check_password_hash(user.password, data['password']):
        logger.warning(f"Login failed for email: {data['email']}")
        return jsonify({"message": "Login failed"}), 401
    
    login_user(user)
    
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    logger.info(f"User logged in successfully: {user.email}")
    return jsonify({"message": "Logged in successfully", "access_token": access_token, "refresh_token": refresh_token}), 200

@auth_bp.route('/refresh',methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return jsonify({"access_token":access_token}), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    revoked_token = RevokedToken(jti=jti)
    db.session.add(revoked_token)
    db.session.commit()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    logger.info(f"Token revoked for user: {user.email}")
    return jsonify({"message": "Logged out successfully"}), 200
