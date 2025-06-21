from functools import wraps
from flask import request, abort
from app.config import Config

def requires_secret_key():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            key = request.headers.get('X-Secret-Key') or request.args.get('secret_key')
            if key != Config.ADMIN_SECRET_KEY:
                abort(403, description="Forbidden: invalid secret key")
            return fn(*args, **kwargs)
        return decorator
    return wrapper


