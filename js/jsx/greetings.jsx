import React, {Component} from "react";

class Greetings extends Component{
  componentDidMount(){
    console.log(this.props);
    this.props.load();
  }
  render(){
    const {loaded, play} = this.props;
    return <section className="welcome">
      <div className="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      {loaded ?
      <button className="welcome__button" onClick={play}><span className="visually-hidden">Начать игру</span></button> : 
      <div className="welcome__loader">loading...</div>
      }
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>За 5 минут нужно ответить на все вопросы.</li>
        <li>Можно допустить 3 ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  }
}

export default Greetings;