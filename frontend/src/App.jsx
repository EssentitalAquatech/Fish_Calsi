import React from "react";
import CalculatorPage from "./pages/CalculatorPage";
import AutoTranslate from "./i18n/AutoTranslate";

function App() {
  return (
    <>
      <AutoTranslate />
      <CalculatorPage />
    </>
  );
}

export default App;
