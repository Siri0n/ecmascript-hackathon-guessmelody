import React from "react";
import ErrorView from "./jsx/error.jsx";
import Greetings from "./jsx/greetings.jsx";
import Game from "./jsx/game.jsx";
import Result from "./jsx/result.jsx";
import {connect} from "react-redux";
import Actions from "./actions";

const Root = ({state, ...actions}) => {
  if (state.error) {
    return <ErrorView error={state.error}/>;
  }
  const {debug, screen, questions, modal, gameData: {timeLeft: time, mistakes, answers, results, playerResult}} = state;
  const {play, answer, loadQuestions, loadPlayerScores, stopTimer, showModal} = actions;

  switch (screen) {
    case `welcome`:
      return <Greetings loaded={!!state.questions} {...{play, load: loadQuestions}}/>;
    case `game`:
      const level = answers.length;
      const question = questions[level];
      const restart = () => {
        stopTimer();
        showModal(false);
        play();
      };
      return <Game {...{debug, level, time, question, mistakes, modal}} {...{restart, showModal, answer}}/>;
    case `result`:
      return <Result {...{answers, time, mistakes, results, playerResult}} {...{retry: play, loadPlayerScores, stopTimer}}/>;
    default:
      return <div>Что-то пошло не так</div>;
  }
};

export default connect(
    (state) => ({state: state.toJS()}),
    {
      loadQuestions: Actions.loadQuestions,
      play: Actions.play,
      answer: Actions.answer,
      loadPlayerScores: Actions.loadPlayerScores,
      stopTimer: Actions.gameEnd,
      showModal: Actions.showModal
    }
)(Root);
