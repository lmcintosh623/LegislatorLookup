import React, { useState } from 'react';
import Select from 'react-select'

const states = [
 { value: 'alabama',label:'Alabama'},
 { value: 'alaska',label:'Alaska'},
 { value: 'arizona',label:'Arizona'},
 { value: 'arkansas',label:'Arkansas'},
 { value: 'california',label:'California'},
 { value: 'colorado',label:'Colorado'},
 { value: 'connecticut',label:'Connecticut'},
 { value: 'delaware',label:'Delaware'},
 { value: 'florida',label:'Florida'},
 { value: 'georgia',label:'Georgia'},
 { value: 'hawaii',label:'Hawaii'},
 { value: 'idaho',label:'Idaho'},
 { value: 'illinois',label:'Illinois'},
 { value: 'indiana',label:'Indiana'},
 { value: 'iowa',label:'Iowa'},
 { value: 'kansas',label:'Kansas'},
 { value: 'kentucky',label:'Kentucky'},
 { value: 'louisiana',label:'Louisiana'},
 { value: 'maine',label:'Maine'},
 { value: 'maryland',label:'Maryland'},
 { value: 'massachusetts',label:'Massachusetts'},
 { value: 'michigan',label:'Michigan'},
 { value: 'minnesota',label:'Minnesota'},
 { value: 'missippi',label:'Mississippi'},
 { value: 'missouri',label:'Missouri'},
 { value: 'montana',label:'Montana'},
 { value: 'nebraska',label:'Nebraska'},
 { value: 'nevada',label:'Nevada'},
 { value: 'new hampshire',label:'New Hampshire'},
 { value: 'new jersey',label:'New Jersey'},
 { value: 'new mexico',label:'New Mexico'},
 { value: 'new york',label:'New York'},
 { value: 'north carolina',label:'North Carolina'},
 { value: 'north dakota',label:'North Dakota'},
 { value: 'ohio',label:'Ohio'},
 { value: 'oklahoma',label:'Oklahoma'},
 { value: 'oregon',label:'Oregon'},
 { value: 'pennsylvania',label:'Pennsylvania'},
 { value: 'rhode island',label:'Rhode Island'},
 { value: 'south carolina',label:'South Carolina'},
 { value: 'south dakota',label:'South Dakota'},
 { value: 'tennessee',label:'Tennessee'},
 { value: 'texas',label:'Texas'},
 { value: 'utah',label:'Utah'},
 { value: 'vermont',label:'Vermont'},
 { value: 'virginia',label:'Virginia'},
 { value: 'washington',label:'Washington'},
 { value: 'west virginia',label:'West Virginia'},
 { value: 'wisconsin',label:'Wisconsin'},
 { value: 'wyoming',label:'Wyoming'} 
];
export default function Landing() {
  const [curState, setState] = useState([]);

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
    <Select
    options={states}
    onChange={setState}
    theme={customTheme}
    placeholder="Select your State ..."
    noOptionsMessage={() => "No State Matches Result"}
    isSearchable
    />
  );
}