// src/utils/yamlParser.js
import { reagentFetchers, recipeFetchers } from './yamlParser';
import { PATHS } from './config';
import groupsData from './group.json';

// Function to fetch all reagents and recipes dynamically
export const getReagentsDTO = async () => {
  // Dynamically create fetch promises for reagents
  const reagentPromises = Object.keys(PATHS.reagents).map((key) => reagentFetchers[`fetch${capitalize(key)}YAML`]());

  // Dynamically create fetch promises for recipes
  const recipePromises = Object.keys(PATHS.recipes).map((key) => recipeFetchers[`fetch${capitalize(key)}RecipeYAML`]());

  // Await all the promises in parallel
  const [
    reagentsResults,
    recipesResults,
  ] = await Promise.all([
    Promise.all(reagentPromises), // Fetch all reagents
    Promise.all(recipePromises),  // Fetch all recipes
  ]);

  // Combine all fetched reagents and recipes
  const reagents = reagentsResults.flat(); // Flatten if needed
  const recipes = recipesResults.flat();

  return convertReagents(reagents, recipes);
};

// Helper function to capitalize keys for dynamic access
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function findGroup(reagentName) {
  for (const [group, reagents] of Object.entries(groupsData)) {
      if (reagents.includes(reagentName)) {
          return group;
      }
  }
  return "Unknown"; // Default if group not found
}

function convertReagents(reagents, recipes) {
    return reagents.map(reagent => {
        const matchingRecipe = recipes.find(recipe => recipe.id === reagent.id);
        let reagentsRecipes = {}
        let amount = "";

        if (matchingRecipe) {
            reagentsRecipes = Object.entries(matchingRecipe.reactants).map(value => {
                const reagent = reagents.find(r => r.id === value[0]);

                const name = reagent ? reagent.name : 'Unkown'; // value[0]
                const color = reagent ? reagent.color : '#ffffff';
                
                return {
                    id: value[0],
                    name: name.replaceAll('-', ' ').replace('reagent name ', ''),
                    color: color,
                    amount: value[1].amount
                };
            });

            amount = Object.values(matchingRecipe.products)[0]
        }

        const group = findGroup(reagent.id ? reagent.id : '');

        return {
            id: reagent.id,
            name: reagent.name ? reagent.name.replaceAll('-', ' ').replace('reagent name ', '') : "Unknown",
            group: group,
            color: reagent.color,
            amount: amount ? amount : '',
            hasRecipe: Boolean(matchingRecipe),
            recipe: reagentsRecipes
        };
    });
}