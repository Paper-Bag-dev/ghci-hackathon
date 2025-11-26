from dataclasses import dataclass

@dataclass
class MySessionInfo:
    firstname: str | None = None
    lastname: str | None = None
    age: int | None = None
    id: str | None = None
