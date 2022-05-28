import MainRouter from "@/router/router";
import { BrowserRouter } from "react-router-dom";

import MainContext from "@/context/MainContext/MainContext";

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <MainContext>
        <div className="app">
          <div className="app-content">
            <MainRouter />
          </div>
        </div>
      </MainContext>
    </BrowserRouter>
  );
};

export default App;
