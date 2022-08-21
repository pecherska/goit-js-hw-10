const BASE_URL = 'https://restcountries.com/v2';
const PARAM = ['name', 'capital', 'population', 'flags', 'languages'];


export default function fetchCountries(name) {
  
  return fetch(`${BASE_URL}/name/${name}?fields=${PARAM}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}