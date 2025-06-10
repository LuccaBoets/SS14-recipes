import React, { useEffect, useState, useRef } from 'react';
import { Card, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

import './../App.css';
import { BsFillQuestionCircleFill, BsArrowUpRightCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import reagentsFile from './../data.json';

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

const ReagentCard = ({ content, reagents }) => {

  return (
    <Card className='recipeCard' style={{
      width: '150px',
      display: 'block',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.3s ease',
    }}>
      <Card.Header className='recipeHeader'>
        <BeakerSVG color={content.color} />
        {content.id.replaceAll('-', ' ').replace('reagent name ', '')}

        <div style={{ float: 'right' }}>
          <Link to={`/SS14-recipes/recipe/${content.id}`}>
            <BsArrowUpRightCircle />
          </Link>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(null, content)}
          >
            <BsFillQuestionCircleFill />
          </OverlayTrigger>
        </div>
      </Card.Header>
      <Card.Body>
        {/* {content.hasRecipe && (
          <div>
            <div>
              {content.recipe.map((value) => {
                // Check if the recipe item exists in the reagents array and can be crafted
                const reagent = reagents.find(r => r.name === value.name);
                const canCraft = reagent && reagent.hasRecipe;

                return (
                  <div
                    key={value.name}
                    onMouseEnter={(e) => {
                      // Only set hovered item if it can be crafted
                      if (canCraft) {
                        setHoveredItem(value.name);
                        // Get bounding rect to position the hover card
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredItemPosition({
                          top: 170,
                          left: -20
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredItem(null)} // Reset on mouse leave
                    style={{
                      textDecoration: canCraft ? 'underline' : 'none',
                      cursor: canCraft ? 'pointer' : 'default'
                    }}
                  >
                    <BeakerSVG color={value.color} />
                    {value.amount} <strong>{value.name}</strong>
                  </div>
                );
              })}
            </div>
            <div>
              <strong>Products:</strong>
              <div key={content.id}>
                <BeakerSVG color={content.color} />
                {content.amount} <strong>{content.name}</strong>
              </div>
            </div>
          </div>
        )} */}
      </Card.Body>
    </Card>
  );
};

// const ReagentCard = ({ content }) => (<div><p>{JSON.stringify(content)}</p></div>);

function Reagents() {
  const [selectedGroup, setSelectedGroup] = useState('');
  let uniqueGroups = ["Biological", "Toxins", "Medicine", "Elements"]
  let reagents = reagentsFile;
  const reactions = new Map(
    reagentsFile.map(item => [item.id, item]) // Format: [key, value]
  );
  
  console.log(reagents)
  // const filteredReagents = reagents.filter((reagent) =>
  //   reagent.hasRecipe && (selectedGroup === '' || reagent.group === selectedGroup)
  // );

  return (
    <div>
      <h1>Reagents</h1>

      {/* <Dropdown>
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
      </Dropdown> */}

      <div className='grid'>
        {reagents
          .map(reagent => (
            <ReagentCard key={reagent.id} content={reagent} reagents={reagents} />
          ))}
      </div>
    </div>
  );
}

export default Reagents;
