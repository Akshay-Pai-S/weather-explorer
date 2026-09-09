from fastapi import FastAPI

app=FastAPI(title='Weather explorer')


@app.get('/')
def get_root():
    return {'message' : 'Hello Welcome to weather explorer'}

@app.get('/health')
def health_check():
    return {'status': 'OK'}