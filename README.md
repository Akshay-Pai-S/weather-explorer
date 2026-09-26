# Weather Explorer

A full-stack weather explorer that fetches historical daily weather data from the Open-Meteo API, stores the raw JSON response in Google Cloud Storage, and provides a web dashboard to browse, visualize, and inspect stored weather data.

## Live Demo

**Frontend:**  
https://weather-explorer-gamma.vercel.app/

**Backend API:**  
https://weather-explorer-api-qojjupogaq-uc.a.run.app

**Swagger API Documentation:**  
https://weather-explorer-api-qojjupogaq-uc.a.run.app/docs

**GitHub Repository:**  
https://github.com/Akshay-Pai-S/weather-explorer

## Tech Stack

### Backend

- Python 3.14
- FastAPI
- Pydantic
- HTTPX
- Google Cloud Storage SDK
- Uvicorn

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

### Cloud & Deployment

- Google Cloud Storage
- Google Artifact Registry
- Google Cloud Run
- Docker
- Vercel

### Testing

- Pytest

## Features

- Fetch historical daily weather data for a selected location and date range.
- Validate latitude and longitude values.
- Validate date ranges.
- Restrict weather requests to a maximum of 31 days.
- Fetch historical weather data from Open-Meteo.
- Store the complete Open-Meteo JSON response in Google Cloud Storage.
- Generate timestamped weather filenames.
- Browse previously stored weather files.
- View metadata for stored files.
- Load stored weather data without repeatedly calling Open-Meteo.
- Visualize daily maximum and minimum temperatures using a line chart.
- Display daily weather variables in a table.
- Paginate table data using 10, 20, or 50 rows.
- Provide loading and error states throughout the application.
- Handle invalid or malformed stored weather files gracefully.
- Responsive UI for desktop, tablet, and mobile layouts.

## Backend API

### `POST /store-weather-data`

Fetches historical weather data from Open-Meteo and stores the complete API response in Google Cloud Storage.

#### Request

```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "start_date": "2025-01-01",
  "end_date": "2025-01-03"
}
```

#### Validation

- Latitude must be between `-90` and `90`.
- Longitude must be between `-180` and `180`.
- Dates must be valid.
- `start_date` must not be after `end_date`.
- The requested date range cannot exceed 31 days.

#### Weather variables

The Open-Meteo request includes:

- `temperature_2m_max`
- `temperature_2m_min`
- `apparent_temperature_max`
- `apparent_temperature_min`

#### Stored filename

Weather data is stored using the following naming pattern:

```text
weather_<lat>_<lon>_<start>_<end>_<timestamp>.json
```

#### Successful response

```json
{
  "status": "ok",
  "file": "weather_12.9716_77.5946_2025-01-01_2025-01-03_<timestamp>.json"
}
```

### `GET /list-weather-files`

Lists weather files stored in the Google Cloud Storage bucket.

#### Response

```json
{
  "files": [
    {
      "name": "weather_12.9716_77.5946_2025-01-01_2025-01-03_<timestamp>.json",
      "size": 12345,
      "created_at": "2025-01-03T10:15:30Z"
    }
  ]
}
```

The listing is generated using Google Cloud Storage SDK bucket listing operations.

### `GET /weather-file-content/{file}`

Fetches the complete JSON content of a stored weather file.

Example:

```text
GET /weather-file-content/weather_12.9716_77.5946_2025-01-01_2025-01-03_<timestamp>.json
```

If the requested file is missing or invalid, the API returns:

```json
{
  "status": "error",
  "message": "not found"
}
```

## Project Structure

