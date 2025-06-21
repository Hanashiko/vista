import os
import zipfile
from datetime import datetime
from flask import Blueprint, send_file
from app.decorators import requires_secret_key
from app.config import Config

backup_bp = Blueprint("backup", __name__)


@backup_bp.route("/v1/backup/images", methods=["GET"])
@requires_secret_key()
def backup_images():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    backups_dir = os.path.join(BASE_DIR, "backups")
    os.makedirs(backups_dir, exist_ok=True)
    zip_filename = f"backup_{timestamp}.zip"
    zip_path = os.path.join(backups_dir, zip_filename)

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(Config.UPLOAD_FOLDER):
            for file in files:
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, Config.UPLOAD_FOLDER)
                zipf.write(filepath, arcname)

    return send_file(zip_path, as_attachment=True)
