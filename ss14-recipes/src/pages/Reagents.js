import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './../App.css';
import { getReagentsDTO } from '../utils/reagentsDTO';
import { BsFillQuestionCircleFill } from "react-icons/bs";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);

const ReagentCard = ({ content }) => (
  <Card className='recipeCard' style={{ width: '150px', display: 'block', margin: '10px' }}>
    <Card.Header className='recipeHeader'>
    <svg id="beaker" viewBox="0 0 100 200">
        <rect id="liquid" x="25" y="60" width="50" height="100" fill="#ff0000"/>
        <rect x="25" y="20" width="50" height="160" fill="none" stroke="black" stroke-width="2"/>
    </svg>
      <span style={{color: content.color}}>{content.name.replaceAll('-', ' ').replace('reagent name ', '')}</span>

      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <div style={{float: 'right'}}>
          <BsFillQuestionCircleFill />
        </div>
      </OverlayTrigger>
    </Card.Header>
    <Card.Body>
      {content.hasRecipe && (
        <div>
          <div>
            {Object.entries(content.recipe.reactants).map(([key, value]) => (
              <div key={key}>{value.amount} <strong>{key}</strong></div>
            ))}
          </div>
          <div><strong>Product Amount:</strong> {content.recipe.products}</div>
        </div>
      )}
    </Card.Body>
  </Card>
);


function Reagents() {
  const [reagents, setReagents] = useState([]);

  useEffect(() => {
    (async () => {
      setReagents(await getReagentsDTO())
    })();
  }, []);

  return (
    <div>
      <h1>Reagents</h1>
      <div className='grid'>
        {reagents
          .sort((a, b) => b.hasRecipe - a.hasRecipe)
          .map(reagent => (
            <ReagentCard key={reagent.id} content={reagent} />
          ))}
      </div>
    </div>
  );
}

export default Reagents;