```text
weather-explorer/
│
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── main.py
│   │   │
│   │   ├── models/
│   │   │   └── weather.py
│   │   │
│   │   └── services/
│   │       ├── storage_service.py
│   │       └── weather_service.py
│   │
│   ├── tests/
│   │   └── test_weather.py
│   │
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile
│   ├── requirements.txt
│   └── requirements-dev.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputField.tsx
│   │   │   ├── StoredFiles.tsx
│   │   │   ├── WeatherChart.tsx
│   │   │   ├── WeatherForm.tsx
│   │   │   └── WeatherTable.tsx
│   │   │
│   │   ├── services/
│   │   │   └── weatherApi.ts
│   │   │
│   │   ├── types/
│   │   │   └── weather.ts
│   │   │
│   │   ├── utils/
│   │   │   └── weather.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## Backend Design

The backend is split into simple responsibilities:

### `models`

Contains Pydantic models used for request validation and data structure definition.

### `services/weather_service.py`

Responsible for communicating with the Open-Meteo historical API.

### `services/storage_service.py`

Responsible for:

- Uploading JSON to Google Cloud Storage
- Listing stored objects
- Reading stored JSON files

### `config.py`

Loads environment-based configuration such as:

```text
GCP_PROJECT_ID
GCS_BUCKET_NAME
```

### `main.py`

Contains:

- FastAPI application configuration
- API routes
- CORS configuration
- Request validation handling
- Service orchestration
- HTTP error responses

## Frontend Design

The frontend is split into reusable components:

### `WeatherForm`

Provides inputs for:

- Latitude
- Longitude
- Start Date
- End Date

Handles:

- Form submission
- Loading state
- Field-level validation errors
- General API errors
- Successful file creation

### `StoredFiles`

Displays stored weather files including:

- Filename
- File size
- Created timestamp

Clicking a file loads its stored weather JSON.

### `WeatherChart`

Displays daily:

- Maximum temperature
- Minimum temperature

using Recharts.

### `WeatherTable`

Displays daily weather variables:

- Date
- Maximum temperature
- Minimum temperature
- Apparent maximum temperature
- Apparent minimum temperature

Supports pagination with:

- 10 rows
- 20 rows
- 50 rows

### `weatherApi.ts`

Contains frontend API communication with the FastAPI backend.

The production backend URL is configured using the Vite environment variable:

```text
VITE_API_BASE_URL
```

### Runtime weather validation

The frontend validates loaded file content before transforming it into chart/table data. This prevents malformed stored files from causing runtime errors in the UI.

## Local Backend Setup

### Prerequisites

- Python 3.14
- Docker
- Google Cloud CLI
- A Google Cloud project
- A Google Cloud Storage bucket

### Environment variables

Create:

```text
backend/.env
```

based on:

```text
backend/.env.example
```

Example:

```env
GCP_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=your-bucket-name
```

Do not commit `.env`.

### Install backend dependencies

From the `backend` directory:

```bash
pip install -r requirements.txt
```

For development/testing dependencies:

```bash
pip install -r requirements-dev.txt
```

### Run the backend locally

From the `backend` directory:

```bash
python -m uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

From the `frontend` directory:

### Install dependencies

```bash
npm install
```

### Environment variable

Create:

```text
frontend/.env.local
```

with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Docker

The backend is containerized using Docker.

### Dockerfile

The backend image uses:

```text
python:3.14-slim
```

and starts FastAPI using Uvicorn on port `8080`.

### Build the image

From the `backend` directory:

```bash
docker build -t weather-explorer-api .
```

### Run locally

```bash
docker run --env-file .env -p 8080:8080 weather-explorer-api
```

For local Google Cloud access, Application Default Credentials are mounted into the container during development rather than being included in the Docker image.

The production deployment does not use local credential files.

## Google Cloud Configuration

### Project

```text
weather-explorer-2609
```

### Cloud Storage bucket

```text
weather-explorer-gc-bucket
```

### Bucket region

```text
US-CENTRAL1
```

### Artifact Registry

```text
weather-explorer-repo
```

### Cloud Run service

```text
weather-explorer-api
```

### Cloud Run region

```text
us-central1
```

The Cloud Run service uses a dedicated Google Cloud service account to access the Cloud Storage bucket.

## Deploying the Backend

The backend is deployed as a Docker container.

### Build the Docker image

```bash
docker build -t weather-explorer-api .
```

### Tag the image

```bash
docker tag weather-explorer-api:latest \
us-central1-docker.pkg.dev/weather-explorer-2609/weather-explorer-repo/weather-explorer-api:latest
```

### Push the image

```bash
docker push \
us-central1-docker.pkg.dev/weather-explorer-2609/weather-explorer-repo/weather-explorer-api:latest
```

### Deploy to Cloud Run

