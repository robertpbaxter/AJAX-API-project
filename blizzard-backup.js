const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const rangeTerm = document.querySelector('.range')

let i;
let range;
let j;

// nextBtn.addEventListener('click', next);
// previousBtn.addEventListener('click', previous);
searchForm.addEventListener('submit', fetchResults);

// Fetch code

function fetchResults(e){
    e.preventDefault();
    range = Number(rangeTerm.value);
    console.log(range)

    fetch('https://us.api.battle.net/wow/pet/?locale=en_US&apikey=mnrvm7hstejvmxdxyk3efksmdtt2qpky')
        .then(response =>{
            return response.json();
        }).then(json =>{
            // console.log(json);
            displayResults(json, range, i); 
        }).catch(err=>{console.log('Error')})  
}

// Base results display
function displayResults(json,range,i){

    i = 0;
    j = range + i;
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);
      }

    let result = json.pets;
    // console.log('Results:',result);
    
    for (i; i < j; i++){
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

// function next(e){
//     e.preventDefault();
//     i+=Number(rangeTerm.value);
//     console.log('Bottom:', i);
// }


