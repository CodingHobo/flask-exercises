"use strict";

const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
const $deck = $("#deck");
const $drawCardBtn = $("#draw-card-btn");

let deck_id_html;

/** Draw a single card from a shuffled deck */
async function getSingleCard() {
    const resp = await axios.get(`${BASE_URL}/new/draw/?count=1`);

    const cardDraw = resp.data.cards[0];
    console.log(`getSingleCard(): ${cardDraw.value} of ${cardDraw.suit}`.toLowerCase());
}

/** Draw a single card from shuffled deck,
 *  retrieve deck_id and use it to draw another card.
 * */
async function getTwoCards() {
    const resp1 = await axios.get(`${BASE_URL}/new/draw/?count=1`);
    const resp2 =  await axios.get(`${BASE_URL}/${resp1.data.deck_id}/draw/?count=1`);

    const firstCard = resp1.data.cards[0];
    const secondCard = resp2.data.cards[0];

    console.log(`first card: ${firstCard.value} of ${firstCard.suit}`.toLowerCase());
    console.log(`second card: ${secondCard.value} of ${secondCard.suit}`.toLowerCase());
}

/** upon initialization, create a shuffled deck and store
 *  deck_id_html
 */
async function createDeck() {
    const resp = await axios.get(`${BASE_URL}new/shuffle`);
    deck_id_html = resp.data.deck_id;
}

/** Handle click event to draw card from API and update DOM */
async function drawAndHandleClick() {
    const resp = await axios.get(`${BASE_URL}${deck_id_html}/draw/?count=1`);

    const cardImage = resp.data.cards[0].image;
    $deck.html(`<img src="${cardImage}">`);
}

$drawCardBtn.on("click", drawAndHandleClick);

getSingleCard();
getTwoCards();
createDeck();