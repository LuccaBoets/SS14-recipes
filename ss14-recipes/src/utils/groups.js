// group.js
import { reagentFetchers } from './yamlParser';

const GROUPS = {
    drinks: ['alcohol', 'base_drink', 'drinks', 'juice', 'soda'],
    food: ['condiments', 'food', 'ingredients'],
    chemicals: ['chemicals', 'cleaning', 'toxins', 'elements'],
    biologicals: ['biologicals', 'medicine', 'narcotics'],
    pyrotechnics: ['pyrotechnics'],
    botany: ['botany'],
    fun: ['fun'],
    gases: ['gases'],
};

export const test = async () => {
    const allGroups = {};

    // Iterate over all groups (drinks, food, chemicals, etc.)
    for (const [groupKey, subGroups] of Object.entries(GROUPS)) {
        allGroups[groupKey] = [];

        // Iterate over the subgroups (e.g., 'alcohol', 'juice', etc. for drinks)
        for (const subGroup of subGroups) {

            // Dynamically call the appropriate fetch function for reagents
            const fetchReagentFunction = reagentFetchers[`fetch${capitalize(subGroup)}YAML`];
            if (fetchReagentFunction) {
                try {
                    const reagentData = await fetchReagentFunction();
                    const reagentIds = reagentData.map(value => {
                        return value.id;
                    });
                    console.log(reagentIds)

                    allGroups[groupKey].push(reagentIds);
                } catch (error) {
                    console.error(`Failed to fetch or process reagent YAML for ${subGroup}:`, error);
                }
            }

            // Similarly, check if there's a recipe fetcher for this subgroup and fetch it
            //   const fetchRecipeFunction = recipeFetchers[`fetch${capitalize(subGroup)}RecipeYAML`];
            //   if (fetchRecipeFunction) {
            //     try {
            //       const recipeData = await fetchRecipeFunction();
            //       const recipeIds = Object.keys(recipeData); // Assuming IDs are the keys in the YAML data
            //       allGroups[groupKey][subGroup] = allGroups[groupKey][subGroup].concat(recipeIds);
            //     } catch (error) {
            //       console.error(`Failed to fetch or process recipe YAML for ${subGroup}:`, error);
            //     }
            //   }
        }

        allGroups[groupKey] = allGroups[groupKey].flat()
    }

    convertToJsonAndArray(allGroups)
    return allGroups;
};

export const convertToJsonAndArray = (allGroups) => {
    // Convert allGroups into a stringified JSON
    const jsonString = JSON.stringify(allGroups, null, 2); // Beautified JSON

    console.log(jsonString)
}

// Helper function to capitalize keys for function names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
