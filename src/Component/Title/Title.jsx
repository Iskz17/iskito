import { memo, forwardRef } from "react";
import { Stack } from "@mui/material";
import "../../index.css";

const Title = forwardRef((props, ref) => {
  const { title, description, ...other } = props;

  return (
    <Stack
      style={{ width: "100%" }}
      id={`${title}_${description}`}
      key={`${title}_${description}`}
      spacing={1}
      direction="column"
      sx={{ py: 2 }}
      alignItems="center"
      justifyContent={"center"}
      {...other}>
      <span style={{ fontSize: "2em" }}>{title}</span>
      <span>{description}</span>
    </Stack>
  );
});

export default memo(Title);
