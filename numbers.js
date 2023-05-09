"use strict";

const BASE_URL = "http://numbersapi.com/";
const FAV_NUM = 3;
const MANY_NUMS = [1, 54, 23, 656];

const $numFacts = $("#num-facts");

// PART 1: Number Facts

//make a request to Numbers API to get fact about fav number
async function getMyFavNum() {
  const resp = await axios.get(`${BASE_URL}${FAV_NUM}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return resp.data;
}

/** Makes batch GET request to numbers API and generates
 *  facts on DOM
 */
async function getAndShowManyNumbers() {
  const resp = await axios.get(`${BASE_URL}${MANY_NUMS}?json`);

  for (let num in resp.data) {
    $numFacts.append(`<p>${resp.data[num]}</p>`);
  }

  return resp.data;
}

async function getFourFactsAboutFavNum() {
  const fact1 = axios.get(`${BASE_URL}${FAV_NUM}`);
  const fact2 = axios.get(`${BASE_URL}${FAV_NUM}`);
  const fact3 = axios.get(`${BASE_URL}${FAV_NUM}`);
  const fact4 = axios.get(`${BASE_URL}${FAV_NUM}`);

  let results = await Promise.allSettled([fact1, fact2, fact3, fact4]);
  console.log(results);

  // look for obj w/ key of 'status' of 'fulfilled'
  let fulfilled = results.filter((key) => key.status === "fulfilled");

  for (let fact of fulfilled) {
    $numFacts.append(`<p>${fact.value.data}</p>`);
  }
}

// getMyFavNum();
getAndShowManyNumbers();
getFourFactsAboutFavNum();
