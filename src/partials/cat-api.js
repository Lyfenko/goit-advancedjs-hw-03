import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_dZQ4fg7hH0x4N8MlxEp2Fb1U7ovhdfu63mLSmh1N0MrRRmmHQD8xtgEQFc65CCdI';

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data[0])
        .catch(error => {
            throw error;
        });
}