import React, {Component, Fragment} from "react";
import Timer from "./timer.jsx";
import Mistakes from "./mistakes.jsx";
import GenreScreen from "./genre-screen.jsx";
import ArtistScreen from "./artist-screen.jsx";
import Modal from "./modal.jsx";

class Game extends Component {
  onBackClick(e) {
    e.preventDefault();
    this.props.showModal(true);
  }
  render() {
    const {time, mistakes, question, answer, debug, level, modal, showModal, restart} = this.props;
    const GameScreen = (question.type === `genre` ? GenreScreen : ArtistScreen);
    const gameSection = <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#" onClick={(e) => this.onBackClick(e)}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="/img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>
        <Timer time={time}/>
        <Mistakes count={mistakes}/>
      </header>
      <GameScreen key={level} {...{question, answer, debug}}/>
    </section>;
    return <Fragment>
      {gameSection}
      <Modal {...{modal, showModal, restart}}/>
    </Fragment>;
  }
}

export default Game;
