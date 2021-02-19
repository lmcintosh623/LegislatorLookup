const axios = require("axios")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var numRequests

// var jurisdiction = 'Washington'
// const Http = new XMLHttpRequest();
// const baseURL ='https://v3.openstates.org/people';
// const apikey = '7f7afdc0-15e1-461e-9d2c-1dec521187c8'
// const per_page = '20'
// var fullURL = `${baseURL}?jurisdiction=${jurisdiction}&include=other_identifiers&per_page=50&apikey=${apikey}`

// // Make the first request
// Http.open("GET", fullURL);
// Http.send();

// // Now we know how many total requests we need
// Http.onreadystatechange = (e) => {
  // if(Http.readyState == 4){
    // APIresponse = JSON.parse(Http.responseText)
    // numItems = APIresponse['pagination']['total_items']
    // console.log('result has '+numItems+' items')
    // numRequests = Math.ceil(numItems/per_page)
    // console.log('We need '+numRequests+' requests')
  // }
// }


// var list = []

// var pagelessURL = `${baseURL}?jurisdiction=${jurisdiction}&include=other_identifiers&per_page=50&apikey=${apikey}`
// for(var i = 0; i< numRequests; i++){
  // list.push(`${pagelessURL}&page=${i}`)
// }


var jurisdiction = process.argv.slice(2)[0]

const list = [
    // 'https://v3.openstates.org/people?jurisdiction=Washington&include=other_identifiers&per_page=50&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=1',
    // 'https://v3.openstates.org/people?jurisdiction=Washington&include=other_identifiers&per_page=50&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=2',
    `https://v3.openstates.org/people?jurisdiction=${jurisdiction}&include=other_identifiers&per_page=50&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=1`,
    `https://v3.openstates.org/people?jurisdiction=${jurisdiction}&include=other_identifiers&per_page=50&apikey=7f7afdc0-15e1-461e-9d2c-1dec521187c8&page=2`,
].map((url) => axios(url))



let secondArray = []

Promise.all(list)
  .then((res)=> {
    return res.map( returnedPromise => returnedPromise.data );
  }).then((myNewList)=> {
    myNewList.forEach(element => {
      secondArray.push(element.results)
    });
    console.log(secondArray)
  }).catch(e => console.log(new Error(e)))
