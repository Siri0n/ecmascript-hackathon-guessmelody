import {createStore, applyMiddleware} from "redux";
import {handleActions} from "redux-actions";
import createSagaMiddleware from "redux-saga";
import Actions from "./actions";
import Immutable from "immutable";
import loadQuestions from "./sagas/load-questions";
import loadPlayerResults from "./sagas/load-player-results";
import timer from "./sagas/timer";
import {call, all} from "redux-saga/effects";

const GAME_LENGTH = 300;
const MAX_MISTAKES = 2;

const initialGameData = Immutable.fromJS({
  answers: [],
  timeLeft: GAME_LENGTH,
  mistakes: 0,
  lastAnswerTime: GAME_LENGTH,
});

const initialState = Immutable.fromJS({
  screen: "welcome",
  questions: null,
  gameData: initialGameData
});

const reducer = handleActions({
  [Actions.debug]: (state) => state.set(`debug`, true),
  [Actions.error]: (state, {payload}) => state.set(`error`, payload),
  [Actions.questionsLoaded]: (state, {payload}) => state.set(`questions`, Immutable.fromJS(payload)),
  [Actions.play]: (state) => state.set(`screen`, `game`).set(`gameData`, initialGameData),
  [Actions.tick]: (state) => {
    state = state.updateIn([`gameData`, `timeLeft`], (time) => --time);
    if(!state.getIn([`gameData`, `timeLeft`])){
      state = state.set(`screen`, `result`);
    }
    return state;
  },
  [Actions.answer]: (state, {payload: isCorrect}) => {
    console.log("answer");
    let gameData = state.get(`gameData`);
    let time = gameData.get(`timeLeft`);
    let answer = new Immutable.Map({
      isCorrect,
      time: gameData.get(`lastAnswerTime`) - time
    });
    gameData = gameData.set(`lastAnswerTime`, time);
    gameData = gameData.update(`answers`, list => list.push(answer));
    if(!isCorrect){
      gameData = gameData.update(`mistakes`, (n) => ++n);
    }
    if((gameData.get(`mistakes`) > MAX_MISTAKES) || 
      (gameData.get(`answers`).size === state.get(`questions`).size)){
      state = state.set(`screen`, `result`);
    }
    state = state.set(`gameData`, gameData);
    return state;
  },
  [Actions.resultsLoaded]: (state, {payload: {playerResult, results}}) => {
    state = state.setIn([`gameData`, `playerResult`], playerResult);
    state = state.setIn([`gameData`, `results`], results);
    return state;
  }
}, initialState);

const sagaMiddleware = createSagaMiddleware();

const store = window.store = createStore(
  reducer, 
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(function*(){
  try{
    yield all([
      call(loadQuestions),
      call(loadPlayerResults), 
      call(timer)
    ]);
  }catch(e){
    console.log(e);
  }
});

export default store;
