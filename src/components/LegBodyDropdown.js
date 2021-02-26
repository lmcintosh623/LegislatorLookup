import React , { useState } from 'react';
import './LegBodyDropdown.css';
import Select from 'react-select';

export function Dropdown() {
  const [curState, setState] = useState([]);

  const filters = [
    { value: 'leg', label: 'Legislative' },
    { value: 'upp', label: 'Upper' },
    { value: 'low', label: 'Lower' },
    { value: 'exe', label: 'Executive' },
    { value: 'gov', label: 'Government' }
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

  return (
   <>
      <Select
      options={filters}
      onChange={setState}
      theme={customTheme}
      placeholder="Select a filter ..."
      />
      
      <button
      as={"input"} 
      type={"submit"} 
      onClick={console.log(curState)}
      >Submit</button>
   </>
  );
    
}