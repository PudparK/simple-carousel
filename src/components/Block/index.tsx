import React, { useRef } from "react";

interface Content {
  id: string;
  observer: IntersectionObserver | null;
  content: React.ReactNode;
  active: boolean;
}

const Block = ({ id, observer, content, active }: Content) => {
  const viewBlock = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (viewBlock.current !== null && active) {
      viewBlock.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active]);

  React.useEffect(() => {
    if (!!viewBlock.current && !!observer)
      observer.observe(viewBlock.current);
  }, [observer]);

  const defaultSettings = {
    minWidth: "100%",
    minHeight: "100px",
    backgroundColor: "coral",
    margin: "0 10px",
  } as React.CSSProperties;

  return (
    <div id={id} ref={viewBlock} style={defaultSettings}>
      test
    </div>
  );
  // const landscapeStyles = {
  //   position: "relative",
  //   paddingBottom: "56.25%" /* 16:9 */,
  //   height: 0,
  //   borderRadius: "15px",
  //   overflow: "hidden",
  //   marginBottom: "20px",
  // } as React.CSSProperties;

  // const iframeStyles = {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  // } as React.CSSProperties;

  // const makeYoutubeEmbed = (url: string) => {
  //   var regExp: RegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //   var match = url.match(regExp);

  //   if (match && match[2].length === 11) {
  //     return match[2];
  //   } else {
  //     return "error";
  //   }
  // };

  // const getEmbedUrl = (url: string) => {
  //   switch (content.type) {
  //     case "youtube":
  //       return makeYoutubeEmbed(content.url);
  //   }

  // <div style={landscapeStyles}>
  //   <iframe
  //     style={iframeStyles}
  //     src={`https://www.youtube.com/embed/${embedUrl}`}
  //     frameBorder="0"
  //     title="Title"
  //   />
  // </div>

  // };

  // const embedUrl = getEmbedUrl(content.url);
};

export default Block;
