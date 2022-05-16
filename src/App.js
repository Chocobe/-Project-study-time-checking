import MainRouter from "@/router/router";

import { BrowserRouter } from "react-router-dom";

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-content">
          <MainRouter />
        </div>
      </div>

    </BrowserRouter>
  );
};

export default App;
