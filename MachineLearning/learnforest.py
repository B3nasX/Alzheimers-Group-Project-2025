import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load data
df = pd.read_csv('dementia_patients_health_data.csv')

# Remove the data leakage
df_fixed = df.drop('Cognitive_Test_Scores', axis=1)

# Also remove prescription/dosage (they're treatments, not predictors)
df_fixed = df_fixed.drop(['Prescription', 'Dosage in mg'], axis=1)

# Handle categorical variables
categorical_cols = ['Education_Level', 'Dominant_Hand', 'Gender', 'Family_History',
                   'Smoking_Status', 'APOE_ε4', 'Physical_Activity', 'Depression_Status',
                   'Medication_History', 'Nutrition_Diet', 'Sleep_Quality', 
                   'Chronic_Health_Conditions']

for col in categorical_cols:
    df_fixed[col] = pd.factorize(df_fixed[col])[0]

# Prepare features and target
X = df_fixed.drop('Dementia', axis=1)
y = df_fixed['Dementia']

print(f"Using {len(X.columns)} features: {list(X.columns)}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")
print(f"Dementia rate - Train: {(y_train.sum()/len(y_train))*100:.1f}%, Test: {(y_test.sum()/len(y_test))*100:.1f}%")

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
train_acc = model.score(X_train, y_train)
test_acc = model.score(X_test, y_test)

print(f"\n=== REALISTIC RESULTS ===")
print(f"Training accuracy: {train_acc:.1%}")
print(f"Test accuracy: {test_acc:.1%}")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop features by importance:")
print(feature_importance.head(10))



