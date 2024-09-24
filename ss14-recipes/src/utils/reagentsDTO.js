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

// Fetch all YAML data first, then process it into the correct shape
export const getReagentsDTO = async () => {
    const [
        botanyReagents, botanyRecipes,
        chemicalsReagents, chemicalsRecipes,
        biologicalsReagents, biologicalsRecipes,
        cleaningReagents, cleaningRecipes,
        funReagents, funRecipes,
        gasesReagents, gasesRecipes,
        medicinesReagents, medicinesRecipes,
        toxinsReagents, toxinsRecipes
    ] = await Promise.all([
        fetchBotanyYAML(), fetchBotanyRecipeYAML(),
        fetchChemicalsYAML(), fetchChemicalsRecipeYAML(),
        fetchBiologicalsYAML(), fetchBiologicalsRecipeYAML(),
        fetchCleaningYAML(), fetchCleaningRecipeYAML(),
        fetchFunYAML(), fetchFunRecipeYAML(),
        fetchGasesYAML(), fetchGasesRecipeYAML(),
        fetchMedicineYAML(), fetchMedicineRecipeYAML(),
        fetchToxinsYAML(), fetchChemicalsRecipeYAML()
    ]);

    // Process all reagents and recipes into the correct shape
    const allReagents = [
        { reagents: botanyReagents, recipes: botanyRecipes },
        { reagents: chemicalsReagents, recipes: chemicalsRecipes },
        { reagents: biologicalsReagents, recipes: biologicalsRecipes },
        { reagents: cleaningReagents, recipes: cleaningRecipes },
        { reagents: funReagents, recipes: funRecipes },
        { reagents: gasesReagents, recipes: gasesRecipes },
        { reagents: medicinesReagents, recipes: medicinesRecipes },
        { reagents: toxinsReagents, recipes: toxinsRecipes }
    ];

    // Map and convert all reagents and recipes into the correct format
    console.log(allReagents.flatMap(({ reagents, recipes }) => convertReagents(reagents, recipes)));
    return allReagents.flatMap(({ reagents, recipes }) => convertReagents(reagents, recipes));
};


function convertReagents(reagents, recipes) {
    return reagents.map(reagent => {
        const matchingRecipe = recipes.find(recipe => recipe.id === reagent.id);
        let reagentsRecipes = {}

        if (matchingRecipe) {
            reagentsRecipes = Object.entries(matchingRecipe.reactants).map(value => {
                const reagent = reagents.find(r => r.id === value[0]);

                if (reagent){
                    console.log(value[0])
                    console.log(reagent)
                    console.log(reagent.color)

                }

                const name = reagent ? reagent.name : 'Unknown';
                const color = reagent ? reagent.color : '#ffffff';

                return {
                    id: value[0],
                    name: name,
                    color: color,
                    amount: value[1].amount
                };
            });
        }

        return {
            id: reagent.id,
            name: reagent.name.replaceAll('-', ' ').replace('reagent name ', ''),
            group: reagent.group ? reagent.group : "Uknown",
            color: reagent.color,
            hasRecipe: Boolean(matchingRecipe),
            recipe: reagentsRecipes
        };
    });
}