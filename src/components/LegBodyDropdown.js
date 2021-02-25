import React /* , { useState } */ from 'react';
import './LegBodyDropdown.css';
//import { Link } from 'react-router-dom';
import Select from 'react-select';

export function Dropdown() {
    // const [body] = useState(false);
    const filters = [
        { value: 'leg', label: 'Legislative' },
        { value: 'upp', label: 'Upper' },
        { value: 'low', label: 'Lower' },
        { value: 'exe', label: 'Executive' },
        { value: 'gov', label: 'Government' }
      ]
  return (
    <Select options={filters}/>  // onChange={() => {body(this.inputValue); console.log(this.inputValue)}, 'pop-value'}
  );
}