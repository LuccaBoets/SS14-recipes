import yaml
import json
from pathlib import Path

# Custom YAML loader to handle tags by converting them to 'type' fields
def sanitize_yaml(content):
    class SanitizingLoader(yaml.SafeLoader):
        pass

    def handle_tag(loader, tag_suffix, node):
        tag_value = tag_suffix.split(":")[-1]  # Get last part after colon
        
        if isinstance(node, yaml.MappingNode):
            data = loader.construct_mapping(node)
            return {"type": tag_value, **data}
        elif isinstance(node, yaml.SequenceNode):
            return [{"type": tag_value, **loader.construct_mapping(n)} for n in node.value]
        else:
            return {"type": tag_value, "value": loader.construct_scalar(node)}

    SanitizingLoader.add_multi_constructor("!", handle_tag)
    return yaml.load(content, Loader=SanitizingLoader)

# Registry for filename-specific processors
PROCESSORS = {
    # "special_file.yml": custom_processor_function,
}

def robust_harvest_processor(data):
    # Example custom processor for botany.yml
    for item in data:
        if item.get("id") == "RobustHarvest":
            item["group"] = "ModifiedBotanical"
    return data

PROCESSORS["botany.yml"] = robust_harvest_processor

def default_processor(data):
    """Default processing (no changes)"""
    return data

def process_file(yml_path, recipe_index):
    # Read YAML content
    with open(yml_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Sanitize and parse
    parsed_data = sanitize_yaml(content)
    
    # Apply filename-specific processing
    processor = PROCESSORS.get(yml_path.name, default_processor)
    processed_data = processor(parsed_data)
    
    # Add recipe data if the entry's id exists in recipe_index
    for item in processed_data:
        item_id = item.get('id')
        if item_id in recipe_index:
            item['recipe'] = recipe_index[item_id]
    
    # Convert to JSON and save
    json_path = yml_path.stem + ".json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(processed_data, f, indent=2, ensure_ascii=False)

def main():
    # First, collect all recipes into a dictionary indexed by id
    recipe_index = {}
    recipes_base = Path("Resources/Prototypes/Recipes")
    for yml_path in recipes_base.rglob("*.yml"):
        with open(yml_path, "r", encoding="utf-8") as f:
            content = f.read()
        parsed_data = sanitize_yaml(content)
        for entry in parsed_data:
            entry_id = entry.get('id')
            if entry_id:
                recipe_index[entry_id] = entry
    
    # Next, process all Reagents files and apply recipe linking
    reagents_base = Path("Resources/Prototypes/Reagents")
    for yml_path in reagents_base.rglob("*.yml"):
        process_file(yml_path, recipe_index)
        print(f"Processed: {yml_path}")

if __name__ == "__main__":
    main()