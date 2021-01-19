import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";

import Block from "../Block";
import Dot from "../Dot";

const CarouselContainer = ({ data }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getDots = (count: number) => {
    let dotsArr = [];
    for (let i = 0; i < count; ++i) {
      dotsArr.push(
        <Dot
          active={currentSlide === i}
          onClick={() => {
            setCurrentSlide(i);
          }}
          key={i}
        />
      );
    }
    return dotsArr;
  };
  return (
    <>
      <div className={styles.blocksContainer}>
        {data.map((item: string, key: number) => (
          <Block active={currentSlide === key} content={item} key={key} />
        ))}
      </div>
      <div className={styles.dotsContainer}>{getDots(data.length)}</div>
    </>
  );
};

export default CarouselContainer;
