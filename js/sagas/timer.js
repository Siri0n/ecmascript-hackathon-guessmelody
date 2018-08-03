import Actions from "../actions";
import {eventChannel, END} from "redux-saga";
import {take, call, put, fork, join, race, select} from "redux-saga/effects";

const SECOND = 1000;

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs >= 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END)
        }
      }, SECOND);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}

function* tick(){
  const timeLeft = yield select((state) => state.getIn([`gameData`, `timeLeft`]));
  const channel = yield call(countdown, timeLeft);
  while(true){
    let seconds = yield take(channel);
    yield put(Actions.tick());
  }
}

function* timer(){
  while(true){
    yield take(Actions.play + ``);
    let {timeout, interrupt} = yield race({
      timeout: call(tick),
      interrupt: take(Actions.gameEnd + ``)
    });
  } 
}

export default timer;