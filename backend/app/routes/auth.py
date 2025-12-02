import os

from flasgger.utils import swag_from
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (create_access_token, create_refresh_token,
    get_jwt, get_jwt_identity, jwt_required)
from flask_login import login_user

from ..extensions import bcrypt, db, logger
from ..models import RevokedToken, User

auth_bp = Blueprint("auth", __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SWAGGER_FILE = os.path.join(BASE_DIR, "docs", "auth.yaml")

SWAGGER_REGISTER_FILE = os.path.join(BASE_DIR, "docs", "register.yaml")
SWAGGER_LOGIN_FILE = os.path.join(BASE_DIR, "docs", "login.yaml")


@auth_bp.route("/v1/register", methods=["POST"])
@swag_from(SWAGGER_FILE, validation=True)
def register():
    data = request.get_json()
    logger.info(f"Register request: {data}")
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    name = data.get("name")
    email = data.get("email")
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User alredy exists"}), 400
    new_user = User(
        email=email, password=hashed_password, name=name, avatar="user_avatar.jpg"
    )
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    logger.info(f"User registered successfully: {new_user.email}")
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/v1/login", methods=["POST"])
@swag_from(SWAGGER_FILE, validation=True)
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    logger.info(f"Login request for email: {email}")

    if not data or "email" not in data or "password" not in data:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    auth_fail_message = "Invalid credentials"

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)

        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        logger.info(
            f"User logged in successfully: id - {user.id}; email - {user.email}"
        )
        return (
            jsonify(
                {
                    "message": "Logged in successfully",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }
            ),
            200,
        )

    logger.warning(f"Failed login request for email: {email}")
    return jsonify({"message": auth_fail_message})


@auth_bp.route("/v1/refresh", methods=["POST"])
@swag_from(SWAGGER_FILE, validation=True)
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return jsonify({"access_token": access_token}), 200


@auth_bp.route("/v1/logout", methods=["POST"])
@swag_from(SWAGGER_FILE, validation=True)
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
