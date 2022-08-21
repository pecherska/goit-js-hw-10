import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;
const inputData = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputData.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const onSearchInput = e.target.value.trim();
    if (onSearchInput === '') {
        return;
    } else {
        fetchCountries(onSearchInput).then(countries => addCountries(countries)).catch(error => notFoundError(error));  
    }
}

function addCountries(countries) {
    clearMarkup();
    if (countries.length === 1) {
        countryInfoMarkUp(countries);
    }
    else if (countries.length > 1 && countries.length <= 10) {
        
        countryListMarkUp(countries);
    }
    else {
       return Notify.info('Too many matches found. Please enter a more specific name.');
           
    }

}


function notFoundError(error) {

    if (error.code === 404) {
       return Notify.failure('Oops, there is no country with that name');
    }
}

function clearMarkup() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function countryListMarkUp(countries) {
    const makrupList = countries.map(({ name, flags }) => {
            return `<li><img src="${flags.svg}" width="40"/> ${name} </li> `;
        }).join('');
        countryList.insertAdjacentHTML('beforeend', makrupList);
}

function countryInfoMarkUp (countries) {
const makrupInfo = countries.map(({ name, flags, capital, population, languages }) => {
            return `<ul class="country">
        <li><img src="${flags.svg}" width="60" /> ${name}</li>
        <p> Capital: <span>${capital}</span></p>
        <p> Population: <span>${population}</span></p>
        <p> Languages: <span>${languages[0].name}</span></p>
            </ul>`;
      })
    .join('');
     countryInfo.insertAdjacentHTML ('beforeend', makrupInfo); 
}