from flask import Blueprint, request, jsonify, send_file
import os
import zipfile
from datetime import datetime
from app.decorators import requires_secret_key

backup_bp = Blueprint('backup', __name__)

@backup_bp.route('/v1/backup/images', methods=['GET'])
@requires_secret_key('admin-images')
def backup_images():
    return jsonify({"message": "ok"}), 200
    
