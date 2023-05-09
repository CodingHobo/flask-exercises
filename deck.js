"use strict";

BASE_URL = 'https://deckofcardsapi.com/api/deck/'

async function getSinlgeCard() {
    const resp = await axios.get(`${BASE_URL}`)
}