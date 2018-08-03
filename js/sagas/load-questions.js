import actions from "../actions";
import {delay} from "redux-saga";
import {take, call, put, fork, join, race} from "redux-saga/effects";
import fetchSaga from "./fetch";

const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;

function* loadQuestions(){
  yield take(actions.loadQuestions + ``);
  console.log("lol1");
  const {error, result} = yield call(fetchSaga, {
    url: QUESTIONS_URL,
    method: `GET`
  });
  console.log("lol2");
  if(result){
    yield put(actions.questionsLoaded(result));
  }else{
    yield put(actions.error(error));
  }
}

export default loadQuestions;