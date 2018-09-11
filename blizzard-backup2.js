const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const rangeTerm = document.querySelector('.range')

const url = 'https://us.api.battle.net/wow/pet/?locale=en_US&apikey=mnrvm7hstejvmxdxyk3efksmdtt2qpky';

let i;
let x;
let range;
let j;

nextBtn.addEventListener('click', next);
// previousBtn.addEventListener('click', previous);
searchForm.addEventListener('submit', changeRange);
fetchResults();

// Fetch code
function fetchResults(range, x) {
fetch(url)
    .then(response =>{
        return response.json();
    }).then(json =>{
        // console.log(json);
        displayResults(json, range, x); 
    }).catch(err=>{console.log(err)})
}


// Base results display
function displayResults(json,range,x){

    (x == undefined) ? x = 0 : x;

    (range == undefined) ? range = 6 : range;
    console.log(range)

    y = range + x;
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      
    let result = json.pets;   

    // console.log('Results:',result);
    
    for (i = x; i < y; i++){
        let familiar = document.createElement('div')
        let heading = document.createElement('h4');
        let img = document.createElement('img');
        let para = document.createElement('p');
        let clearfix = document.createElement('div')
        let reframe = document.createElement('div')

        current = result[i];
        iconURL = `http://media.blizzard.com/wow/renders/npcs/zoom/creature${current.creatureId}.jpg`;
        heading.textContent = current.name;
        img.src=iconURL;
        img.alt='Image'

        clearfix.setAttribute('class', 'clearfix');
        reframe.setAttribute('class', 'reframe');
        img.setAttribute('class','icon');
        para.setAttribute('class','text');
        familiar.setAttribute('class','card')
        
        section.appendChild(familiar);
        familiar.appendChild(reframe);
        reframe.appendChild(img);
        familiar.appendChild(heading);

    }

} 

// Navigation

function changeRange(e){
    e.preventDefault();
    range = Number(rangeTerm.value);
    // console.log(range);
    fetchResults(range);
    // displayResults(e,range);
}

// function next(e){
//     e.preventDefault();   
//     (i == undefined) ? i = 0 : i;
//     range = Number(rangeTerm.value);
//     i+=range
//     displayResults(json,range,i)
// }


