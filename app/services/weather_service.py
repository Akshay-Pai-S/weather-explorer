from datetime import date

import httpx

OPEN_MATEO_URL = 'https://archive-api.open-meteo.com/v1/archive'

DAILY_Variables=[
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min'
]

async def fetch_weather(
        latitude : float,
        longitude : float,
        start_date : date,
        end_date : date
) -> dict:
    params={
        'latitude' : latitude,
        'longitude' : longitude,
        'start_date' : start_date,
        'end_date' : end_date,
        'daily' : ','.join(DAILY_Variables),
        'timezone' : 'auto'     #auto will select based on lat-long if not given will take UTC
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.get(url=OPEN_MATEO_URL, params=params)

            resp.raise_for_status()

            return resp.json()
    except httpx.HTTPStatusError as exc:
        raise RuntimeError(f'Open-Meteo returned HTTP {exc.response.status_code}') from exc
    except httpx.RequestError as exc:
        raise RuntimeError('Unable to connect to Open-Meteo') from exc
