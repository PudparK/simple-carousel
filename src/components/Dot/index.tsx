import React from "react";
import styles from "./styles.module.scss";

type DotProps = {
  active: boolean;
  onClick: () => void;
};

const Dot = ({ active, onClick }: DotProps) => {
  let activeClass = active ? styles.active : "";
  return (
    <span className={activeClass + " " + styles.dot} onClick={onClick}></span>
  );
};

export default Dot;
