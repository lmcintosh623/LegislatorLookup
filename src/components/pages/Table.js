import React from 'react'
import MaterialTable from 'material-table'
import {useState, useEffect} from 'react';
import Select from 'react-select'
import './table.css';

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

export const Table=()=>{
  const [curState, setState] = useState([]);
  const [curBody, setBody] = useState([]);
  const [curJurisdiction, setJurisdiction] = useState('');
  const[userState, setUserState] = useState('Washington');
  const[userLeg, setUserLeg] = useState('lower');
  const[userStateTOF, setUserStateTOF] = useState(false);
  const[userLegTOF, setUserLegTOF] = useState(false);

  const doChange1 = () => setUserStateTOF(true);
  const doChange2 = () => setUserLegTOF(true);

  const tableRef = React.createRef();

  function change1(){
    doChange1()
  }

  function change2(){
    doChange2()
  }

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


  const filters = [
    { value: 'legislative', label: 'Legislative' },
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
    { value: 'executive', label: 'Executive' },
    { value: 'government', label: 'Government' }
  ]
  
  // This gets called when the button is pressed
  function getPeople(org_classification, jurisdiction) {

    let failedString = "/* Form data missing: \n"
    let failed = false;

    if(!jurisdiction){
      failedString += " * Juridiction is needed to apply a filter"
      failed = true
    } 
    if(!org_classification.value){
      failedString += " * Classification is required to apply a filter\n"
      failed = true
    }

    if(failed){
      failedString += " */\n"
      alert(failedString)
      return
    }
    // console.log("jurisdiction is " + jurisdiction)
    // console.log("org class is "+org_classification.value)

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
      .then((response) => {
        if(!response.ok) throw new Error(response.statusText);
        else return response.json(); 
      })
      .then(data => {
        // Eventually do stuff with this data
        if(data.results.length === 0){
          alert("ERROR: Empty list returned; bad input argument for state: \"" + org_classification.value + "\"");
          return;
        }
       console.log(data)
      }).catch((error) => {
        console.log(error);
      });
  }


    return(<div>


<>
          <Select className='tablep2'
            options={states}
            onChange={setState, setUserState, change1}
            theme={customTheme}
            placeholder="Select your State ..."
            noOptionsMessage={() => "No State Matches Result"}
            isSearchable
            />

      <Select className='tablep'
        required
        options={filters}
        theme={customTheme}
        placeholder="Select a filter ..."
        onChange={setBody, setUserLeg, change2}
      />
      <button
        as={"input"} 
        type={"submit"} 
        onClick={()=> 
          (userStateTOF == true && userLegTOF == true) ?
            // getPeople(userLeg, userState)
            tableRef.current.onQueryChange()
          :
          alert("make a selection")
        }

      >Submit</button>

   </>

        <MaterialTable 
          tableRef={tableRef}
          title ="Explore Legislators"
          
          columns={[  
            {
              filtering: false, 
              title:'Image', field: 'image', 
              render: rowData=> (<img style={{ height: 120, borderRadius: '80%' }} src={rowData.image} alt='some text'/>)
            },
            { 
              title: 'Full Name', 
              field: 'name',
              type: 'string'
            },
            { 
              title: 'Party', field: 'party',lookup: { 'Democratic': 'Democratic', 'Republican': 'Republican' } 
            },
            {
              title: 'Position', field: 'current_role.title' 
            },
            {
              title: 'Email', field: 'email' 
            },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              //let url = `https://v3.openstates.org/people?jurisdiction=${userState}&include=sources&include=other_identifiers&per_page=4&org_classification=${userLeg}&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8`
                 let url = `https://v3.openstates.org/people?jurisdiction=${userState}&include=sources&include=other_identifiers&per_page=`
              url+= (query.pageSize)
              url+= `&org_classification=${userLeg}&apikey=bf41dac1-543d-4b1d-a373-ebf272baa921`        
              url += '&page=' + (query.page + 1)
              console.log(userState)
              console.log(userLeg)
              // TODO add variables
              // url += `&org_classification=${org_classification}`
              // url += `&jurisdiction=${jurisdiction}`

              fetch(url)
                .then(response => response.json())
                .then(result => {
                  console.log(result)
                  resolve({
                    data: result.results,
                    page: result.pagination.page - 1,
                    totalPages: result.pagination.max_page,
                    totalCount: result.pagination.total_items,
                  })
                })
            })
          }options={{
            search: true,
            paging: true,
            filtering: false,
            exportButton: true,
            headerStyle: {
              fontSize: '20',
              backgroundColor: '#7A56D1',
              color: '#FFFFFF',
            },
        }}
        />
    </div>)
}

  
