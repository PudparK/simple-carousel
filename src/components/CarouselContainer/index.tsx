import React, { useState } from "react";
import styles from "./styles.module.scss";

import Block from "../Block";
import Dot from "../Dot";

const Box = ({ data }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const useIntersect = ({ root = null, rootMargin = "0px", threshold = 0 }) => {
    const [entry, updateEntry] = React.useState({});
    const [node, setNode] = React.useState(null);

    const observer = React.useRef(null);

    React.useEffect(() => {
      if (observer.current) observer.current.disconnect();
      console.log("observer.current:", observer.current);
      observer.current = new window.IntersectionObserver(
        ([entry]) => updateEntry(entry),
        {
          root,
          rootMargin,
          threshold,
        }
      );

      const { current: currentObserver } = observer;

      if (node) currentObserver.observer(node);

      return () => currentObserver.disconnect();
    }, [node, root, rootMargin, threshold]);

    return [setNode, entry];
  };

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

export default Box;
