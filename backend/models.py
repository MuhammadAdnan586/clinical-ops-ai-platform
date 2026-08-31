from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base
import enum
from sqlalchemy import Enum as SQLEnum


class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    SUPPORT = "support"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.PATIENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())



from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text, ARRAY
from sqlalchemy.orm import relationship
import enum


# ---------------------- PATIENT ----------------------

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    date_of_birth = Column(DateTime(timezone=True), nullable=True)
    gender = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    chronic_conditions = Column(Text, nullable=True)   # comma-separated or JSON string for now
    allergies = Column(Text, nullable=True)
    current_medications = Column(Text, nullable=True)
    medical_history_summary = Column(Text, nullable=True)
    consent_given = Column(Boolean, default=False)
    consent_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", backref="patient_profile")


# ---------------------- APPOINTMENTS ----------------------

class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"


class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    day_of_week = Column(Integer, nullable=False)  # 0=Monday ... 6=Sunday
    start_time = Column(String, nullable=False)    # e.g. "09:00"
    end_time = Column(String, nullable=False)       # e.g. "17:00"
    is_active = Column(Boolean, default=True)

    doctor = relationship("User")


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(SQLEnum(AppointmentStatus), default=AppointmentStatus.SCHEDULED)
    reason = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    patient = relationship("Patient")
    doctor = relationship("User")


# ---------------------- TRIAGE ----------------------

class SeverityLevel(str, enum.Enum):
    EMERGENCY = "emergency"
    URGENT = "urgent"
    ROUTINE = "routine"


class TriageSession(Base):
    __tablename__ = "triage_sessions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    raw_symptom_text = Column(Text, nullable=False)
    severity = Column(SQLEnum(SeverityLevel), nullable=False)
    red_flag_triggered = Column(Boolean, default=False)
    reasoning_trace = Column(Text, nullable=True)  # log of agent's reasoning
    recommended_action = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    patient = relationship("Patient")


class SymptomLog(Base):
    __tablename__ = "symptom_logs"

    id = Column(Integer, primary_key=True, index=True)
    triage_session_id = Column(Integer, ForeignKey("triage_sessions.id"), nullable=False)
    symptom_name = Column(String, nullable=False)
    severity_note = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    triage_session = relationship("TriageSession")