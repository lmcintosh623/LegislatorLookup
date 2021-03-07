import React from 'react';
import { Dropdown } from '../LegBodyDropdown.js';
import {Table} from './Table'; 


export default function Explore() {
  return(
    <div className="App">
      <div className="explore-left-half">
        <Dropdown></Dropdown>
        <Table/>
      </div>
    </div>
  )
}
