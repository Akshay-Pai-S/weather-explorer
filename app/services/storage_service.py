import json

from google.cloud import storage
from app.config import GCS_BUCKET_NAME, GCP_PROJECT_ID

class StorageService:
    def __init__(self):
        self.client=storage.Client(project=GCP_PROJECT_ID)
        self.bucket=self.client.bucket(GCS_BUCKET_NAME)

    def upload_json(self, file_name: str, data: dict):
        blob=self.bucket.blob(file_name)
        blob.upload_from_string(json.dumps(data), content_type='application/json')