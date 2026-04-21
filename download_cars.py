import json
import kagglehub
import pandas as pd
import os

try:
    print("Downloading dataset...")
    path = kagglehub.dataset_download("medhekarabhinav5/indian-cars-dataset")
    csv_file = os.path.join(path, "cars_ds_final.csv")
    
    # Read with explicit encoding
    df = pd.read_csv(csv_file, encoding='latin1')
    
    # Typically Indian car datasets have 'Make' and 'Model'. Let's inspect the columns
    print("Columns found:", df.columns.tolist())
    
    # Let's save a list of unique 'Make' + 'Model' to a JSON file
    if 'Make' in df.columns and 'Model' in df.columns:
        # Create full name
        df['FullName'] = df['Make'].astype(str) + ' ' + df['Model'].astype(str)
        unique_cars = df['FullName'].dropna().unique().tolist()
        
        # Output to a public asset for the frontend to use
        output_path = "public/indian_cars.json"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(unique_cars, f)
            
        print(f"Successfully saved {len(unique_cars)} cars to {output_path}")
        
    else:
        print("Couldn't find Make/Model columns. Dumping raw head:")
        print(df.head())

except Exception as e:
    print(f"Error: {e}")
