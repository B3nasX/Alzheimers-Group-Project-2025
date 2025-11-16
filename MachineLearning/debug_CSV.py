import pandas as pd
import numpy as np

df = pd.read_csv('dementia_patients_health_data.csv')
print("=== CSV STRUCTURE ===")
print("First 3 rows:")
print(df.head(3))
print("\nColumn dtypes:")
print(df.dtypes)
print("\nMissing values per column:")
print(df.isnull().sum())

print(f"\nDuplicate rows: {df.duplicated().sum()}")

print(f"\n=== CORRELATION WITH DEMENTIA ===")
for col in df.columns:
    if col != 'Dementia' and df[col].dtype in [np.int64, np.float64]:
        corr = df[col].corr(df['Dementia'])
        if abs(corr) > 0.8:
            print(f"HIGH CORRELATION: {col} -> {corr:.3f}")


