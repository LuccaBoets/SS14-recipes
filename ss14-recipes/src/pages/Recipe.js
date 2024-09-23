import React, { useEffect, useState } from 'react';

import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import yaml from 'js-yaml';

const CustomNode = (props) => {
  const { inputs } = props;
//   const { content } = props;

  return (
    <div style={{ background: '#717EC3', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>
        Custom 
        {/* {content} */}
      </div>
      <div style={{ marginTop: '20px' }}>
        {inputs.map((port) => React.cloneElement(port, {
          style: { width: '50px', height: '25px', background: '#1B263B' }
        }))}
      </div>
    </div>
  );
};

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [100, 100],
      outputs: [{ id: 'port-1', alignment: 'right' }],
    },
    {
      id: 'node-custom',
      content: "jaja",
      coordinates: [100, 100],
      render: CustomNode,
      inputs: [{ id: 'custom-port-1', alignment: 'left' }],
    },
  ],
  links: [
    { input: 'port-1',  output: 'custom-port-1' },
  ]
});

const UncontrolledDiagram = () => {
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div>
      <Diagram schema={schema} onChange={onChange} style={{backgroundColor: '#282c34', border: 'none', height: '500px'}}/>
    </div>
  );
};

var test = {}

function Recipe() {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    fetch('data/Food/meat.yml') // Adjust the path according to where you place the file
      .then(response => response.text())
      .then(yamlText => {
        const parsed = yaml.load(yamlText);
        setParsedData(parsed);
        console.log(parsed)        
      })
      .catch(e => console.error('Failed to load YAML:', e));
  }, []);

  return (
    <div>
        <h1>Home</h1>
        <UncontrolledDiagram />
    </div>
  );
}

export default Recipe;
