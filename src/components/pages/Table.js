import React from 'react'
import MaterialTable from 'material-table'
import {useState, useEffect} from 'react';


export const Table=()=>{


    return(<div>
        <MaterialTable title ="Material Table"
        columns={[
                    {
                      render: rowData => (
                        <img
                          style={{ height: 36, borderRadius: '50%' }}
                        />
                      ),
                    },
                    { title: 'First Name', field: 'first_name' },
                    { title: 'Last Name', field: 'last_name' },
        ]}
        data={query =>
            new Promise((resolve, reject) => {
              let url = `https://v3.openstates.org/people?jurisdiction=upper&include=other_identifiers&per_page=50&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=1`

              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    totalCount: result.total,
                  })
                })
            })
          }        options={{
            search: true,
            paging: true,
            filtering: true,
        }}
        />
    </div>)
}

  