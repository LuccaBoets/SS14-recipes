import React, { useEffect, useState, useCallback } from 'react';
import './../App.css';
import 'beautiful-react-diagrams/styles.css';
import { useParams } from 'react-router-dom';
import reagentsFile from './../data.json';

function Recipe() {
  const reagents = new Map(
    reagentsFile.reagents.map(item => [item.id, item])
  );

  const reactions = new Map(
    reagentsFile.reactions.map(item => [item.id, item])
  );
  const { id } = useParams();



  return (<div> {id}
    {lookup(id, reagents, reactions, 100)}</div>)
}

function lookup(id, reagents, reactions, amount) {
  const reaction = reactions.get(id);
  if (!reaction || !reaction.reactants) return null;

  console.log(reaction.reactants)

  return (
    <div style={{ color: 'white', marginLeft: "20px", borderLeft: "solid 1px white"  }}>
      {Object.entries(reaction.reactants).map(([key, value]) => (
        <div>
          <p key={key}>{key} {value.amount}u</p>
          {lookup(key, reagents, reactions, amount)}
        </div>
      ))}
    </div>
  )
}

export default Recipe;
