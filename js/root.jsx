import React from "react";
import Error from "./jsx/error.jsx";
import Greetings from "./jsx/greetings.jsx";
import Game from "./jsx/game.jsx";
import Result from "./jsx/result.jsx";
import {connect} from "react-redux";
import Actions from "./actions";

const Root = ({state, ...actions}) => {
  if(state.error){
    return <Error error={state.error}/>;
  }
  const {debug, screen, questions, gameData: {timeLeft: time, mistakes, answers, results, playerResult}} = state;
  const {play, answer, loadQuestions, loadPlayerScores, stopTimer} = actions;
  switch(screen){
    case `welcome`:
      return <Greetings loaded={!!state.questions} {...{play, load: loadQuestions}}/>;
    case `game`:
      let level = answers.length;
      let question = questions[level];
      return <Game {...{debug, level, time, question, mistakes}} answer={answer}/>
    case `result`:
      return <Result {...{answers, time, mistakes, results, playerResult}} {...{retry: play, loadPlayerScores, stopTimer}}/>;
    default:
      return <div>Что-то пошло не так</div>;
  }
};

export default connect(
  state => ({state: state.toJS()}),
  {
    loadQuestions: Actions.loadQuestions,
    play: Actions.play,
    answer: Actions.answer,
    loadPlayerScores: Actions.loadPlayerScores,
    stopTimer: Actions.gameEnd
  }
)(Root);
