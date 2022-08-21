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
        clearMarkup();
        return;
    } else {
         fetchCountries(onSearchInput).then(addCountries).catch(error);
    }
}

function addCountries(countries) {
    if (countries.length > 10) {
        clearMarkup();
        return Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (countries.length > 1) {
        const makrupList = countries.map(({ name, flags }) => {
            return `<li><img src="${flags.svg}" width="40"/> ${name} </li> `;
        }).join('');
        countryList.insertAdjacentHTML('beforeend', makrupList);
        countryInfo.innerHTML = '';
        
    }
    if (countries.length === 1) {
        const makrupInfo = countries.map(({ name, flags, capital, population, languages }) => {
            return `<ul class="country">
        <li><img src="${flags.svg}" width="60" /> ${name}</li>
        <p> Capital: <span>${capital}</span></p>
        <p> Population: <span>${population}</span></p>
        <p> Languages: <span>${languages[0].name}</span></p>
            </ul>`;
      })
            .join('');
        countryList.innerHTML = '';
        countryInfo.insertAdjacentHTML ('beforeend', makrupInfo);     
    }

}

function error() {
    
    Notify.failure('Oops, there is no country with that name');
}

function clearMarkup() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}