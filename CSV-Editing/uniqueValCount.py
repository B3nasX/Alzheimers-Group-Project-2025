#A script to extract unique values from all columns in a CSV file and count their occurrences.
import pandas as pd
import sys  
import os   
import argparse
import numpy as numpy   

def uniqueValCount(input_file, output_file):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(input_file)
    
    # Create a dictionary to hold the results
    result = {}

    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Get unique values and their counts
        # If values are numbers give a range of values in increments of 10 unless the numbers are 1 or 0, those are bools output as true or false
        # Values should be grouped logically

        if pd.api.types.is_numeric_dtype(df[column]):
            if set(df[column].dropna().unique()).issubset({0, 1}):
                counts = df[column].value_counts().to_dict()
                result[column] = { 'True': counts.get(1, 0), 'False': counts.get(0, 0) }
            else:
                bins = list(range(int(df[column].min()), int(df[column].max()) + 10, 10))
                labels = [f"{b}-{b+9}" for b in bins[:-1]]
                df['binned'] = pd.cut(df[column], bins=bins, labels=labels, right=False)
                counts = df['binned'].value_counts().sort_index().to_dict()
                result[column] = counts
                df.drop(columns=['binned'], inplace=True)
        else:
            counts = df[column].value_counts().to_dict()
            result[column] = counts
    # Convert the result dictionary to a DataFrame for better formatting
    result_df = pd.DataFrame(dict([(k,pd.Series(v)) for k,v in result.items()]))
    
    # Save the result to a .md file
    result_df.to_csv(output_file, index_label='Value')
    print(f"Unique value counts saved to {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract unique values from all columns in a CSV file and count their occurrences.')
    parser.add_argument('input_file', type=str, help='Path to the input CSV file')
    parser.add_argument('output_file', type=str, help='Path to the output CSV file')
    
    args = parser.parse_args() 
    
    uniqueValCount(args.input_file, args.output_file)

# Example usage:
# python uniqueValCount.py input.csv output.csv 
# This will read 'input.csv', count unique values in each column, and save the results to 'output.csv'.
# Make sure to have pandas installed in your Python environment.
# You can install it using pip:
# pip install pandas
# This script can handle both numeric and categorical data.










