import json
import google.generativeai as genai

genai.configure(api_key="AIzaSyCFZOoMNXiCJT4wFHCdqrXe4r9snIUFbGw")

MODEL = genai.GenerativeModel("gemini-1.5-pro")

EVAL_PROMPT = """
You are evaluating structured data for use by a Large Language Model.

Given the following DATA, score it on a scale of 0–10 for each criterion. ^ an dexcription as perspective why do you think it is efficient 
Do NOT assume missing data. Judge only based on the representation.

Criteria:
1. Structural understandability
2. Readability for machine reasoning
3. Ease of extracting values
4. Context window efficiency
5. Schema clarity
6. Risk of hallucination
7. Reasoning stability on large scale data
8. Matching and aggregation reliability

Return STRICT JSON only.

DATA:
"""

def evaluate(data):
    text = json.dumps(data, ensure_ascii=False)
    response = MODEL.generate_content(EVAL_PROMPT + text)
    return json.loads(response.text)


# Load data
with open("coiltest.json") as f:
    original = json.load(f)

with open("coilenc.json") as f:
    encoded = json.load(f)

# Run evaluation
orig_eval = evaluate(original)
enc_eval = evaluate(encoded)

# Save results
with open("llm_eval_original.json", "w") as f:
    json.dump(orig_eval, f, indent=2)

with open("llm_eval_encoded.json", "w") as f:
    json.dump(enc_eval, f, indent=2)

print("LLM evaluation completed")
