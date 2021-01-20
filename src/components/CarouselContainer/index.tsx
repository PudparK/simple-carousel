import React, { useState } from "react";
import styles from "./styles.module.scss";

import Block from "../Block";
import Dot from "../Dot";

const handler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  for (const entry of entries) {
    if (entry.intersectionRatio >= 1) {
      console.log("i Am visible", entry.target.textContent);
    }
  }
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const getObserver = (
  ref: React.MutableRefObject<IntersectionObserver | null>
) => {
  let observer = ref.current;
  if (observer !== null) {
    return observer;
  }
  let newObserver = new IntersectionObserver(handler, options);
  ref.current = newObserver;
  return newObserver;
};

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
