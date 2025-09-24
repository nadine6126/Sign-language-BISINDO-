from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil

app = FastAPI()

# Izinkan akses dari React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # bisa diganti ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model YOLO sekali aja
model = YOLO("best.pt")

# Mapping label YOLO ke huruf A–Z
LABEL_MAP = {
    0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G",
    7: "H", 8: "I", 9: "J", 10: "K", 11: "L", 12: "M",
    13: "N", 14: "O", 15: "P", 16: "Q", 17: "R", 18: "S",
    19: "T", 20: "U", 21: "V", 22: "W", 23: "X", 24: "Y", 25: "Z"
}

@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Simpan file
    with open("temp.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Jalankan YOLO
    results = model("temp.jpg")
    detections = results[0].boxes

    prediction = "UNKNOWN"
    conf = 0.0

    if len(detections) > 0:
        # ambil deteksi dengan confidence tertinggi
        best_det = max(detections, key=lambda x: float(x.conf[0]))
        conf = best_det.conf.item()
        cls_id = int(best_det.cls.item())

        prediction = LABEL_MAP.get(cls_id, "UNKNOWN")

        if conf < 0.6:
            prediction = "UNKNOWN"

    print(f"DEBUG >> pred: {prediction}, conf: {conf:.2f}")
    return {
        "prediction": prediction,
        "confidence": conf
    }