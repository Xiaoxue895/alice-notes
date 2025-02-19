from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category = db.Column(db.String(50), nullable=True) 
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(2083), nullable=True) 
    image_url = db.Column(db.String(2083), nullable=True) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="notes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category': self.category,
            'title': self.title,
            'content': self.content,
            'link': self.link,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
