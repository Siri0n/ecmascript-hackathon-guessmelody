import React, {Component} from "react";

const GAME_LENGTH = 300;
const MAX_MISTAKES = 2;
const Fails = {
  TIME: 1,
  MISTAKES: 2,
};
const Rules = {
  FAST_TIME: 30,
  FAST_BONUS: 1,
  MISTAKE_PENALTY: -2,
  CORRECT_BONUS: 1
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {answers, time, mistakes, stopTimer, loadPlayerScores} = this.props;
    stopTimer();
    if (time === 0) {
      this.setState({fail: Fails.TIME});
      return;
    }
    if (mistakes > MAX_MISTAKES) {
      this.setState({fail: Fails.MISTAKES});
      return;
    }
    const score = calculateScore(answers, mistakes);
    loadPlayerScores(score);
  }
  onRetryClick() {
    this.props.retry();
  }
  renderLose({title, description}) {
    return <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">{title}</h2>
      <p className="result__total result__total--fail">{description}</p>
      <button className="result__replay" type="button" onClick={() => this.onRetryClick()}>Попробовать ещё раз</button>
    </section>;
  }
  renderLoad() {
    return <div>Загружаем результаты...</div>;
  }
  render() {
    if (this.state.fail === Fails.TIME) {
      return this.renderLose({
        title: `Увы и ах!`,
        description: `Время вышло! Вы не успели отгадать все мелодии`
      });
    }
    if (this.state.fail === Fails.MISTAKES) {
      return this.renderLose({
        title: `Какая жалость!`,
        description: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
      });
    }
    const {answers, time, results, playerResult, mistakes} = this.props;

    if (!results) {
      return this.renderLoad();
    }

    const playersNumber = results.length;
    const place = results.sort((a, b) => b.score - a.score).findIndex((elem) => elem.score === playerResult) + 1;
    const percent = Math.round((playersNumber - place) * 100 / (playersNumber - 1));
    const playTime = GAME_LENGTH - time;
    const seconds = playTime % 60;
    const minutes = (playTime - seconds) / 60;
    const fastScore = answers.reduce((acc, answer) => answer.time < Rules.FAST_TIME ? acc + 1 : acc, 0);

    const total = `За ${minutes} минуты и ${seconds} секунд вы набрали ${playerResult} баллов (${fastScore} быстрых),` +
    ` совершив ${mistakes} ошибки`;
    const text = `Вы заняли ${place} место из ${playersNumber}. Это лучше чем у ${percent}% игроков`;

    return <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">{total}</p>
      <p className="result__text">{text}</p>
      <button className="result__replay" type="button" onClick={() => this.onRetryClick()}>Сыграть ещё раз</button>
    </section>;

  }
}

export default Result;

const calculateScore = (answers, mistakes) =>
  answers.reduce(
      (acc, {isCorrect, time}) => isCorrect ?
        acc + Rules.CORRECT_BONUS + (time < Rules.FAST_TIME ? Rules.FAST_BONUS : 0) :
        acc,
      Rules.MISTAKE_PENALTY * mistakes
  );
