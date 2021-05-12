from fastapi import FastAPI
from routers import user, post
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
    "*"
]


tags_metadata = [
    {
        "name": "User",
        "description": "Endpoints related to operations on the **Users**\
            table."
    },
    {
        "name": "Post",
        "description": "Endpoints related to operations on the **Posts**\
            table."
    }
]

app = FastAPI(
    title="Collab Backend",
    description="Backend for the Collab website",
    version="1.0",
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    user.router,
    prefix="/user",
    tags=["User"]
)

app.include_router(
    post.router,
    prefix="/post",
    tags=["Post"]
)
