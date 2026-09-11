import json

from google.cloud import storage
from config import GCS_BUCKET_NAME, GCP_PROJECT_ID

class StorageService:
    def __init__(self):
        self.client=storage.Client(project=GCP_PROJECT_ID)
        self.bucket=self.client.bucket(GCS_BUCKET_NAME)

    def upload_json(self, file_name: str, data: dict):
        blob=self.bucket.blob(file_name)
        blob.upload_from_string(data=json.dumps(data), content_type='application/json')

    def list_files(self) -> list[dict]:
        blobs=self.client.list_blobs(self.bucket)
        files=[]
        print('blobs',blobs)

        for blob in blobs:
            print('blob',blob)
            print('files',files)
            files.append(
                {
                    'name': blob.name,
                    'size': blob.size or 0,
                    'created_at' : blob.time_created.isoformat() if blob.time_created else None
                }
            )

        return files