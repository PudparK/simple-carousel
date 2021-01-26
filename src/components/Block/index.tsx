import React from "react";

type Content = {
  id: string;
  observer: IntersectionObserver | null;
  content: React.ReactNode;
  active: boolean;
  canScroll: boolean;
  setCanScroll: (n: boolean) => void;
};

const Block = React.forwardRef<HTMLDivElement, Content>(
  ({ id }: Content, ref) => {
    const defaultSettings = {
      minWidth: "100%",
      minHeight: "100px",
      backgroundColor: "coral",
      margin: "0 10px",
    } as React.CSSProperties;

    return (
      <div id={id} ref={ref} style={defaultSettings}>
        test {id}
      </div>
    );
  }
);

export default Block;
