import React, { useEffect, useState, useRef } from 'react';
import { Card, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

import './../App.css';
import { getReagentsDTO } from '../utils/reagentsDTO';
import { BsFillQuestionCircleFill, BsArrowUpRightCircle } from "react-icons/bs";
import { test } from '../utils/groups'
import { Link } from 'react-router-dom';

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
  const [hoveredItem, setHoveredItem] = useState(null); // State to track the hovered item
  const [hoveredItemPosition, setHoveredItemPosition] = useState({ top: 0, left: 0 }); // State for hover card position
  const cardRef = useRef(null); // Ref for the card to get its position

  return (
    <Card className='recipeCard' style={{
      width: '150px',
      display: 'block',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.3s ease',
    }} ref={cardRef}>
      <Card.Header className='recipeHeader'>
        <BeakerSVG color={content.color} />
        {content.name.replaceAll('-', ' ').replace('reagent name ', '')}


        <div style={{ float: 'right' }}>
          <Link to={`/${content.id}`}><BsArrowUpRightCircle /></Link>
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
        {content.hasRecipe && (
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
        )}
      </Card.Body>
      {hoveredItem && reagents.find(r => r.name === hoveredItem && r.hasRecipe) && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          marginTop: '5px',
          top: hoveredItemPosition.top,
          left: hoveredItemPosition.left,
          borderRadius: '4px',
          padding: '10px',
        }}>
          <ReagentCard content={reagents.find(r => r.name === hoveredItem)} reagents={reagents} />
        </div>
      )}
    </Card>
  );
};

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
            <ReagentCard key={reagent.id} content={reagent} reagents={reagents} />
          ))}
      </div>
    </div>
  );
}

export default Reagents;
