const url = 'https://us.api.battle.net/wow/pet/?locale=en_US&apikey=mnrvm7hstejvmxdxyk3efksmdtt2qpky';
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const rangeTerm = document.querySelector('.range'); 

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
    }) 
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
    (y >= json.pets.length) ? nav.style.display = 'none' : nextBtn.style.display = 'inherit';
    
    for (i = x; i < y; i++){
        let card = document.createElement('div')
        let img = document.createElement('img');
        let nameDiv = document.createElement('div');
        let name = document.createElement('span')
        let reframe = document.createElement('div');
        let dropdownContent = document.createElement('div');
        let family = document.createElement('p');
        let health = document.createElement('p');
        let power = document.createElement('p');
        let speed = document.createElement('p');
        let strong = document.createElement('p');
        let weak = document.createElement('p');
        

        current = result[i];
        iconURL = `http://media.blizzard.com/wow/renders/npcs/zoom/creature${current.creatureId}.jpg`;
        img.src=iconURL;
        img.alt='Image';
        name.textContent = current.name;
        family.textContent = `Family: ${current.family}`;
        health.textContent = `Health: ${current.stats.health}hp`;
        power.textContent = `Power: ${current.stats.power}`;
        speed.textContent = `Speed: ${current.stats.speed}`;
        strong.textContent = `Strong against: ${current.strongAgainst[0]}`;
        weak.textContent = `Weak against: ${current.weakAgainst[0]}`;
        
        reframe.setAttribute('class', 'reframe');
        img.setAttribute('class','icon');
        name.setAttribute('class','text');
        card.setAttribute('class','card');
        nameDiv.setAttribute('class','dropdown');
        dropdownContent.setAttribute('class','dropdown-content')
        
        section.appendChild(card);
        card.appendChild(reframe);
        reframe.appendChild(img);
        card.appendChild(nameDiv);
        nameDiv.appendChild(name);
        nameDiv.appendChild(dropdownContent);
        dropdownContent.appendChild(family);
        dropdownContent.appendChild(health);
        dropdownContent.appendChild(power);
        dropdownContent.appendChild(speed);
        dropdownContent.appendChild(strong);
        dropdownContent.appendChild(weak); 

    }

    if (range !== 0) {
        let displayRange = document.createElement('span');
        let spacer = document.createElement('br');
        displayRange.textContent = `Displaying ${x+1}-${y} of ${json.pets.length} results.`
        section.appendChild(spacer);
        section.appendChild(displayRange);
    }
} 


// Navigation
function changeRange(e){
    e.preventDefault();
    range = Number(rangeTerm.value);
    (range == 0) ? nav.style.display = 'none' : nav.style.display = 'inherit';
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


