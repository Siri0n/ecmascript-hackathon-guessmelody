import {delay} from "redux-saga";
import {call, race} from "redux-saga/effects";

const TIMEOUT_MS = 10000;

function* fetchSaga({url, method, body}) {
  try {
    const {response, timeout} = yield race({
      response: call(
          fetch,
          url,
          {
            method,
            body,
            headers: {
              "Content-Type": `application/json; charset=utf-8`
            }
          }),
      timeout: call(delay, TIMEOUT_MS)
    });
    if (!response && timeout) {
      throw new Error(`Request timeout`);
    }
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    let result;
    try {
      result = yield call(() => response.json());
    } catch (e) {
      result = null;
    }
    return {result};
  } catch (error) {
    return {error};
  }
}

export default fetchSaga;
