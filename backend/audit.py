from sqlalchemy.orm import Session
from models import AuditLog


def log_action(db: Session, user_id: int, action: str, resource_type: str = None, resource_id: int = None, details: str = None):
    log_entry = AuditLog(
        user_id=user_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        details=details,
    )
    db.add(log_entry)
    db.commit()