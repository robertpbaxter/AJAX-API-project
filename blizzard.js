const url = 'https://us.api.battle.net/wow/pet/?locale=en_US&apikey=mnrvm7hstejvmxdxyk3efksmdtt2qpky';
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const rangeTerm = document.querySelector('.range')

let x;
let y;
let range;

nav.style.display = 'none';
previousBtn.style.display = 'none';

nextBtn.addEventListener('click', next);
previousBtn.addEventListener('click', previous);
searchForm.addEventListener('submit', changeRange);
fetchResults(); 


// Callable Fetch Function
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
    (range == undefined) ? range = 0 : range;
    y = range + x;
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);
      }

    let result = json.pets;
    (y >= json.pets.length) ? nextBtn.style.display = 'none' : nextBtn.style.display = 'inherit';
    
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
    nav.style.display = 'inherit';
    fetchResults(range);
}

function next(e){
    e.preventDefault();
    (x == undefined) ? x = 0 : x;   
    x += range;
    previousBtn.style.display = 'inherit';
    fetchResults(range,x);
}

function previous(e){
    e.preventDefault();
    (x <= 0) ? x = 0 : x;
    x -= range;
    (x === 0) ?  previousBtn.style.display = 'none' : previousBtn.style.display = 'inherit';
    fetchResults(range,x);
}


