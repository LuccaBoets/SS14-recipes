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
    fetchToxinsYAML,
    fetchElementsYAML,
    fetchNarcoticsYAML,
    fetchPyrotechnicsYAML
} from './yamlParser';

// Fetch all YAML data first, then process it into the correct shape
export const getReagentsDTO = async () => {
    const [
        biologicalsReagents, biologicalsRecipes,
        botanyReagents, botanyRecipes,
        chemicalsReagents, chemicalsRecipes,
        cleaningReagents, cleaningRecipes,
        elementsReagents,
        funReagents, funRecipes,
        gasesReagents, gasesRecipes,
        medicinesReagents, medicinesRecipes,
        narcoticsReagents,
        pyrotechnicsReagents,
        toxinsReagents,
    ] = await Promise.all([
        fetchBiologicalsYAML(), fetchBiologicalsRecipeYAML(),
        fetchBotanyYAML(), fetchBotanyRecipeYAML(),
        fetchChemicalsYAML(), fetchChemicalsRecipeYAML(),
        fetchCleaningYAML(), fetchCleaningRecipeYAML(),
        fetchElementsYAML(),
        fetchFunYAML(), fetchFunRecipeYAML(),
        fetchGasesYAML(), fetchGasesRecipeYAML(),
        fetchMedicineYAML(), fetchMedicineRecipeYAML(),
        fetchNarcoticsYAML(),
        fetchPyrotechnicsYAML(),
        fetchToxinsYAML(),

    ]);

    // Process all reagents and recipes into the correct shape
    const reagents = [
        ...botanyReagents,
        ...chemicalsReagents,
        ...biologicalsReagents,
        ...cleaningReagents,
        ...funReagents,
        ...gasesReagents,
        ...medicinesReagents,
        ...toxinsReagents,
        ...elementsReagents,
        ...narcoticsReagents,
        ...pyrotechnicsReagents
    ];

    const recipes = [
        ...botanyRecipes,
        ...chemicalsRecipes,
        ...biologicalsRecipes,
        ...cleaningRecipes,
        ...funRecipes,
        ...gasesRecipes,
        ...medicinesRecipes,
    ];

    // Map and convert all reagents and recipes into the correct format
    console.log(convertReagents(reagents, recipes));
    return convertReagents(reagents, recipes);
};


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

        return {
            id: reagent.id,
            name: reagent.name ? reagent.name.replaceAll('-', ' ').replace('reagent name ', '') : "Unknown",
            group: reagent.group ? reagent.group : "Uknown",
            color: reagent.color,
            amount: amount ? amount : '',
            hasRecipe: Boolean(matchingRecipe),
            recipe: reagentsRecipes
        };
    });
}