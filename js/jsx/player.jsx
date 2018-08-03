import React, {Component} from "react";

class Player extends Component{
  constructor(props){
    super(props);
    this.state = {
      play: props.autoplay
    };
    this.audio = React.createRef();
  }
  onClick(){
    this.state.play ? this.stop() : this.play();
  }
  play(){
    this.audio.current.play();
    this.setState({play: true});
    this.props.onPlay && this.props.onPlay(this.props.id);
  }
  stop(){
    this.audio.current.pause();
    this.setState({play: false});
  }
  render(){
    const {src} = this.props;
    const {play} = this.state;
    return <div className="game__track">
      <button className={`track__button ${play ? `track__button--pause` : `track__button--play`}`} 
        type="button" onClick={() => this.onClick()}/>
      <audio ref={this.audio} src={src} autoPlay={play}/>
    </div>
  }
}

export default Player;