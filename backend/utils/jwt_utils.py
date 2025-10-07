import datetime as dt
import os
from typing import Any, Dict

import jwt


def create_jwt(payload: Dict[str, Any], exp_minutes: int = 60) -> str:
    secret = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    algorithm = "HS256"
    to_encode = payload.copy()
    to_encode["exp"] = dt.datetime.utcnow() + dt.timedelta(minutes=exp_minutes)
    return jwt.encode(to_encode, secret, algorithm=algorithm)


def decode_jwt(token: str) -> Dict[str, Any]:
    secret = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    algorithms = ["HS256"]
    return jwt.decode(token, secret, algorithms=algorithms)


