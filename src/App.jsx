import "./assets/global.scss";
import React from "react";
import HomePage from "./pages/HomePage";

import Header from "../src/components/Header";

function App() {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
