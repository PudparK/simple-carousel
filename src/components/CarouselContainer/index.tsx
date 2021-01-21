import React, { useState } from "react";
import styles from "./styles.module.scss";

import Block from "../Block";
import Dot from "../Dot";

const handler = (
  entries: IntersectionObserverEntry[],
  _: IntersectionObserver,
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
  const [upcomingSlide, setUpcomingSlide] = useState(0);
  const [
    observerInstace,
    setObserverInstance,
  ] = useState<IntersectionObserver | null>(null);
  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  const setNextSlide = (nextSlide: number) => {
    if (upcomingSlide === nextSlide) {
      setUpcomingSlide(nextSlide);
    }
    setCurrentSlide(nextSlide);
  };

  React.useEffect(() => {
    if (!!observerInstace) {
      observerInstace.disconnect();
    }
    if (!!carouselRef.current) {
      let options = {
        root: carouselRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const obs = new IntersectionObserver((entries, observer) => {
        handler(entries, observer, setUpcomingSlide);
      }, options);
      setObserverInstance(obs);
    }
  }, []);

  const getDots = (count: number) => {
    let dotsArr = [];
    for (let i = 0; i < count; ++i) {
      dotsArr.push(
        <Dot
          active={upcomingSlide === i}
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
            observer={observerInstace}
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
