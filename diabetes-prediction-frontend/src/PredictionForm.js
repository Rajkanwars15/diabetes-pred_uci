import React, { useState } from 'react';
import axios from 'axios';
import './PredictionForm.css'; // Import your CSS file

const initialFormData = {
  Age: 20,
  Gender: 'Male',
  Polyuria: 'Yes',
  Polydipsia: 'Yes',
  'sudden weight loss': 'Yes',
  weakness: 'Yes',
  Polyphagia: 'Yes',
  'Genital thrush': 'Yes',
  'visual blurring': 'Yes',
  Itching: 'Yes',
  Irritability: 'Yes',
  'delayed healing': 'Yes',
  'partial paresis': 'Yes',
  'muscle stiffness': 'Yes',
  Alopecia: 'Yes',
  Obesity: 'Yes',
};

function PredictionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the numeric form data object in the desired order
    const numericFormData = {
      Age: parseInt(formData.Age),
      Gender: formData.Gender === 'Male' ? 1 : 0,
      Polyuria: formData.Polyuria === 'Yes' ? 1 : 0,
      Polydipsia: formData.Polydipsia === 'Yes' ? 1 : 0,
      Sudden_weight_loss: formData['sudden weight loss'] === 'Yes' ? 1 : 0,
      Weakness: formData.weakness === 'Yes' ? 1 : 0,
      Polyphagia: formData.Polyphagia === 'Yes' ? 1 : 0,
      Genital_thrush: formData['Genital thrush'] === 'Yes' ? 1 : 0,
      Visual_blurring: formData['visual blurring'] === 'Yes' ? 1 : 0,
      Itching: formData.Itching === 'Yes' ? 1 : 0,
      Irritability: formData.Irritability === 'Yes' ? 1 : 0,
      Delayed_healing: formData['delayed healing'] === 'Yes' ? 1 : 0,
      Partial_paresis: formData['partial paresis'] === 'Yes' ? 1 : 0,
      Muscle_stiffness: formData['muscle stiffness'] === 'Yes' ? 1 : 0,
      Alopecia: formData.Alopecia === 'Yes' ? 1 : 0,
      Obesity: formData.Obesity === 'Yes' ? 1 : 0,
    };

    console.log('Data being sent to FastAPI:', numericFormData);

    try {
      const response = await axios.post('http://localhost:8000/predict/', numericFormData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="form-heading">Diabetes Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(initialFormData).map(([field, value]) => (
          <div className="form-group" key={field}>
            <label className="form-label">{field}:</label>
            {field === 'Age' ? (
              <div className="input-group">
                <input
                  type="range"
                  name={field}
                  min="20"
                  max="65"
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                <p className="slider-value">{parseInt(formData[field])} years</p>
              </div>
            ) : field === 'Gender' ? (
              <select
                className="select-dropdown"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <select
                className="select-dropdown"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
          </div>
        ))}
        <button type="submit" className="button">
          Predict
        </button>
      </form>
      {prediction && <p className="prediction">Prediction: {prediction}</p>}
    </div>
  );
}

export default PredictionForm;
