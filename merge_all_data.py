import json
import os

# Files to merge
files_to_merge = [
    ('aboutData.json', 'aboutData.de.json'),
    ('testimonialsData.json', 'testimonialsData.de.json')
]

for en_file, de_file in files_to_merge:
    en_path = f'src/data/{en_file}'
    de_path = f'src/data/{de_file}'
    
    if os.path.exists(en_path) and os.path.exists(de_path):
        # Read English data
        with open(en_path, 'r', encoding='utf-8') as f:
            english_data = json.load(f)
        
        # Read German data
        with open(de_path, 'r', encoding='utf-8') as f:
            german_data = json.load(f)
        
        # Create consolidated bilingual structure
        bilingual_data = {
            "en": english_data,
            "de": german_data
        }
        
        # Write consolidated file
        with open(en_path, 'w', encoding='utf-8') as f:
            json.dump(bilingual_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Successfully merged {en_file}!")
    else:
        print(f"⚠️  Skipping {en_file} - files not found")

print("\n🎉 All data files have been consolidated into bilingual format!")
