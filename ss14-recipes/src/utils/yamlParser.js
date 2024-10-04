// src/utils/yamlParser.js
import YAML from 'yaml';
import { PATHS, REAGENTS_PATH, RECIPES_PATH } from './config';

const fetchAndParseYAML = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}, Status: ${response.status}`);
    }
    const yamlText = await response.text();
    const cleanedText = yamlText.replaceAll('!type:', 'typegroup: ');
    return YAML.parse(cleanedText);
  } catch (error) {
    console.error(`Error in fetchAndParseYAML for ${filePath}:`, error);
    throw new Error(`Failed to load or parse YAML file: ${filePath}. ${error.message}`);
  }
};

// Function to create YAML fetchers
const createYAMLFetcher = (basePath, fileName) => {
  return () => fetchAndParseYAML(`${basePath}/${fileName}.yml`);
};

// Dynamically create fetch functions for reagents
export const reagentFetchers = {};
for (const [key, fileName] of Object.entries(PATHS.reagents)) {
  reagentFetchers[`fetch${capitalize(key)}YAML`] = createYAMLFetcher(REAGENTS_PATH, fileName);
}

// Dynamically create fetch functions for recipes
export const recipeFetchers = {};
for (const [key, fileName] of Object.entries(PATHS.recipes)) {
  recipeFetchers[`fetch${capitalize(key)}RecipeYAML`] = createYAMLFetcher(RECIPES_PATH, fileName);
}

// Helper function to capitalize keys for function names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
