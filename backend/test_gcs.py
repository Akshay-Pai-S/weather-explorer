from app.services.storage_service import StorageService

storage = StorageService()

storage.upload_json(
    'test/test_upload.json',
    {
        'status': 'ok',
        'message': 'GCS integration'
    }
)

