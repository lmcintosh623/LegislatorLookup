import React from 'react'
import MaterialTable from 'material-table'
import {useState, useEffect} from 'react';

export const Table=()=>{

    return(<div>
        <MaterialTable 
          title ="Explore Legislators"
          columns={[  
            {title:'Image', field: 'image', render: rowData=> (<img style={{ height: 120, borderRadius: '80%' }} src={rowData.image} alt='some text'/>)},
            { title: 'Full Name', field: 'name' },
            { title: 'Party', field: 'party',lookup: { 'Democratic': 'Democratic', 'Republican': 'Republican' } },
            { title: 'Position', field: 'current_role.title' },
            { title: 'Email', field: 'email' },
                    
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `https://v3.openstates.org/people?jurisdiction=Washington&include=sources&include=other_identifiers&per_page=1&org_classification=lower&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=1`

              fetch(url)
                .then(response => response.json())
                .then(result => {
                  console.log(result)
                  resolve({
                    data: result.results,
                  })
                })
            })
          }options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
            headerStyle: {
              fontSize: '20',
              backgroundColor: '#7A56D1',
              color: '#FFFFFF',
              zIndex: 1,
            },
        }}
        />
    </div>)
}

  
