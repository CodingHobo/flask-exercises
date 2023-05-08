"use strict"

const BASE_URL = "http://numbersapi.com/";
const FAV_NUM = 3;
const MANY_NUMS = [1,54,23,656]

const numFacts = document.getElementById("num-facts");

// PART 1: Number Facts

//make a request to Numbers API to get fact about fav number
async function getMyFavNum() {
  const resp = await axios.get(`${BASE_URL}${FAV_NUM}`,
                               {headers: {
                                'Content-Type': 'application/json'
                               }
                            });

  return resp.data;
}

/** Makes batch GET request to numbers API and generates
 *  facts on DOM
 */
async function getAndShowManyNumbers() {
  const resp = await axios.get(`${BASE_URL}${MANY_NUMS}?json`);

  for (let num in resp.data) {
    numFacts.append(`${resp.data[num]}`);
  }

  return resp.data;
}



