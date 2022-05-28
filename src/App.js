import MainRouter from "@/router/router";
import { BrowserRouter } from "react-router-dom";

import MainContext from "@/context/MainContext/MainContext";
import RecorderContext from "@/context/RecorderContext/RecorderContext";

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <MainContext>
        <RecorderContext>
          <div className="app">
            <div className="app-content">
              <MainRouter />
            </div>
          </div>
        </RecorderContext>
      </MainContext>
    </BrowserRouter>
  );
};

export default App;
