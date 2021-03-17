import React, { useState } from 'react';
import Select from 'react-select'
import MaterialTable from 'material-table'
import img_not_found from '../../assets/IMG_NOT_FOUND.png';
import './table.css'

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

export default function LandingPage() {

  const billsTableRef = React.createRef();
  const legTableRef = React.createRef();
  const[userState, setUserState] = useState('District of Columbia');

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

  function handleUserStateChange(e){
    setUserState(e.label) // set state value to selection contents
    try {
      billsTableRef.current.onQueryChange()
      legTableRef.current.onQueryChange()
    }
    catch(e){
      console.log(e)
    }
  }

  function handleImageError(e){
    e.target.src = img_not_found
    e.target.alt = 'Image not found'
  }

  function urlCleaner(url){
    if(url === ""){
      return img_not_found
    }
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
    console.log(url)
    return url
  }

  return(
    <div>

      <Select
        className="stateDropdown"
        options={states}
        onChange={handleUserStateChange}
        theme={customTheme}
        placeholder="Select your State ..."
        noOptionsMessage={() => "No State Matches Result"}
        isSearchable
      />



      <div className="main-both-halves">
        <div className="main-left-half">
          <MaterialTable 
            tableRef={legTableRef}
            title ="Legislators"
            
            columns={[  
              {
                filtering: false, 
                title:'Image', field: 'image', 
                render: rowData=> (<img onError={handleImageError} style={{ height: 120, borderRadius: '80%' }} src={urlCleaner(rowData.image)} alt='some text'/>)
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
              search: false,
              paging: true,
              filtering: false,
              exportButton: false,
              headerStyle: {
                fontSize: '20',
                backgroundColor: '#7A56D1',
                color: '#FFFFFF',
              },
          }}
          />
        </div>



        <div className="main-right-half">
          
          <MaterialTable 
            tableRef={billsTableRef}
            title ="Bills"
            
            columns={[  
              {
                  title: 'Title', field: 'title', type: 'string'
              },
              { 
                  title: 'ID', field: 'identifier', type: 'string'
              },
              { 
                  title: 'State', field: 'jurisdiction.name', type: 'string' 
              },
              {
                  title: 'Latest Action Date', field: 'latest_action_date', type: 'string' 
              },
              {
                  title: 'Latest Action Description', field: 'latest_action_description', type: 'string'            },
              {
                  filtering: false,
                  title: 'More info', field: 'openstates_url',
                  render: rowData=> (<a href={rowData.openstates_url}>Click Here</a> )
              }
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = `https://v3.openstates.org/bills?jurisdiction=${userState}&sort=updated_desc`
                url+= `&per_page=${(query.pageSize)}`
                url+= `&apikey=bf41dac1-543d-4b1d-a373-ebf272baa921&page=${(query.page + 1)}`

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
              search: false,
              paging: true,
              filtering: false,
              exportButton: false,
              headerStyle: {
                fontSize: '20',
                backgroundColor: '#7A56D1',
                color: '#FFFFFF',
              },
          }}
          />


        </div>
      </div>
    </div>
  )
}
