import React, {Component} from "react";
import Player from "./player.jsx";

class GenreScreen extends Component{
  constructor(props){
    super(props);
    const answers = props.question.answers;
    this.audio = answers.map(() => React.createRef());
    this.state = {
      checked: answers.map(() => false)
    };
  }
  onPlay(index){
    this.audio.forEach((ref, i) => i !== index && ref.current.stop());
  }
  onCheck(i){
    this.setState((state) => {
      state.checked[i] = !state.checked[i];
      return state;
    })
  }
  onSubmit(e){
    console.log("submit");
    e.preventDefault();
    const {checked} = this.state;
    const {question: {genre, answers}, answer} = this.props;
    if(!checked.some((flag) => flag)){
      return;
    }
    const isCorrect = checked.every((flag, i) => flag === (answers[i].genre === genre));
    this.props.answer(isCorrect);
  }
  render(){
    const {answers, question, genre} = this.props.question;
    const debug = this.props.debug;

    return <section className="game__screen">
      <h2 className="game__title">{question}</h2>
      <form className="game__tracks" onSubmit={(e) => this.onSubmit(e)}>
        {answers.map(({src, genre: answerGenre}, i) => <div key={i} className="game__answer-row">
          <Player ref={this.audio[i]} src={src} autoplay={!i} onPlay={() => this.onPlay(i)}/>
          <div className="game__answer">
            <input className="game__input visually-hidden" type="checkbox" name="answer" value={i} id={`answer-${i}`}
              onClick={() => this.onCheck(i)} checked={this.state.checked[i]}/>
            <label className="game__check" htmlFor={`answer-${i}`} 
              style={(debug && (genre === answerGenre)) ? {outline: `2px dashed green`} : {}}>Отметить</label>
          </div>
        </div>)}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}

export default GenreScreen;