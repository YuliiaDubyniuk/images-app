import axios from 'axios';

const API_KEY = '38922427-a1320c38255791562f8d90b5f';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchPictures(searchWord, page) {
  axios.defaults.params = {
    key: API_KEY,
    q: searchWord,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  };
       
  return await axios.get(BASE_URL);
} 

export { fetchPictures };