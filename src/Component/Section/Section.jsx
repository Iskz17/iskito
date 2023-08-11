import * as React from "react";

export default function SectionDiv(props) {
  const { children, id, ...rest } = props;
  return (
    <div
      id={id}
      className="sectionColor"
      style={{
        width: "100%",
        height: "100vh",
        paddingTop:"15px"
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
