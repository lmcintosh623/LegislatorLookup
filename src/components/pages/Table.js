import React from 'react'
import MaterialTable from 'material-table'
import {useState, useEffect} from 'react';

export const Table=()=>{

    return(<div>
        <MaterialTable 
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

            {
              filtering: false,
              title: 'Website', field: 'openstates_url',
              render: rowData=> (<a href={rowData.openstates_url}>Click Here</a> )
            }
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              // let url = `https://v3.openstates.org/people?jurisdiction=Washington&include=sources&include=other_identifiers&per_page=4&org_classification=lower&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8`
                 let url = `https://v3.openstates.org/people?jurisdiction=Washington&include=sources&include=other_identifiers&per_page=`
              url+= (query.pageSize)
              url+= `&org_classification=lower&apikey=bf41dac1-543d-4b1d-a373-ebf272baa921`        
              url += '&page=' + (query.page + 1)
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



  
