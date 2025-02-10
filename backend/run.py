from app import app
from app.extensions import logger

if __name__ == '__main__':
    logger.info("Starting the Flask application")
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['DEBUG'])