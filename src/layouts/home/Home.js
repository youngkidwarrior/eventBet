import React, { Component } from 'react';
import './Home.css';
import MainNavigation from '../../components/navigation/MainNavigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.homeImage = React.createRef();
    this.homeTitle = React.createRef();
    this.state = {
      scrollTop: 0,
      menuToggle: false,
      isScroll: true,
      isStuck: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      scrollTop: this.homeImage.current.scrollTop
    });
    if (this.isBottom(this.homeImage.current)) {
      this.setState({
        isScroll: false,
        isStuck: true
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleArrowClick = e => {
    e.preventDefault();
    // if()
    const imageBottom =
      this.homeImage.current.offsetTop +
      this.homeImage.current.offsetHeight -
      200;
    console.log(this.homeImage.current.offsetHeight);
    window.scrollTo({ left: 0, top: imageBottom, behavior: 'smooth' });
  };

  handleScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({
      isScroll: true
    });
    if (this.state.scrollTop <= st) {
      this.setState({
        scrollTop: st,
        menuToggle: true
      });
    } else {
      this.setState({
        scrollTop: st,
        menuToggle: false
      });
    }
    if (this.isBottom(this.homeImage.current)) {
      this.setState({
        isScroll: false,
        isStuck: true
      });
    } else {
      this.setState({
        isScroll: true,
        isStuck: false
      });
    }
  };

  

  isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  render() {
    return (
      <div>
        <MainNavigation menuToggle={this.state.menuToggle} />
        <div className="home-landing-container">
          <div
            className={
              'home-title-container ' +
              (this.state.scrollTop <= 100 ? '' : 'title-offset')
            }
            ref={this.homeTitle}
          >
            <h1>Welcome</h1>
          </div>
          <div className="home-image-container" ref={this.homeImage}>
            <img
              className="home-image"
              src="https://images.wallpaperscraft.com/image/glare_background_blur_dark_63553_1920x1080.jpg"
              alt="Home"
            />
          </div>
          <div
            className={
              'home-image-footer' + (this.state.isStuck ? ' stuck ' : '')
            }
          >
            <img
              className={
                'guide-arrow' + (this.state.isScroll ? ' scrolled' : '')
              }
              src="http://clipart-library.com/images/ziX5yr5kT.png"
              alt="arrow"
              onClick={this.handleArrowClick}
            />
          </div>
          <div className="fader-container">
            <img
              className="fader"
              src="https://css-tricks.com/examples/FadeOutBottom/bottom-fade.png"
              alt="fade"
            />
          </div>
        </div>
        <div className="home-content-container">
          <div className="home-content-header" />
          <div className="home-content">
            <div className="cards">
              <h1>H</h1>
              <h1>E</h1>
              <h1>L</h1>
              <h1>L</h1>
              <h1>O</h1>
              <h1>W</h1>
              <h1>O</h1>
              <h1>R</h1>
              <h1>L</h1>
              <h1>D</h1>
            </div>
          </div>
          <div className="home-content-options" />
        </div>
        <div className="home-footer" />
      </div>
    );
  }
}

export default Home;
