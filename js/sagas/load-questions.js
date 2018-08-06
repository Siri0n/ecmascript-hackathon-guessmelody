import actions from "../actions";
import {take, call, put} from "redux-saga/effects";
import fetchSaga from "./fetch";

const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;

function* loadQuestions() {
  yield take(actions.loadQuestions + ``);
  const {error, result} = yield call(fetchSaga, {
    url: QUESTIONS_URL,
    method: `GET`
  });
  if (result) {
    yield put(actions.questionsLoaded(result));
  } else {
    yield put(actions.error(error));
  }
}

export default loadQuestions;
