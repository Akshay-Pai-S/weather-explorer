from datetime import date
from pydantic import BaseModel, Field, model_validator

class WeatherRequest(BaseModel):
    latitude : float = Field(ge=-90, le=90)
    longitude : float = Field(ge=-180, le=180)
    start_date : date
    end_date : date

    @model_validator(mode="after")
    def validate_date_range(self):
        if self.start_date > self.end_date:
            raise ValueError(
                "Start Date must be before or equal to End Date"
            )

        days = (self.end_date - self.start_date).days + 1
        if days > 31:
            raise ValueError(
                "Date range must not exceed 31 days"
            )

        return self