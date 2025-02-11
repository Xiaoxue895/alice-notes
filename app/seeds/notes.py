from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_notes():
    note1 = Note(
        user_id=1, 
        title="学习 Flask",
        content="今天学习了 Flask 的基本结构，包括路由、视图函数和数据库模型。",
        link="https://flask.palletsprojects.com/",
        image_url="/images/image1.jpg",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note2 = Note(
        user_id=1,  
        title="如何使用 SQLAlchemy",
        content="SQLAlchemy 是 Flask 项目中推荐使用的 ORM 工具。",
        link="https://docs.sqlalchemy.org/",
        image_url="/images/image2.jpg",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note3 = Note(
        user_id=2,  
        title="健身计划",
        content="每周三次力量训练，配合合理的饮食。",
        link=None,
        image_url=None,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add_all([note1, note2, note3])
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
