import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Game/Components/Header/Header";
import Footer from "../Game/Components/Footer/Footer";
import Play from "../Game/Play/Play";
import Result from "../Game/Result/Result";
import { resultURL, gameURL } from "../URLs";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

class App extends React.Component {
  constructor(props) {
    super(props);
    //Maintian the result of expedition and error status.
    this.state = { result: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    let changeResult = (res) => {
      this.setState({ result: res });
    };

    let game =
      this.state.hasError === false ? (
        <Router>
          <Switch>
            <Route exact path={gameURL}>
              <Play changeResult={changeResult} />
            </Route>
            <Route exact path={resultURL}>
              <Result result={this.state.result} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <div className="error">
          <ErrorOutlineIcon style={{ color: "#c0392b", fontSize: "40" }} />
          <marquee style={{ fontSize: "xx-large", width: "50%" }}>
            Something broke, please close and try again.
          </marquee>
        </div>
      );

    return (
      <div className="app">
        <Header />
        {game}
        <Footer />
      </div>
    );
  }
}

export default App;
