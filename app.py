import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS settings
origins = ["http://localhost:3000"]  # Replace with your React app's URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained Random Forest model from the pickle file
model = joblib.load('random_forest_model_with_label_encoder.pkl')

class PredictionInput(BaseModel):
    Age: int
    Gender: int
    Polyuria: int
    Polydipsia: int
    Sudden_weight_loss: int
    Weakness: int
    Polyphagia: int
    Genital_thrush: int
    Visual_blurring: int
    Itching: int
    Irritability: int
    Delayed_healing: int
    Partial_paresis: int
    Muscle_stiffness: int
    Alopecia: int
    Obesity: int

@app.post("/predict/")
def predict_diabetes(data: PredictionInput):
    features = [[
        data.Age, data.Gender, data.Polyuria, data.Polydipsia, data.Sudden_weight_loss,
        data.Weakness, data.Polyphagia, data.Genital_thrush, data.Visual_blurring, data.Itching,
        data.Irritability, data.Delayed_healing, data.Partial_paresis, data.Muscle_stiffness,
        data.Alopecia, data.Obesity
    ]]
    prediction = model.predict(features)
    return {"prediction": prediction[0]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
