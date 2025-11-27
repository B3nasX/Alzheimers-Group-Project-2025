import numpy as np  
import pandas as pd 

#A function to find all null values in a csv    

    
def find_nulls_in_csv(file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(file_path)
    
    # Get the count of null values in each column
    null_counts = df.isnull().sum()
    
    print(f'\n{null_counts}')

find_nulls_in_csv('dementia_patients_health_data.csv')
