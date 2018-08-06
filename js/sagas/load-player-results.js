import Actions from "../actions";
import {take, call, put} from "redux-saga/effects";
import fetchSaga from "./fetch";

const RESULTS_URL = `https://es.dump.academy/guess-melody/stats`;
const APP_ID = `83356811`;

function* loadQuestions() {
  while (true) {
    const {payload: score} = yield take(Actions.loadPlayerScores + ``);
    let {error, result} = yield call(fetchSaga, {
      url: `${RESULTS_URL}/${APP_ID}`,
      method: `POST`,
      body: JSON.stringify({score})
    });
    if (error) {
      yield put(Actions.error(error));
      continue;
    }
    ({error, result} = yield call(fetchSaga, {
      url: `${RESULTS_URL}/${APP_ID}`,
      method: `GET`
    }));
    if (error) {
      yield put(Actions.error(error));
      continue;
    }
    yield put(Actions.resultsLoaded({
      playerResult: score,
      results: result
    }));

  }
}

export default loadQuestions;
