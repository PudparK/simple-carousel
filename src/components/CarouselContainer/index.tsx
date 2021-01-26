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
      // setCanScroll(false);
      console.log("currentslide", entry.target.id);
      setState(Number.parseInt(entry.target.id, 10));
    }
  });
};

const CarouselContainer = ({ data }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [
    observerInstace,
    setObserverInstance,
  ] = useState<IntersectionObserver | null>(null);
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const slidesRef = React.useRef<HTMLDivElement[]>([]);

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
        handler(entries, observer, setCurrentSlide);
      }, options);
      setObserverInstance(obs);
    }
  }, []);

  const getDots = (count: number) => {
    let dotsArr = [];
    for (let i = 0; i < count; ++i) {
      dotsArr.push(
        <Dot
          active={currentSlide === i}
          onClick={() => {
            if (slidesRef.current) {
              slidesRef.current[i]?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          key={i}
        />
      );
    }
    return dotsArr;
  };

  const addToRef = (ref: HTMLDivElement) => {
    if (ref) {
      slidesRef.current.push(ref);
      if (observerInstace) observerInstace.observe(ref);
    }
  };

  return (
    <>
      <div
        ref={carouselRef}
        className={styles.blocksContainer}
        onScroll={() => console.log("onscroll")}
      >
        {data.map((item: string, key: number) => (
          <Block
            id={key.toString()}
            observer={observerInstace}
            active={currentSlide === key}
            content={item}
            key={key}
            canScroll={canScroll}
            setCanScroll={setCanScroll}
            ref={addToRef}
          />
        ))}
      </div>
      <div className={styles.dotsContainer}>{getDots(data.length)}</div>
    </>
  );
};

export default CarouselContainer;
