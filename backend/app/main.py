from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.models.weather import WeatherRequest
from app.services.weather_service import fetch_weather
from app.services.storage_service import StorageService

app=FastAPI(title='Weather explorer')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://weather-explorer-gamma.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

storage_service=StorageService()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    errors = []

    for error in exc.errors():
        loc=error.get('loc', ())
        field=loc[-1] if loc else 'request'
        msg=error['msg'].replace('Value error, ', '')

        if field == 'latitude':
            msg='Latitude must be between -90 and 90.'
        elif field == 'longitude':
            msg='Longitude must be between -180 and 180.'
        
        errors.append(
            {
                "field": field,
                "message": msg,
            }
        )

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "status": "error",
            "message": "Invalid request",
            "details": errors
        },
    )


@app.get('/')
def get_root():
    return {'message' : 'Hello Welcome to weather explorer'}

@app.get('/health')
def health_check():
    return {'status': 'OK'}

@app.post('/store-weather-data')
async def store_weather_data(payload: WeatherRequest):
    try:
        weather_data = await fetch_weather(**payload.model_dump())
        time_stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')

        file_name=(f'weather_{payload.latitude}_{payload.longitude}_{payload.start_date}_{payload.end_date}_{time_stamp}.json')

        storage_service.upload_json(file_name=file_name, data=weather_data)
        # raise RuntimeError("Test failure")
        return {
            'status': 'ok',
            'file': file_name
        }

    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc

    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to store data') from exc


@app.get('/list-weather-files')
def list_weather_files():
    try:
        return {
            'files': storage_service.list_files()
        }

    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to list weather files') from exc


@app.get('/weather-file-content/{file_name:path}')
def get_weather_file_content(file_name: str):
    try:
        weather_data = storage_service.get_json(file_name=file_name)

        if weather_data is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={
                    'status' : 'error',
                    'message' : 'not found'
                }
            )

        return weather_data

    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to retrive weather file') from exc