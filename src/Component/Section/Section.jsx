import * as React from "react";

export const Section = React.forwardRef((props,ref) => {
  const { children, id } = props;
  return (
    <div
      id={id}
      className="sectionColor"
      style={{
        width: "100%",
        height: "inherit",
        paddingTop:"15px",
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});
