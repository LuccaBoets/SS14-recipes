// src/utils/yamlParser.js
import YAML from 'yaml';

const DATA_PATH = 'data';
const REAGENTS_PATH = `${DATA_PATH}/Reagents`;
const RECIPES_PATH = `${DATA_PATH}/Recipes/Reactions`;

// Generic function to fetch and parse any YAML file
export const fetchAndParseYAML = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}, Status: ${response.status}`);
    }

    const yamlText = await response.text();

    // Clean up and parse the YAML content
    const cleanedText = yamlText.replaceAll('!type:', 'typegroup: ');
    return YAML.parse(cleanedText);
  } catch (error) {
    console.error('Error fetching or parsing YAML:', error);
    throw new Error('Failed to fetch or parse YAML');
  }
};

// Factory function to create specific fetch functions
const createYAMLFetcher = (basePath, fileName) => {
  return () => fetchAndParseYAML(`${basePath}/${fileName}.yml`);
};

// Specific fetch functions for different YAML files
export const fetchBotanyYAML = createYAMLFetcher(REAGENTS_PATH, 'botany');
export const fetchBotanyRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'botany');

export const fetchChemicalsYAML = createYAMLFetcher(REAGENTS_PATH, 'chemicals');
export const fetchChemicalsRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'chemicals');

export const fetchBiologicalsYAML = createYAMLFetcher(REAGENTS_PATH, 'biological');
export const fetchBiologicalsRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'biological');

export const fetchCleaningYAML = createYAMLFetcher(REAGENTS_PATH, 'cleaning');
export const fetchCleaningRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'cleaning');

export const fetchFunYAML = createYAMLFetcher(REAGENTS_PATH, 'fun');
export const fetchFunRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'fun');

export const fetchGasesYAML = createYAMLFetcher(REAGENTS_PATH, 'gases');
export const fetchGasesRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'gas');

export const fetchMedicineYAML = createYAMLFetcher(REAGENTS_PATH, 'medicine');
export const fetchMedicineRecipeYAML = createYAMLFetcher(RECIPES_PATH, 'medicine');

export const fetchToxinsYAML = createYAMLFetcher(REAGENTS_PATH, 'toxins');