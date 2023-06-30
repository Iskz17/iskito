import * as React from "react";

export default function SectionDiv(props) {
  const { children, id, ...rest } = props;
  return (
    <div
      id={id}
      style={{
        width: "100%",
        height: "100vh",
        background: "white",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
