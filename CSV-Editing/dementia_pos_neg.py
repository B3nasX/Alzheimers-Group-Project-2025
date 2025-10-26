import numpy as np  
import pandas as pd 

#A function to find the average value of patients who are positive for dementia
def average_dementia_positive(file_path):
    # Load the dataset
    data = pd.read_csv(file_path)
    
    # Filter the dataset for patients positive for dementia
    dementia_positive_data = data[data['Dementia'] == 1]
    
    # Calculate the average values for each health metric
    mean_values = dementia_positive_data.mean(numeric_only=True)
    mode_values = dementia_positive_data.mode(numeric_only=True).iloc[0]
    median_values = dementia_positive_data.median(numeric_only=True)
    
    print("Mean values for patients positive for dementia:")
    print(mean_values)
    print("\nMode values for patients positive for dementia:")
    print(mode_values)
    print("\nMedian values for patients positive for dementia:")
    print(median_values)

def average_dementia_negative(file_path):
    # Load the dataset
    data = pd.read_csv(file_path)
    
    # Filter the dataset for patients positive for dementia
    dementia_positive_data = data[data['Dementia'] == 0]
    
    # Calculate the average values for each health metric
    mean_values = dementia_positive_data.mean(numeric_only=True)
    mode_values = dementia_positive_data.mode(numeric_only=True).iloc[0]
    median_values = dementia_positive_data.median(numeric_only=True)
    
    print("Mean values for patients positive for dementia:")
    print(mean_values)
    print("\nMode values for patients positive for dementia:")
    print(mode_values)
    print("\nMedian values for patients positive for dementia:")
    print(median_values)




average_dementia_positive('dementia_patients_health_data.csv')
average_dementia_negative('dementia_patients_health_data.csv')
