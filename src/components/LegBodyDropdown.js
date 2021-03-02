import React , { useState } from 'react';
import './LegBodyDropdown.css';
import Select from 'react-select';

export function Dropdown() {
  const [curBody, setBody] = useState([]);
  const [curJurisdiction, setJurisdiction] = useState('');

  const filters = [
    { value: 'legislative', label: 'Legislative' },
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
    { value: 'executive', label: 'Executive' },
    { value: 'government', label: 'Government' }
  ]

  function customTheme(theme) {
    return{
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#87ceeb',
        primary: '#7A56D1'
      }
    }
  }
  
  // This gets called when the button is pressed
  function getPeople(org_classification, jurisdiction) {


    console.log("jurisdiction is " + jurisdiction.value)
    console.log("org class is "+org_classification.value)

    // Here's the headers
    const myHeaders = new Headers({
      'X-API-KEY': '7f7afdc0-15e1-461e-9d2c-1dec521187c8'
    });


    // Here's the request
    const myRequest = new Request(`https://v3.openstates.org/people?jurisdiction=${jurisdiction}&include=other_identifiers&per_page=50&org_classification=${org_classification.value}`, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    // Fetch and process
    fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        // Eventually do stuff with this data
        console.log(data)
      });
  }

  return (
   <>
      <Select
        options={filters}
        theme={customTheme}
        placeholder="Select a filter ..."
        onChange={setBody}
      />
      
      <button
        as={"input"} 
        type={"submit"} 
        onClick={()=> getPeople(curBody, curJurisdiction)}
      >Submit</button>

      <input
        type="text"
        onChange={e => setJurisdiction(e.target.value)}
      />

   </>
  );
}
