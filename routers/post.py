from fastapi import APIRouter, HTTPException, Request
from typing import Optional
from models import Post
import psycopg2
import uuid
import os
import socket

if socket.gethostname() == "Nivi":
    SSL_MODE = 'prefer'
    DATABASE_URL = "postgres://postgres:password@localhost:5432/collab"
else:
    SSL_MODE = 'require'
    DATABASE_URL = os.environ['DATABASE_URL']


router = APIRouter()


'''
Easy Reference

post_id: col 0
post_title: col 1
post_cover: col 2
post_description: col 3
last_date: col 4
tech_stack: col 5
roles: col 6
event: col 7
eligible_years: col 8
responses: col 9
created_by: col 10
archive: col 11
qualifications: col 12
responsibilities: col 13
duration: col 14
saved_by: col 15
created_at: col 16
'''


@router.get("/")
def get_all_posts(request: Request, type: Optional[str] = None):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)

    cur = conn.cursor()

    uid = request.headers.get("uid")

    try:
        if not type:
            cur.execute("select * from posts order by created_at desc")
            rows = cur.fetchall()
            posts = []
            for row in rows:
                posts.append({
                    "post_id": row[0],
                    "post_title": row[1],
                    "post_cover": row[2],
                    "post_description": row[3],
                    "last_date": row[4],
                    "tech_stack": row[5],
                    "roles": row[6],
                    "event": row[7],
                    "eligible_years": row[8],
                    "responses": row[9],
                    "created_by": row[10],
                    "archive": row[11],
                    "qualifications": row[12],
                    "responsibilities": row[13],
                    "duration": row[14],
                    "saved_by": row[15],
                    "created_at": row[16]
                })

            return posts

        else:
            if type == "applied":
                cur.execute(
                    "select posts_applied from users where uid = %s", (uid,))
                row = cur.fetchone()
                post_ids = row[0]
                posts = []
                for post_id in post_ids:
                    cur.execute(
                        "select * from posts where post_id = %s", (post_id,))
                    row = cur.fetchone()
                    posts.append({
                        "post_id": row[0],
                        "post_title": row[1],
                        "post_cover": row[2],
                        "post_description": row[3],
                        "last_date": row[4],
                        "tech_stack": row[5],
                        "roles": row[6],
                        "event": row[7],
                        "eligible_years": row[8],
                        "responses": row[9],
                        "created_by": row[10],
                        "archive": row[11],
                        "qualifications": row[12],
                        "responsibilities": row[13],
                        "duration": row[14],
                        "saved_by": row[15],
                        "created_at": row[16]
                    })
                posts.reverse()
                return posts

            elif type == "saved":
                cur.execute(
                    "select posts_saved from users where uid = %s", (uid,))
                row = cur.fetchone()
                post_ids = row[0]
                posts = []
                for post_id in post_ids:
                    cur.execute(
                        "select * from posts where post_id = %s", (post_id,))
                    row = cur.fetchone()
                    posts.append({
                        "post_id": row[0],
                        "post_title": row[1],
                        "post_cover": row[2],
                        "post_description": row[3],
                        "last_date": row[4],
                        "tech_stack": row[5],
                        "roles": row[6],
                        "event": row[7],
                        "eligible_years": row[8],
                        "responses": row[9],
                        "created_by": row[10],
                        "archive": row[11],
                        "qualifications": row[12],
                        "responsibilities": row[13],
                        "duration": row[14],
                        "saved_by": row[15],
                        "created_at": row[16]
                    })
                posts.reverse()
                return posts

            elif type == "created":
                cur.execute(
                    "select posts_created from users where uid = %s", (uid,))
                row = cur.fetchone()
                post_ids = row[0]
                posts = []
                for post_id in post_ids:
                    cur.execute(
                        "select * from posts where post_id = %s", (post_id,))
                    row = cur.fetchone()
                    posts.append({
                        "post_id": row[0],
                        "post_title": row[1],
                        "post_cover": row[2],
                        "post_description": row[3],
                        "last_date": row[4],
                        "tech_stack": row[5],
                        "roles": row[6],
                        "event": row[7],
                        "eligible_years": row[8],
                        "responses": row[9],
                        "created_by": row[10],
                        "archive": row[11],
                        "qualifications": row[12],
                        "responsibilities": row[13],
                        "duration": row[14],
                        "saved_by": row[15],
                        "created_at": row[16]
                    })
                posts.reverse()
                return posts

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.get("/{post_id}")
def get_post(post_id):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    try:
        cur.execute("select * from posts where post_id = %s", (post_id,))
        row = cur.fetchone()
        post = {
            "post_id": row[0],
            "post_title": row[1],
            "post_cover": row[2],
            "post_description": row[3],
            "last_date": row[4],
            "tech_stack": row[5],
            "roles": row[6],
            "event": row[7],
            "eligible_years": row[8],
            "responses": row[9],
            "created_by": row[10],
            "archive": row[11],
            "qualifications": row[12],
            "responsibilities": row[13],
            "duration": row[14],
            "saved_by": row[15],
            "created_at": row[16]
        }

        return post

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.put("/{post_id}")
def edit_post(post_id, post: Post):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    try:

        cur.execute("update posts set post_title=%s,post_cover=%s,post_description=%s,last_date=%s,tech_stack=%s,roles=%s,event=%s,eligible_years=%s,archive=%s,qualifications=%s,responsibilities=%s,duration=%s where post_id=%s",
                    (post.post_title, post.post_cover,
                     post.post_description, post.last_date, post.tech_stack,
                     post.roles, post.event, post.eligible_years, post.archive,
                     post.qualifications, post.responsibilities, post.duration,
                     post_id)
                    )

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.post("/add")
def add_post(post: Post, request: Request):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    uid = request.headers.get("uid")
    post_id = str(uuid.uuid4())

    try:

        cur.execute("insert into posts values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    (post_id, post.post_title, post.post_cover,
                     post.post_description, post.last_date, post.tech_stack,
                     post.roles, post.event, post.eligible_years,
                     post.responses, uid, post.archive,
                     post.qualifications, post.responsibilities, post.duration,
                     post.saved_by, post.created_at)
                    )

        cur.execute("select posts_created from users where uid = %s", (uid,))
        posts_created = (cur.fetchone())[0]
        if posts_created:
            posts_created.append(post_id)
        else:
            posts_created = [post_id]
        cur.execute(
            "update users set posts_created = %s where uid = %s", (posts_created, uid))

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.delete("/{post_id}")
def delete_post(post_id, request: Request):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    uid = request.headers.get("uid")

    try:

        cur.execute(
            "select responses,saved_by from posts where post_id = %s", (post_id,))
        row = cur.fetchone()
        responses = row[0]
        saved_by = row[1]

        # Removing post_id from users who have applied
        for user_id in responses:
            cur.execute(
                "select posts_applied from users where uid = %s", (user_id,))
            posts_applied = (cur.fetchone())[0]
            posts_applied.remove(post_id)
            cur.execute(
                "update users set posts_applied = %s where uid = %s", (posts_applied, user_id))

        # Removing post_id from users who have saved
        for user_id in saved_by:
            cur.execute(
                "select posts_saved from users where uid = %s", (user_id,))
            posts_saved = (cur.fetchone())[0]
            posts_saved.remove(post_id)
            cur.execute(
                "update users set posts_saved = %s where uid = %s", (posts_saved, user_id))

        # Removing post_id from user who created
        cur.execute("select posts_created from users where uid = %s", (uid,))
        posts_created = (cur.fetchone())[0]
        posts_created.remove(post_id)
        cur.execute(
            "update users set posts_created = %s where uid = %s", (posts_created, uid))

        # Deleting the post from the table
        cur.execute("delete from posts where post_id = %s", (post_id,))

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.post("/toggle_register/{post_id}")
def toggle_register_for_post(post_id, request: Request):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()
    uid = request.headers.get("uid")

    try:

        cur.execute(
            "select responses from posts where post_id = (%s)", (post_id,))
        row = cur.fetchone()
        responses = row[0]

        # Registering for post
        if uid not in responses:
            responses.append(uid)
            cur.execute(
                "update posts set responses = (%s) where post_id = (%s)",
                (responses, post_id))
            cur.execute("select posts_applied from users where uid = (%s)",
                        (uid,))
            row = cur.fetchone()
            posts_applied = row[0]
            if posts_applied:
                posts_applied.append(post_id)
            else:
                posts_applied = [post_id]
            cur.execute(
                "update users set posts_applied = (%s) where uid = (%s)",
                (posts_applied, uid))

        # Deregistering from post
        else:
            responses.remove(uid)
            cur.execute(
                "update posts set responses = (%s) where post_id = (%s)",
                (responses, post_id))
            cur.execute("select posts_applied from users where uid = (%s)",
                        (uid,))
            row = cur.fetchone()
            posts_applied = row[0]
            posts_applied.remove(post_id)
            cur.execute(
                "update users set posts_applied = (%s) where uid = (%s)",
                (posts_applied, uid))

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.post("/toggle_save/{post_id}")
def toggle_save_post(post_id, request: Request):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    uid = request.headers.get("uid")

    try:
        # Toggling post_id in user document
        cur.execute("select posts_saved from users where uid = (%s)", (uid,))
        row = cur.fetchone()
        posts_saved = row[0]
        if posts_saved:
            if post_id not in posts_saved:
                posts_saved.append(post_id)
                cur.execute(
                    "update users set posts_saved = (%s) where uid = (%s)",
                    (posts_saved, uid))
            else:
                posts_saved.remove(post_id)
                cur.execute(
                    "update users set posts_saved = (%s) where uid = (%s)",
                    (posts_saved, uid))
        else:
            posts_saved = [post_id]
            cur.execute(
                "update users set posts_saved = (%s) where uid = (%s)",
                (posts_saved, uid))

        # Toggling uid to post document
        cur.execute(
            "select saved_by from posts where post_id = (%s)", (post_id,))
        row = cur.fetchone()
        saved_by = row[0]
        if uid not in saved_by:
            saved_by.append(uid)
            cur.execute(
                "update posts set saved_by = (%s) where post_id = (%s)",
                (saved_by, post_id))
        else:
            saved_by.remove(uid)
            cur.execute(
                "update posts set saved_by = (%s) where post_id = (%s)",
                (saved_by, post_id))

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()


@router.get("/responses/{post_id}")
def get_post_responses(post_id):
    conn = psycopg2.connect(DATABASE_URL, sslmode=SSL_MODE)
    cur = conn.cursor()

    try:
        cur.execute(
            "select responses from posts where post_id = %s", (post_id,))
        responses = (cur.fetchone())[0]
        users = []
        for user_id in responses:
            cur.execute("select * from users where uid = %s", (user_id,))
            row = cur.fetchone()
            users.append({
                "uid": row[0],
                "name": row[1],
                "linkedin": row[2],
                "github": row[3],
                "website": row[4],
                "year": row[5],
                "email": row[6],
                "resume": row[10],
                "photo_url": row[11]
            })

        return users

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()
