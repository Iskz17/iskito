import { memo, forwardRef } from "react";
import { Stack } from "@mui/material";
import PropTypes from 'prop-types';
import "../../index.css";

const Title = forwardRef((props, ref) => {
  const { title, description, style, ...other } = props;

  return (
    <Stack
      style={{ width: "100%", fontFamily:"NewKansasSemibold", ...style }}
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

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  style: PropTypes.object,
};

export default memo(Title);
