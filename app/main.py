from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from models.weather import WeatherRequest
from services.weather_service import fetch_weather
from services.storage_service import StorageService

app=FastAPI(title='Weather explorer')

storage_service=StorageService()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    errors = []

    for error in exc.errors():
        errors.append(
            {
                "field": ".".join(str(location) for location in error["loc"]),
                "message": error["msg"],
            }
        )

    return JSONResponse(
        status_code=400,
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