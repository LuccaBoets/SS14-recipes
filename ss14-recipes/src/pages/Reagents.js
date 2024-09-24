import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './../App.css';
import { getReagentsDTO } from '../utils/reagentsDTO';
import { BsFillQuestionCircleFill } from "react-icons/bs";

const renderTooltip = (props, content) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);

const BeakerSVG = ({ color }) => (
  <svg id="beaker" viewBox="9 11 14 13" style={{ width: "20px", height: "20px", marginRight: "6px" }}>
    <image href="data/Reagents/beakerlarge.png" width="32" height="32" />
    <rect id="liquid" x="10.5" y="18" width="11" height="5" fill={color} />
    <rect id="liquid" x="12.5" y="23" width="7" height="1" fill={color} />
  </svg>
);

const ReagentCard = ({ content }) => (
  <Card className='recipeCard' style={{ width: '150px', display: 'block', margin: '10px' }}>
    <Card.Header className='recipeHeader'>
      <BeakerSVG color={content.color} />
      {content.name.replaceAll('-', ' ').replace('reagent name ', '')}

      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <div style={{ float: 'right' }}>
          <BsFillQuestionCircleFill />
        </div>
      </OverlayTrigger>
    </Card.Header>
    <Card.Body>
      {content.hasRecipe && (
        <div>
          <div>
            {content.recipe.map((value) => (
              <div key={value}>
                <BeakerSVG color={value.color} />
                {value.amount} <strong>{value.name}</strong> 
              </div>
            ))}
          </div>
          <div>
            <strong>Products:</strong>
            <div key={content.id}>
              <BeakerSVG color={content.color} />
              {content.amount} <strong>{content.name}</strong>
            </div>
          </div>
        </div>
      )}
    </Card.Body>
  </Card>
);

// const ReagentCard = ({ content }) => (<div><p>{JSON.stringify(content)}</p></div>);

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
