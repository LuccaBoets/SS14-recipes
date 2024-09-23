// src/utils/reagents.js
import {
    fetchBotanyRecipeYAML,
    fetchBotanyYAML,
    fetchChemicalsRecipeYAML,
    fetchChemicalsYAML,
    fetchBiologicalsYAML,
    fetchBiologicalsRecipeYAML,
    fetchCleaningYAML,
    fetchCleaningRecipeYAML,
    fetchFunYAML,
    fetchFunRecipeYAML,
    fetchGasesYAML,
    fetchGasesRecipeYAML,
    fetchMedicineYAML,
    fetchMedicineRecipeYAML,
    fetchToxinsYAML
} from './yamlParser';

// Fetch and combine all reagents
export const getReagentsDTO = async () => {
    const botanyReagents = await getReagentsData(fetchBotanyYAML, fetchBotanyRecipeYAML);
    const chemicalsReagents = await getReagentsData(fetchChemicalsYAML, fetchChemicalsRecipeYAML);
    const biologicalsReagents = await getReagentsData(fetchBiologicalsYAML, fetchBiologicalsRecipeYAML);
    const cleaningReagents = await getReagentsData(fetchCleaningYAML, fetchCleaningRecipeYAML);
    const funReagents = await getReagentsData(fetchFunYAML, fetchFunRecipeYAML);
    const gasesReagents = await getReagentsData(fetchGasesYAML, fetchGasesRecipeYAML);
    const medicinesReagents = await getReagentsData(fetchMedicineYAML, fetchMedicineRecipeYAML);
    const toxinsReagents = await getReagentsData(fetchToxinsYAML, fetchChemicalsRecipeYAML);

    return [...botanyReagents, ...chemicalsReagents, ...biologicalsReagents, ...cleaningReagents, ...funReagents, ...gasesReagents, ...medicinesReagents, ...toxinsReagents]; // Combine both reagent arrays
};

// Fetch specific reagent data and map recipes
async function getReagentsData(fetchReagents, fetchRecipes) {
    const [reagents, recipes] = await Promise.all([fetchReagents(), fetchRecipes()]); // Fetch both in parallel
    return convertReagents(reagents, recipes); // Map recipes to reagents
}

// Convert reagents and map recipes to them
function convertReagents(reagents, recipes) {
    return reagents.map(reagent => {
        const matchingRecipe = recipes.find(recipe => recipe.id === reagent.id);

        return {
            id: reagent.id,
            name: reagent.name,
            group: reagent.group,
            color: reagent.color,
            hasRecipe: Boolean(matchingRecipe),
            recipe: matchingRecipe
                ? {
                    ...matchingRecipe,
                    products: Object.values(matchingRecipe.products)[0] // Get the first product amount
                }
                : {} // Empty object if no recipe exists
        };
    });
}
