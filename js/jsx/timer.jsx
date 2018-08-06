import React, {Component, Fragment} from "react";

const GAME_LENGTH = 300;
const TIME_HURRY = 30;
const CIRCLE_LENGTH = 2325;
const DOTS_CLASS = `timer__dots`;
const HURRY_CLASS = `timer__value--hurry`;

function resetAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

/* eslint-disable */
//тут грязный хак для анимации, я не придумал, как его провернуть, чтобы еслинт не ругался
class Timer extends Component {
  constructor(props) {
    super(props);
    this.dots = React.createRef();
    this.block = React.createRef();
  }
  componentWillReceiveProps({time}) {
    if (time > TIME_HURRY) {
      resetAnimation(this.dots.current, DOTS_CLASS);
    } else {
      resetAnimation(this.block.current, HURRY_CLASS);
    }
  }
  /* eslint-enable */
  render() {
    const {time} = this.props;
    let seconds = time % 60;
    const minutes = (time - seconds) / 60;
    seconds = (`0` + seconds).substr(-2);

    return <Fragment>
      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370" style={{
          filter: `url(.#blur)`,
          transform: `rotate(-90deg) scaleY(-1)`,
          transformOrigin: `center`
        }} strokeDasharray={CIRCLE_LENGTH} strokeDashoffset={CIRCLE_LENGTH * (1 - time / GAME_LENGTH)}/>
      </svg>
      <div ref={this.block} className={time > TIME_HURRY ? `timer__value` : `timer__value \${HURRY_CLASS}`}>
        <span className="timer__mins">{minutes}</span>
        <span ref={this.dots} className={DOTS_CLASS}>:</span>
        <span className="timer__secs">{seconds}</span>
      </div>
    </Fragment>;
  }
}

export default Timer;
