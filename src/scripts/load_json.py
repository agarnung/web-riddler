# TODO add explanation tag
import json

def count_words(sentence):
    return len(sentence.split())

input_filename = '../assets/data.json' # Downloaded from https://huggingface.co/datasets/flyingfishinwater/riddle/blob/main/riddle.jsonl

filtered_data = []

with open(input_filename, 'r') as file:
    for line in file:
        try:
            entry = json.loads(line)
            question = entry['input']
            solution = entry['output']
            
            if count_words(solution) <= 3:
                filtered_data.append({
                    "question": question,
                    "solution": solution
                })
        except json.JSONDecodeError as e:
            print(f"Decoder error in line: {line}")
            print(f"Error details: {e}")

output_filename = 'filtered_output.json'

with open(output_filename, 'w') as file:
    json.dump(filtered_data, file, indent=4)

print(f"Filtered data has been saved to {output_filename}")

