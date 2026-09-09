from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from models.weather import WeatherRequest
from services.weather_service import fetch_weather

app=FastAPI(title='Weather explorer')

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    return JSONResponse(
        status_code=400,
        content={
            "status": "error",
            "message": "Invalid request",
            "details": exc.errors(),
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
        return weather_data
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc