import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">Shopping Cart</Link>
            </header>
            <main>
              <Route path="/" component={HomeScreen} exact />
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
