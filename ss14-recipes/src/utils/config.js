// src/config.js

export const DATA_PATH = 'data';
export const REAGENTS_PATH = `${DATA_PATH}/Reagents`;
export const RECIPES_PATH = `${DATA_PATH}/Recipes`;

export const PATHS = {
    reagents: {
        biologicals: 'biological',
        botany: 'botany',
        chemicals: 'chemicals',
        cleaning: 'cleaning',
        fun: 'fun',
        gases: 'gases',
        medicine: 'medicine',
        toxins: 'toxins',
        elements: 'elements',
        narcotics: 'narcotics',
        pyrotechnics: 'pyrotechnic',
        alcohol: 'Consumable/Drink/alcohol',
        base_drink: 'Consumable/Drink/base_drink',
        drinks: 'Consumable/Drink/drinks',
        juice: 'Consumable/Drink/juice',
        soda: 'Consumable/Drink/soda',
        condiments: 'Consumable/Food/condiments',
        food: 'Consumable/Food/food',
        ingredients: 'Consumable/Food/ingredients',
    },
    recipes: {
        biologicals: 'Reactions/biological',
        botany: 'Reactions/botany',
        chemicals: 'Reactions/chemicals',
        cleaning: 'Reactions/cleaning',
        drinks: 'Reactions/drinks',
        food: 'Reactions/food',
        fun: 'Reactions/fun',
        gases: 'Reactions/gas',
        medicine: 'Reactions/medicine',
        // food_element: 'Cooking/food_sequence_element',
        meal_recipes: 'Cooking/meal_recipes',
        medical_recipes: 'Cooking/medical_recipes',
        sequence_metamorph: 'Cooking/sequence_metamorph',
    }
};
