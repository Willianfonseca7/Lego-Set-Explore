import json

# Read English data
with open('src/data/categoryData.json', 'r', encoding='utf-8') as f:
    english_data = json.load(f)

# Read German data
with open('src/data/categoryData.de.json', 'r', encoding='utf-8') as f:
    german_data = json.load(f)

# Create consolidated bilingual structure
bilingual_data = {
    "en": english_data,
    "de": german_data
}

# Write consolidated file
with open('src/data/categoryData.json', 'w', encoding='utf-8') as f:
    json.dump(bilingual_data, f, ensure_ascii=False, indent=2)

print("✅ Successfully merged categoryData into single bilingual file!")
print(f"   - English categories: {len(english_data)}")
print(f"   - German categories: {len(german_data)}")
