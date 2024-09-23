import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';

import './../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Home() {
  // State to hold the parsed YAML data
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    // Fetch the YAML file from the specified path
    fetch('data/Food/meat.yml')
      .then(response => response.text()) // Get the YAML file content as text
      .then(yamlText => {
        // Parse the YAML text to a JavaScript object
        const parsed = yaml.load(yamlText);

        // Convert object values to an array and set it to state
        setParsedData(Object.values(parsed));
        console.log(parsed)
      })
      .catch(e => console.error('Failed to load YAML:', e)); // Handle any errors
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <div className='grid'>
        {/* Map through the parsedData array and render each item as a list element */}
        {parsedData
          .filter(dataElement => dataElement.name) // Filter for elements with components and name
          .map(filteredElement => (
            <Card className='recipeCard' style={{ width: '100px', display: 'block' }}>
              <Card.Header className='recipeHeader'>{filteredElement.name} <Image src={"data\\Food\\meat\\" + (filteredElement.components.find(component => component.type === "Sprite")?.state || 'No spirite components found') + ".png"} /></Card.Header>
              <Card.Body>
                {filteredElement.components.find(component => component.type === "Sprite")?.state || 'No spirite components found'}
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Home;
