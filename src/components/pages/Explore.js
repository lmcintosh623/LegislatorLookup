import React from 'react';
import { Dropdown } from '../LegBodyDropdown.js';
import {Table} from './Table'; 


export default function Explore() {
  return(
    <div className="App">
      <Dropdown></Dropdown>
      <Table/>
    </div>
  )
}