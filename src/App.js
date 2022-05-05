import Router from "./router/router";

import { BrowserRouter, Link } from "react-router-dom";

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* TODO: <Menu /> 컴포넌트 만들기 */}
        <nav className="app-menu">
          <Link className="app-menu-item" to="/">Main</Link>
          |
          <Link className="app-menu-item" to="/author">Author</Link>
        </nav>

        <div className="app-content">
          <Router />
        </div>
      </div>

    </BrowserRouter>
  );
};

export default App;
