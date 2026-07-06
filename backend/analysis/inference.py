"""
Placeholder inference module.
Swap the body of run_detection() with the real model call once it's ready.
Keep the input/output shape the same so nothing else needs to change.
"""
import random

def run_detection(file_path: str, file_type: str) -> dict:
    # TODO: replace with real model loading + prediction
    fake_score = round(random.uniform(0, 1), 4)
    return {
        "verdict": "fake" if fake_score > 0.5 else "real",
        "confidence_score": fake_score,
        "raw_output": {"note": "stub result, model not yet integrated"},
    }