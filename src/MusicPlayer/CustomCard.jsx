import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import React, { memo, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

export const CustomCard = memo(
  forwardRef((props, ref) => {
    return (
      <Card
        ref={ref}
        style={{
          maxWidth: 390,
          width: "90%",
          height: 630,
          borderRadius: 12,
          padding: props.noPadding ? 0 : 20,
          boxShadow: "none",
          backdropFilter: "blur(10px) saturate(120%)",
          WebkitBackdropFilter: "blur(10px) saturate(120%)",
          WebkitBorderRadius: 12 ,
          overflow:"hidden",
          background: props?.isDarkMode
            ? "rgba(0,0,0, 0.5)"
            : "rgba(82,86,87, 0.2)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props?.children}
      </Card>
    );
  })
  // below is for conditional rendering for memo
  //   ,
  //   (prevProps, nextProps) => {
  //     return true;
  //   }
);
export const CustomCardMedia = memo(({children,fullWidth, ...others}) => {
    const useStyles = makeStyles(() => ({
      media: {
        width: fullWidth ? "100%" : "90%",
        borderRadius: fullWidth ? 0 : 20,
        WebkitBorderRadius: fullWidth ? "0 20px 20px 0" : 20,
        zIndex: 1,
        transition: "filter .5s ease-in-out",
      },
    }));
    const styles = useStyles();
  
    return (
      <CardMedia className={styles.media} {...others}>
        {children}
      </CardMedia>
    );
  });
  export const CustomCardMediaShadow = memo(({children, ...others}) => {
    const useStyles = makeStyles(() => ({
      mediaShadow: {
        filter: "blur(10px) saturate(0.9)",
        position: "absolute",
        width: "90%",
        top: 0,
        zIndex: 0,
        transition: "filter 5s ease-in-out",
      }
    }));
    const styles = useStyles();
  
    return <CardMedia className={styles.mediaShadow} {...others}>{children}</CardMedia>;
  });
