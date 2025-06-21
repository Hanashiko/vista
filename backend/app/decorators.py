from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import jsonify

def requires_secret_key(required_value: str):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if 'key' not in claims or claims['key'] != required_value:
                return jsonify({'error': 'Access denied: invalid secret_key'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper


