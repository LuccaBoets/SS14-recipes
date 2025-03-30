import os
import yaml
import json

class CustomLoader(yaml.SafeLoader):
    pass

# Function to handle custom tags
def parse_custom_tag(loader, tag_suffix, node):
    if isinstance(node, yaml.MappingNode):
        value = loader.construct_mapping(node)
    elif isinstance(node, yaml.SequenceNode):
        value = loader.construct_sequence(node)
    else:
        value = loader.construct_scalar(node)
    return {f"!{tag_suffix}": value}

# Register the multi-constructor to handle all `!type` tags
CustomLoader.add_multi_constructor("!", parse_custom_tag)


def parse_yaml_files(root_folder):
    data = {
        "reagents": [],
        "reactions": []
    }

    for root, _, files in os.walk(root_folder):
        for file in files:
            if file.endswith('.yml') or file.endswith('.yaml'):
                file_path = os.path.join(root, file)
                print(f"Parsing file: {file_path}")
                with open(file_path, 'r') as yaml_file:
                    try:
                        yaml_data = yaml.load(yaml_file, Loader=CustomLoader)
                        if isinstance(yaml_data, list):
                            for item in yaml_data:
                                if item.get('type') == 'reagent':
                                    data['reagents'].append(item)
                                    print(f"Found reagent: {item.get('id')}")
                                elif item.get('type') == 'reaction':
                                    data['reactions'].append(item)
                                    print(f"Found reaction: {item.get('id')}")
                                else:
                                    print("Unknown type found.")
                        else:
                            print("Invalid YAML structure.")
                    except yaml.YAMLError as e:
                        print(f"Error parsing YAML file {file_path}: {e}")

    return data

def write_to_json_file(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)
        print(f"Data written to {output_file}")

def main():
    root_folder = 'ss14-recipes\\public\\data'  # The root folder containing YAML files
    output_file = 'data.json'  # The output JSON file

    print("Starting YAML parsing...")
    parsed_data = parse_yaml_files(root_folder)
    print("YAML parsing completed.")

    print("Writing data to JSON file...")
    write_to_json_file(parsed_data, output_file)
    print("Process completed successfully.")

if __name__ == '__main__':
    main()
