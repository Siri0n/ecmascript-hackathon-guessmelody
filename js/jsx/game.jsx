import React, {Component} from "react";
import Timer from "./timer.jsx";
import Mistakes from "./mistakes.jsx";
import GenreScreen from "./genre-screen.jsx";
import ArtistScreen from "./artist-screen.jsx";

class Game extends Component{
  render(){
    const {time, mistakes, question, answer, debug, level} = this.props;
    const GameScreen = (question.type == "genre" ? GenreScreen : ArtistScreen);
    return <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="/img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>
        <Timer time={time}/>
        <Mistakes count={mistakes}/>
      </header>
      <GameScreen key={level} {...{question, answer, debug}}/>
    </section>;
  }
}

export default Game;