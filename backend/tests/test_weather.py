from pydantic import ValidationError
import pytest

from app.models.weather import WeatherRequest

def valid_request() -> dict:
    return {
        'latitude': 13,
        'longitude': 75,
        'start_date': '2026-09-01',
        'end_date': '2026-09-10'
    }

def test_valid_weather_request():
    req = WeatherRequest(**valid_request())

    assert req.latitude == 13
    assert req.longitude == 75

def test_latitude_out_of_range():
    data = valid_request()
    data['latitude'] = 91

    with pytest.raises(ValidationError):
        WeatherRequest(**data)

def test_longitude_out_of_range():
    data = valid_request()
    data['longitude'] = 181

    with pytest.raises(ValidationError):
        WeatherRequest(**data)

def test_start_after_end_date():
    data=valid_request()
    data['start_date'] = '2026-09-10'
    data['end_date'] = '2026-09-01'

    with pytest.raises(ValidationError):
        WeatherRequest(**data)

def test_date_range_exceed_31_days():
    data=valid_request()
    data['start_date'] = '2026-08-01'
    data['end_date'] = '2026-09-10'

    with pytest.raises(ValidationError):
        WeatherRequest(**data)