```bash
gcloud run deploy weather-explorer-api \
  --image="us-central1-docker.pkg.dev/weather-explorer-2609/weather-explorer-repo/weather-explorer-api:latest" \
  --region="us-central1"
```

Cloud Run provides the deployed backend URL:

```text
https://weather-explorer-api-qojjupogaq-uc.a.run.app
```

## Deploying the Frontend

The frontend is deployed using Vercel.

The Vercel project uses:

```text
Root Directory: frontend
Framework: Vite
Output Directory: dist
```

The production environment variable is:

```env
VITE_API_BASE_URL=https://weather-explorer-api-qojjupogaq-uc.a.run.app
```

Production frontend:

```text
https://weather-explorer-gamma.vercel.app/
```

## CORS

The backend allows requests from the development frontend and the production Vercel application.

Development:

```text
http://localhost:5173
```

Production:

```text
https://weather-explorer-gamma.vercel.app
```

The Cloud Run backend remains publicly accessible so that the API can also be inspected through Swagger, Postman, curl, or other HTTP clients.

## Testing

The project includes a small Pytest suite focused on request validation.

Run:

```bash
cd backend
pytest
```

Current tests cover:

- Valid weather request
- Latitude outside the allowed range
- Longitude outside the allowed range
- Start date after end date
- Date range greater than 31 days

Current result:

```text
5 passed
```

## Error Handling

### Backend

The backend handles:

- Invalid coordinates
- Invalid dates
- Invalid date ranges
- Missing weather files
- External API failures
- Storage failures
- Request validation errors

Validation errors return HTTP `400` responses with structured error information.

Missing weather files return HTTP `404` with:

```json
{
  "status": "error",
  "message": "not found"
}
```

### Frontend

The frontend provides clear handling for:

- Loading states
- API errors
- Network failures
- Field-level validation errors
- Invalid stored weather files
- Empty or unavailable data

## Data Flow

The application's main flow is:

```text
1. User enters location and date range
                ↓
2. React sends POST request to FastAPI
                ↓
3. FastAPI validates the request
                ↓
4. FastAPI requests historical weather from Open-Meteo
                ↓
5. Complete Open-Meteo JSON is stored in GCS
                ↓
6. API returns the stored filename
                ↓
7. Frontend refreshes the stored file list
                ↓
8. User selects a stored file
                ↓
9. Frontend requests the stored JSON from FastAPI
                ↓
10. Chart and table are generated from stored data
```

The frontend does not repeatedly call Open-Meteo while browsing stored files. It works from the JSON already stored in Google Cloud Storage.

## Design Decisions

### Separate API and storage responsibilities

Open-Meteo communication and Google Cloud Storage operations are kept in separate service modules. This keeps API route handlers focused on request orchestration rather than external-service implementation details.

### Shared frontend types

Frontend data models are maintained in a shared TypeScript types file so the components use consistent structures.

### Reusable input component

The weather form uses a reusable input component and field configuration rather than duplicating similar input markup.

### Runtime validation

TypeScript types provide compile-time guarantees, but stored JSON comes from an external source. The frontend therefore validates the runtime structure before processing weather data.

### Stored-data visualization

Once data has been stored, the dashboard works with the stored JSON instead of making repeated calls to Open-Meteo. This keeps the browsing flow focused on the stored dataset.

## Environment Variables

### Backend

```text
GCP_PROJECT_ID
GCS_BUCKET_NAME
```

### Frontend

```text
VITE_API_BASE_URL
```

Environment files containing local configuration or credentials should not be committed to the repository.

## Notes

- Historical weather data is provided by Open-Meteo.
- Raw API responses are stored in Google Cloud Storage.
- The backend is containerized with Docker.
- The Docker image is stored in Google Artifact Registry.
- The backend is deployed on Google Cloud Run.
- The frontend is deployed on Vercel.
- The project is intended to use free-tier / no-cost resources within the applicable provider limits.

## Links

### Project

https://github.com/Akshay-Pai-S/weather-explorer

### Live Application

https://weather-explorer-gamma.vercel.app/

### Backend API

https://weather-explorer-api-qojjupogaq-uc.a.run.app

### Swagger Documentation

https://weather-explorer-api-qojjupogaq-uc.a.run.app/docs