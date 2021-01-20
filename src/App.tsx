import React from "react";
import "./App.scss";

//Test Data
import data from "./testData/testData.json";

//Simple Carousel
import CarouselContainer from "./components/CarouselContainer";

function App() {
  return (
    <div className="App">
      <CarouselContainer data={data} />
    </div>
  );
}

export default App;
