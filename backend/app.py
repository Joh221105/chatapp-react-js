from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)

# CORS configuration to allow requests from localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")  # need the cors_allowed_origins parameter

@app.route('/')
def index():
    return "Chat backend is running!"

@socketio.on('send_message')
def handle_message(data):
    emit('receive_message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
