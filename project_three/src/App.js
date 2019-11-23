import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      searchTerm: "",
      imgClick: ""
    };
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleClick = e => {
    axios
      .post("/gif_search", {
        searchTerm: this.state.searchTerm
      })
      .then(res => {
        this.setState({ imgs: res.data.results });
      });
  };

  focusImage = text => {
    this.setState({ imgClick: text });
  };

  render() {
    const { imgs, searchTerm, imgClick } = this.state;
    if (imgClick) {
      return (
        <div>
          <img className="gif-focus-display" src={imgClick} alt="GIPHY" />
        </div>
      );
    }
    return (
      <div className="parent-container">
        <div className="header">
          <h3 className="title"> Welcome to My Gif Search Engine </h3>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="gif-search-input"
            value={searchTerm}
            onChange={this.handleChange}
          />

          <button id="gif-search-submit" onClick={this.handleClick}>
            Search
          </button>
        </div>

        <div>
          {imgs.map((img, i) => (
            <img
              onClick={() => this.focusImage(img.gifUrl)}
              className="gif-result-display"
              key={i}
              src={img.gifUrl}
              alt="GIPHY"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
