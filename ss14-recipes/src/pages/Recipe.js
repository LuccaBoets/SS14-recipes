import React, { useEffect, useState, useCallback } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import './../App.css';
import { getReagentsDTO } from '../utils/reagentsDTO';
import 'beautiful-react-diagrams/styles.css';
import { useParams } from 'react-router-dom';

function RecipeShowLeft(reagents, nodes, links, base, xRecipe, yRecipe, previousNodeName) {
  let currentReagentItem = reagents.find(r => r.id == base.id)

  let nodeName = `node-${currentReagentItem.id})${previousNodeName}`;

  nodes.push({
    id: nodeName,
    content: currentReagentItem.name,
    coordinates: [xRecipe * 200, yRecipe * 100]
  });

  if (previousNodeName != "base") {
    links.push({
      input: nodeName,
      output: previousNodeName,
      readonly: true
    });
  }

  xRecipe -= 1;

  if (currentReagentItem.hasRecipe) {
    currentReagentItem.recipe.forEach((recipeItem, recipeIndex) => {
      RecipeShowLeft(reagents, nodes, links, recipeItem, xRecipe, yRecipe, nodeName);
      yRecipe -= 1
    })
  }
}

const RecipeDiagram = ({ reagents, recipeName }) => {
  const [schema, { onChange }] = useSchema(createSchema({ nodes: [], links: [] }));

  useEffect(() => {
    const nodes = [];
    const links = [];

    let reagentItem = reagents.find(r => r.id == recipeName)
    let xRecipe = 5;
    let yRecipe = 4;

    RecipeShowLeft(reagents, nodes, links, reagentItem, xRecipe, yRecipe, "base")
  
    onChange({ nodes, links });

  }, [reagents, onChange]);

  return (
    <div style={{ height: '3000px', width: '3000px' }} >
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

function Recipe() {
  const [reagents, setReagents] = useState([]);
  const { recipeName } = useParams(); 

  

  useEffect(() => {
    (async () => {
      try {
        const fetchedReagents = await getReagentsDTO();
        if (fetchedReagents && Array.isArray(fetchedReagents)) {
          setReagents(fetchedReagents); // Set all reagents
        } else {
          console.error('Invalid reagents data:', fetchedReagents);
        }
      } catch (error) {
        console.error('Error fetching reagents:', error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>All Reagents and Recipes Diagram</h1>
      {reagents.length > 0 ? <RecipeDiagram reagents={reagents} recipeName={recipeName} /> : <p>Loading...</p>}
    </div>
  );
}

export default Recipe;
