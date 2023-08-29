import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load your DataFrame here
df = pd.read_csv('diabetes_data_upload.csv')

# Define columns to encode
columns_to_encode = ['Polyuria', 'Polydipsia', 'sudden weight loss', 'weakness',
                     'Polyphagia', 'Genital thrush', 'visual blurring', 'Itching', 'Irritability',
                     'delayed healing', 'partial paresis', 'muscle stiffness', 'Alopecia', 'Obesity', 'Gender']

# Apply label encoding to categorical columns
label_encoder = LabelEncoder()
for col in columns_to_encode:
    df[col] = label_encoder.fit_transform(df[col])

# Separate features (X) and target (y)
X = df.drop('class', axis=1)
y = df['class']

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_train, y_train)

# Save the trained Random Forest model to a pickle file
filename = 'random_forest_model_with_label_encoder.pkl'
joblib.dump(rf_model, filename)

print(f"Random Forest model (with Label Encoder) saved as {filename}")
