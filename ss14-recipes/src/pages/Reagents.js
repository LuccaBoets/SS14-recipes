import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';

import './../App.css';
import { getReagentsDTO } from '../utils/reagentsDTO';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { test } from '../utils/groups'

const renderTooltip = (props, content) => (
  <Tooltip id="button-tooltip" {...props}>
    <span>Group: {content.group}</span>
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
        overlay={renderTooltip(null, content)}
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
  const [selectedGroup, setSelectedGroup] = useState(''); // State for selected group
  const uniqueGroups = [...new Set(reagents.filter((a) => a.hasRecipe).map(r => r.group))]; // Get unique groups

  useEffect(() => {
    (async () => {
      setReagents(await getReagentsDTO())

      // test().then((value) => {
      //   console.log(value)
      // });

    })();
  }, []);

  const filteredReagents = reagents.filter((reagent) =>
    reagent.hasRecipe && (selectedGroup === '' || reagent.group === selectedGroup)
  );

  return (
    <div>
      <h1>Reagents</h1>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedGroup || 'Select Group'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedGroup('')}>All</Dropdown.Item>
          {uniqueGroups.map((group) => (
            <Dropdown.Item key={group} onClick={() => setSelectedGroup(group)}>
              {group}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className='grid'>
        {filteredReagents
          .filter((a) => a.hasRecipe)
          .map(reagent => (
            <ReagentCard key={reagent.id} content={reagent} />
          ))}
      </div>
    </div>
  );
}

export default Reagents;
