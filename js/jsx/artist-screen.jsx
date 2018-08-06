import React, {Component} from "react";
import Player from "./player.jsx";

class ArtistScreen extends Component {
  onClick(i) {
    const {question: {answers}, answer} = this.props;
    answer(answers[i].isCorrect);
  }
  render() {
    const {answers, question, src} = this.props.question;
    const debug = this.props.debug;

    return <section className="game__screen">
      <h2 className="game__title">{question}</h2>
      <Player src={src} autoplay={true}/>
      <form className="game__artist">
        {answers.map(({isCorrect, title, image: {url, width, height}}, i) => <div className="artist" key={i}>
          <input className="artist__input visually-hidden" type="radio" name="answer" value={isCorrect} id={`answer-${i}`}
            onClick={() => this.onClick(i)}/>
          <label className="artist__name" htmlFor={`answer-${i}`}>
            <img className="artist__picture" {...{width, height}} src={url} alt={title}
              style={(debug && isCorrect) ? {outline: `2px dashed green`} : {}}/>
            {title}
          </label>
        </div>)}
      </form>
    </section>;
  }
}

export default ArtistScreen;
