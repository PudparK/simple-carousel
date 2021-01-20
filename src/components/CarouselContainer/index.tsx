import React, { useState } from "react";
import styles from "./styles.module.scss";

import Block from "../Block";
import Dot from "../Dot";

const handler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  setState: (nextState: number) => void
) => {
  entries.forEach((entry, i) => {
    if (entry.intersectionRatio >= 0.1) {
      setState(Number.parseInt(entry.target.id, 10));
    }
  });
};

const CarouselContainer = ({ data }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const setNextSlide = React.useCallback(
    (nextSlide: number) => {
      if (nextSlide !== isScrolling) {
        setCurrentSlide(nextSlide);
        setIsScrolling(nextSlide);
      } else {
        setCurrentSlide(nextSlide);
      }
    },
    [isScrolling]
  );

  React.useEffect(() => {
    if (!!observerRef.current) {
      observerRef.current.disconnect();
    }
    if (!!carouselRef.current) {
      let options = {
        root: carouselRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      };

      observerRef.current = new IntersectionObserver((entries, observer) => {
        handler(entries, observer, setNextSlide);
      }, options);
    }
  }, [setNextSlide]);

  const getDots = (count: number) => {
    let dotsArr = [];
    for (let i = 0; i < count; ++i) {
      dotsArr.push(
        <Dot
          active={currentSlide === i}
          onClick={() => {
            setNextSlide(i);
          }}
          key={i}
        />
      );
    }
    return dotsArr;
  };
  return (
    <>
      <div ref={carouselRef} className={styles.blocksContainer}>
        {data.map((item: string, key: number) => (
          <Block
            id={key.toString()}
            observer={observerRef.current}
            active={currentSlide === key}
            content={item}
            key={key}
          />
        ))}
      </div>
      <div className={styles.dotsContainer}>{getDots(data.length)}</div>
    </>
  );
};

export default CarouselContainer;
