from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    model_config = {
        'extra': 'allow'
    }
    MONGO_URL: str = 'mongodb://mongodb:27017/'
    MONGO_NAME: str = 'educate'


settings = Settings()
