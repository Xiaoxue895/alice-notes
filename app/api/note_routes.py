from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Note
from app import db
from datetime import datetime, timedelta
from sqlalchemy import func

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def notes():
    notes = Note.query.filter_by(user_id=current_user.id).all()
    count = len(notes)  
    return {
        'count': count,
        'notes': [note.to_dict() for note in notes]
    }

@note_routes.route('/<int:id>')
@login_required
def note(id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if note is None:
        return jsonify({"error": "Note not found"}), 404
    return note.to_dict()

@note_routes.route('/stats')
@login_required
def overview_stats():
    now = datetime.utcnow()
    one_week_ago = now - timedelta(days=7)
    one_month_ago = now - timedelta(days=30)

    categories = ['学习', '工作', '生活', '其他']
    category_stats = {}
    for category in categories:
        week_count = Note.query.filter(
            Note.user_id == current_user.id,
            Note.category == category,
            Note.created_at >= one_week_ago
        ).count()

        month_count = Note.query.filter(
            Note.user_id == current_user.id,
            Note.category == category,
            Note.created_at >= one_month_ago
        ).count()

        category_stats[category] = {
            'week_count': week_count,
            'month_count': month_count
        }

    week_count = Note.query.filter(Note.user_id == current_user.id, Note.created_at >= one_week_ago).count()
    month_count = Note.query.filter(Note.user_id == current_user.id, Note.created_at >= one_month_ago).count()

    daily_category_counts = []
    for i in range(30):
        day_date = (now - timedelta(days=i)).date()

        day_stats = {
            'date': str(day_date),
            'categories': {}
        }

        for category in categories:
            count = Note.query.filter(
                Note.user_id == current_user.id,
                Note.category == category,
                func.date(Note.created_at) == day_date
            ).count()
            day_stats['categories'][category] = count

        daily_category_counts.append(day_stats)

    return jsonify({
        "week_count": week_count,
        "month_count": month_count,
        "category_counts": category_stats,
        "daily_category_counts": daily_category_counts
    })


# 根据标题或内容搜索笔记
@note_routes.route('/search', methods=['GET'])
@login_required
def search_notes():

    query = request.args.get('query', '')  

    if not query:
        return jsonify({"error": "Search query is required"}), 400

    notes = Note.query.filter(
        (Note.title.ilike(f'%{query}%')) | (Note.content.ilike(f'%{query}%'))
    ).filter_by(user_id=current_user.id).all()

    count = len(notes)  
    return {
        'count': count,
        'notes': [note.to_dict() for note in notes]
    }

# 根据类别搜索笔记

@note_routes.route('/category/<string:category>', methods=['GET'])
@login_required
def get_notes_by_category(category):
    
    notes = Note.query.filter_by(user_id=current_user.id, category=category).all()
    count = len(notes)  
    return {
        'count': count,
        'notes': [note.to_dict() for note in notes]
    }


@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
    """
    Create a new note for the current user
    """
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    link = data.get('link')
    image_url = data.get('image_url')
    category = data.get('category')

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    new_note = Note(
        user_id=current_user.id,
        title=title,
        content=content,
        link=link,
        image_url=image_url,
        category=category
    )

    db.session.add(new_note)
    db.session.commit()

    return new_note.to_dict(), 201

# 更新笔记
@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    """
    Update an existing note for the current user
    """
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if note is None:
        return jsonify({"error": "Note not found"}), 404

    data = request.get_json()
    note.title = data.get('title', note.title)
    note.content = data.get('content', note.content)
    note.link = data.get('link', note.link)
    note.category = data.get('category', note.category)
    note.image_url = data.get('image_url', note.image_url)

    db.session.commit()

    return note.to_dict()

# 删除笔记
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Delete a note by id for the current user
    """
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if note is None:
        return jsonify({"error": "Note not found"}), 404

    db.session.delete(note)
    db.session.commit()

    return jsonify({"message": "Note deleted successfully"}), 200
