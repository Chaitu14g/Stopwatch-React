import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    countSecond: 0,
    countMinute: 0,
    running: false,
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer = () => {
    clearInterval(this.timerId)
  }

  onStopClicked = () => {
    clearInterval(this.timerId)
    this.setState({running: false})
  }

  onResetClicked = () => {
    this.stopTimer()
    this.setState({
      running: false,
      countSecond: 0,
      countMinute: 0,
    })
  }

  timerStart = () => {
    const {countMinute, countSecond} = this.state
    if (countMinute === 59 && countSecond === 60) {
      this.onResetClicked()
    }
    if (countSecond === 60) {
      this.setState({
        countSecond: 0,
        countMinute: countMinute + 1,
      })
    } else {
      this.setState({
        countSecond: countSecond + 1,
      })
    }
  }

  onStartClicked = () => {
    const {running} = this.state
    if (running === false) {
      this.setState({running: true})
      this.timerId = setInterval(this.timerStart, 1000)
    }
  }

  renderedTime = () => {
    const {countMinute, countSecond} = this.state
    const Minutes = countMinute < 10 ? `0${countMinute}` : countMinute
    const Seconds = countSecond < 10 ? `0${countSecond}` : countSecond
    return `${Minutes}:${Seconds}`
  }

  render() {
    return (
      <div className="main_container main_container_one main_container_two">
        <div className="sub_container">
          <h1 className="sub_container_heading">Stopwatch</h1>
          <div className="timer_container">
            <div className="timer_container_sub">
              <img
                className="timer_image"
                alt="stopwatch"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              />
              <h1 className="timer_container_sub_heading">Timer</h1>
            </div>
            <h1 className="timer_container_sub_heading_time">
              {this.renderedTime()}
            </h1>
            <div className="button_box">
              <button
                className="main_button green_color"
                type="button"
                onClick={this.onStartClicked}
              >
                Start
              </button>
              <button
                className="main_button red_color"
                type="button"
                onClick={this.onStopClicked}
              >
                Stop
              </button>
              <button
                className="main_button yellow_color"
                type="button"
                onClick={this.onResetClicked}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
