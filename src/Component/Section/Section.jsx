import * as React from "react";

export const Section = React.forwardRef((props, ref) => {
  const { children, id, ...rest } = props;
  return (
    <div
      id={id}
      ref={ref}
      className="sectionColor"
      style={{
        width: "100%",
        height: "inherit",
        paddingTop:"15px",
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
