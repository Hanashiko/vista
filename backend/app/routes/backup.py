import os
import zipfile
from datetime import datetime

from flask import Blueprint, jsonify, request, send_file

from app.config import Config
from app.decorators import requires_secret_key

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


@backup_bp.route("/v1/backup/images/restore", methods=["POST"])
@requires_secret_key()
def restore_images_backup():
    if "backup_file" not in request.files:
        return jsonify({"error": "No backup_file part in the request"}), 400

    backup_file = request.files["backup_file"]
    if backup_file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not backup_file.filename.endswith(".zip"):
        return jsonify({"error": "Only .zip files are allowed"}), 400

    tmp_path = os.path.join("/tmp", backup_file.filename)
    backup_file.save(tmp_path)

    try:
        with zipfile.ZipFile(tmp_path, "r") as zip_ref:
            zip_ref.extractall(Config.UPLOAD_FOLDER)
    except zipfile.BadZipFile:
        return jsonify({"error": "Invalid ZIP file"}), 400
    finally:
        os.remove(tmp_path)

    return jsonify({"message": "Backup restored successfully"}), 200
