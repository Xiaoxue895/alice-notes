from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        
        undo_users()
        undo_notes()
    seed_users()
    seed_notes()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notes()
