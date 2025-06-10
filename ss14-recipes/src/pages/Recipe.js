import React, { useEffect, useState, useCallback } from 'react';
import './../App.css';
import 'beautiful-react-diagrams/styles.css';
import { useParams } from 'react-router-dom';
import reagentsFile from './../data.json';

const AMOUNT_TYPES = [5, 10, 15, 20, 25, 30, 40, 50, 60, 100, 200]

function getNextHigherAmount(num) {
  return AMOUNT_TYPES.find(amount => amount >= num) ?? null;
}

function Recipe() {
  const { id } = useParams();

  const handleChange = (e) => {
    setNumber(Number(e.target.value));
  };

  const reagents = new Map(
    reagentsFile.map(item => [item.id, item])
  );

  const reactions = new Map(
    reagentsFile.map(item => [item.id, item])
  );

  const reaction = reactions.get(id);
  let countIngredients = Object.values(reaction.recipe.reactants).reduce((sum, { amount }) => sum + amount, 0);
  const [number, setNumber] = useState(200 - 200 % countIngredients * 10);


  return (<div style={{ color: 'white' }}>
    <div> 
      <label>
        Enter a number:
        <input type="number" value={number} onChange={handleChange} />
      </label>
    </div>
    <div>{id} {number}u
      {lookup(id, reagents, reactions, number)}
    </div>
  </div >)
}

function lookup(id, reagents, reactions, amount) {
  const reaction = reactions.get(id).recipe;
  console.log(reaction)
  if (!reaction || !reaction.reactants) return null;
  
  let countIngredients = Object.values(reaction.reactants).reduce((sum, { amount }) => sum + amount, 0);
  let targetAmount = amount / reaction.products[id]
  let totalAmountMod = targetAmount
  console.log(id, countIngredients, targetAmount, totalAmountMod)

  return (
    <div style={{ color: 'white', marginBottom: "20px", marginLeft: "40px", borderLeft: "solid 1px white" }}>
      {Object.entries(reaction.reactants).map(([key, value]) => (
        <div>
          <p key={key} style={{ margin: "4px" }}>{key} {getNextHigherAmount(value.amount * totalAmountMod)}u ({Math.ceil(value.amount * totalAmountMod)}u)</p>
          {lookup(key, reagents, reactions, getNextHigherAmount(value.amount * totalAmountMod))}
        </div>
      ))}
    </div>
  )
}

export default Recipe;
