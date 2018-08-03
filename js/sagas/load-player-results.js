import Actions from "../actions";
import {delay} from "redux-saga";
import {take, call, put, fork, join, race} from "redux-saga/effects";
import fetchSaga from "./fetch";

const RESULTS_URL = `https://es.dump.academy/guess-melody/stats`;
const APP_ID = `8335681`;

function* loadQuestions(){
  while(true){
    const {payload: score} = yield take(Actions.loadPlayerScores + ``);
    let {error, result} = yield call(fetchSaga, {
      url: `${RESULTS_URL}/${APP_ID}`,
      method: `POST`,
      body: JSON.stringify({score})
    });
    console.log("Рас");
    if(error){
      yield put(Actions.error(error));
      continue;
    }
    ({error, result} = yield call(fetchSaga, {
      url: `${RESULTS_URL}/${APP_ID}`,
      method: `GET`
    }));
    console.log("Тфа");
    if(error){
      yield put(Actions.error(error));
      continue;
    }
    console.log(result);
    yield put(Actions.resultsLoaded({
      playerResult: score,
      results: result
    }));

  }
}

export default loadQuestions;

/*    try{
      const result = yield take(actions.loadPlayerResults + ``);
      console.log(result);
      throw new Error();
      const {response, timeout} = yield race({
        response: call(fetch, `${RESULTS_URL}/${APP_ID}`, {
          method: `post`,  
          body: result
        }),
        timeout: call(delay, TIMEOUT_MS)
      });
      if(response){
        const json = yield call(() => response.json());
      } 
    }catch(e){
      console.log(e);
    }*/