from flask_socketio import emit
from flask_login import current_user
from .models import User, Note
from . import socketio

@socketio.on('get_users')
def handle_get_users():
    """
    When the frontend emits 'get_users', return a list of user dicts with corresponding notes
    """
    try:
        # 查询所有用户
        users = User.query.all()
        user_data = []

        for user in users:
            # 为每个用户查询他们的笔记
            notes = Note.query.filter_by(user_id=user.id).all()
            note_data = [note.to_dict() for note in notes]
            
            # 把用户信息和他们的笔记关联起来
            user_info = user.to_dict()
            user_info['notes'] = note_data  # 将笔记数据添加到用户数据中
            user_data.append(user_info)

        # 通过 WebSocket 发送数据
        emit('users_data', {'users': user_data})
    except Exception as e:
        print("⚠️ WebSocket 查询出错:", e)
        emit('users_data', {'error': str(e)})

