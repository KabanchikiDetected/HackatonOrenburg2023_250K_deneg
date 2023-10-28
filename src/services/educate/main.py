from fastapi import FastAPI, APIRouter
import logging

import database
import tests

logging.basicConfig()

api_router = APIRouter(prefix='/api')

api_router.include_router(tests.router.router)

app = FastAPI(lifespan=database.lifespan)
app.include_router(api_router)