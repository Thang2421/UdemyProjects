import { TIMEOUT_SEC } from '../config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // 1. Fetch the data using URL

    // If the data takes a lot of time (after 10s _ timeout) then cancel the fetch
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // 2. Check if the response if ok?
    // 2.ok!_ If the response is not ok
    if (res.ok != true) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    console.error(`${err} from helpers.js`);
    throw err;
  }
};
