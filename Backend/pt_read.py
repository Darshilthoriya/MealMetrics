import torch

# Use raw string notation to avoid issues with backslashes
file_path = r'C:\Users\omson\OneDrive\Desktop\VScode\MealMetrics\MealMetrics\Backend\yolov5\yolov5s.pt'

try:
    # Load the YOLO model
    model = torch.load(file_path, map_location='cpu', weights_only=False)
    
    # If the file contains a model, it will be a torch.nn.Module or similar
    if isinstance(model, torch.nn.Module):
        print("Loaded a PyTorch model.")
        print("Model architecture:")
        print(model)
    elif isinstance(model, dict):
        print("Loaded a dictionary object.")
        print("Keys in the dictionary:")
        print(model.keys())
    else:
        print("Loaded an unknown object type.")
        print(model)
except Exception as e:
    print(f"An error occurred: {e}")
