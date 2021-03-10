import React from 'react'
import MaterialTable from 'material-table'
import { useState } from 'react';
import Select from 'react-select'
import img_not_found from '../../assets/IMG_NOT_FOUND.png';
import './table.css';

const states = [
  { value: 'Alabama',label:'Alabama'},
  { value: 'Alaska',label:'Alaska'},
  { value: 'Arizona',label:'Arizona'},
  { value: 'Arkansas',label:'Arkansas'},
  { value: 'California',label:'California'},
  { value: 'Colorado',label:'Colorado'},
  { value: 'Connecticut',label:'Connecticut'},
  { value: 'Delaware',label:'Delaware'},
  { value: 'District%20of%20Columbia',label:'District of Columbia'},
  { value: 'Florida',label:'Florida'},
  { value: 'Georgia',label:'Georgia'},
  { value: 'Hawaii',label:'Hawaii'},
  { value: 'Idaho',label:'Idaho'},
  { value: 'Illinois',label:'Illinois'},
  { value: 'Indiana',label:'Indiana'},
  { value: 'Iowa',label:'Iowa'},
  { value: 'Kansas',label:'Kansas'},
  { value: 'Kentucky',label:'Kentucky'},
  { value: 'Louisiana',label:'Louisiana'},
  { value: 'Maine',label:'Maine'},
  { value: 'Maryland',label:'Maryland'},
  { value: 'Massachusetts',label:'Massachusetts'},
  { value: 'Michigan',label:'Michigan'},
  { value: 'Minnesota',label:'Minnesota'},
  { value: 'Missippi',label:'Mississippi'},
  { value: 'Missouri',label:'Missouri'},
  { value: 'Montana',label:'Montana'},
  { value: 'Nebraska',label:'Nebraska'},
  { value: 'Nevada',label:'Nevada'},
  { value: 'New%20Hampshire',label:'New Hampshire'},
  { value: 'New%20Jersey',label:'New Jersey'},
  { value: 'New%20Mexico',label:'New Mexico'},
  { value: 'New%20York',label:'New York'},
  { value: 'North%20Carolina',label:'North Carolina'},
  { value: 'North%20Dakota',label:'North Dakota'},
  { value: 'Ohio',label:'Ohio'},
  { value: 'Oklahoma',label:'Oklahoma'},
  { value: 'Oregon',label:'Oregon'},
  { value: 'Pennsylvania',label:'Pennsylvania'},
  { value: 'Rhode%20Island',label:'Rhode Island'},
  { value: 'South%20Carolina',label:'South Carolina'},
  { value: 'South%20Dakota',label:'South Dakota'},
  { value: 'Tennessee',label:'Tennessee'},
  { value: 'Texas',label:'Texas'},
  { value: 'Utah',label:'Utah'},
  { value: 'Vermont',label:'Vermont'},
  { value: 'Virginia',label:'Virginia'},
  { value: 'Washington',label:'Washington'},
  { value: 'West%20Virginia',label:'West Virginia'},
  { value: 'Wisconsin',label:'Wisconsin'},
  { value: 'Wyoming',label:'Wyoming'} 
 ];

export const LegTable=()=>{
  const[userState, setUserState] = useState('District%20of%20Columbia');
  const[userLeg, setUserLeg] = useState('');
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

  function handleUserStateChange(e){
    change1() // mark this selection as active
    setUserState(e.value) // set state value to selection contents
  }

  function handleUserLegChange(e){
    change2()
    setUserLeg(e.value)
  }

  function urlCleaner(url){
    if(url === ""){
      return img_not_found
    }
    console.log(url)
    let re1  = new RegExp('^.*(www.)')
    if(re1.test(url)){
      url.replace(re1, 'https://')
    }
    else{
      re1 = new RegExp('(http://)') 
      if(re1.test(url)){
        url.replace(re1, 'https://')
      }
    }
    return url
  }

    return(<div>


<>
          <Select className='tablep2'
            options={states}
            onChange={handleUserStateChange}
            theme={customTheme}
            noOptionsMessage={() => "No State Matches Result"}
            isSearchable
            />

      <Select className='tablep'
        required
        options={filters}
        theme={customTheme}
        placeholder="Select a filter ..."
        onChange={handleUserLegChange}
      />
      <button
        as={"input"} 
        type={"submit"} 
        onClick={()=> 
          (userStateTOF === true || userLegTOF === true) ?
            tableRef.current.onQueryChange()
          :
            alert("Select a U.S state and/or a legislative body.")
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
              render: rowData=> (<img style={{ height: 120, borderRadius: '80%' }} src={urlCleaner(rowData.image)} alt='some text'/>)
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
            {
              filtering: false,
              title: 'Website', field: 'openstates_url',
              render: rowData=> (<a href={rowData.openstates_url}>Click Here</a> )
            }
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `https://v3.openstates.org/people?jurisdiction=${userState}&include=sources&include=other_identifiers`
              url+= `&per_page=${(query.pageSize)}`
              if (userLegTOF) url+= `&org_classification=${userLeg}`
              url += `&apikey=bf41dac1-543d-4b1d-a373-ebf272baa921&page=${(query.page + 1)}`
              console.log('url: ' + url)

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
