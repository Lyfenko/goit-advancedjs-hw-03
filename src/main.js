import { fetchBreeds, fetchCatByBreed } from './partials/cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function populateBreeds() {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    errorText.style.display = 'none';

    fetchBreeds()
        .then(breeds => {
            breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
            new SlimSelect({ select: '.breed-select' });
            breedSelect.style.display = 'block';
        })
        .catch(() => {
            errorText.style.display = 'block';
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

function showCatInfo(breedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    errorText.style.display = 'none';

    fetchCatByBreed(breedId)
        .then(catData => {
            const { url, breeds } = catData;
            const { name, description, temperament } = breeds[0];
            catInfo.innerHTML = `
                <img src="${url}" alt="${name}">
                <h2>${name}</h2>
                <p>${description}</p>
                <p><strong>Temperament:</strong> ${temperament}</p>
            `;
            catInfo.style.display = 'block';
        })
        .catch(() => {
            errorText.style.display = 'block';
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

breedSelect.addEventListener('change', event => {
    const breedId = event.target.value;
    if (breedId) {
        showCatInfo(breedId);
    }
});

document.addEventListener('DOMContentLoaded', populateBreeds);
