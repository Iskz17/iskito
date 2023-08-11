import Compress from "browser-image-compression";
import Stack from "@mui/material/Stack";
import { AppContext } from "../Context/AppContext";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@mui/material/Typography";
import mekito from "../Assets/kito.jpg";
import { PrimaryButton } from "../Component/Button/CustomButton";
import "./LazyLoading.css";

const LazyLoading = () => {
  const [state] = useContext(AppContext);
  const [kitoCompressed, setKitoCompressed] = useState(null);
  const [anotherCompressed, setAnotherCompressed] = useState(null);
  const [uploadAndDownload, setUploadAndDownload] = useState(null);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploadLoaded, setIsUploadLoaded] = useState(false);
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 940,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });
  const matches = useMediaQuery(theme.breakpoints.down("tablet"));

  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 343,
      height: 530,
      borderRadius: 12,
      padding: 12,
      boxShadow: "none",
    },
    media: {
      borderRadius: 6,
      position: "relative",
      zIndex: 1,
      transition: "filter .5s ease-in-out",
    },
    mediaShadow: {
      filter: "blur(40px) saturate(0.9)",
      position: "absolute",
      top: 0,
      zIndex: 0,
      transition: "filter 5s ease-in-out",
    },
    mediaCompressed: {
      borderRadius: 6,
      position: "relative",
      transition: "filter .5s ease-in-out",
      filter: "blur(15px) saturate(0.7)",
    },
  }));
  const styles = useStyles();

  useEffect(() => {
    setNeedToUseDark(state.isDarkMode);
  }, [state]);

  const getSvgToImg = (el) => {
    return URL.createObjectURL(el);
  };

  const options = {
    // As the key specify the maximum size
    // Leave blank for infinity
    maxSizeMB: 0.08,
    // Use webworker for faster compression with
    // the help of threads
    useWebWorker: true,
  };

  const compressedImg = async (arr) => {
    const promises = arr.map((x) =>
      fetch(x.link, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    );

    const responses = await Promise.allSettled(promises);
    const blobs = responses.map((res) => res.value.blob());
    const blobsVal = await Promise.allSettled(blobs);
    const compressedAll = blobsVal.map((res, index) => {
      return new Promise((resolve, reject) => {
        Compress(res.value, options)
          .then((compressedBlob) => {
            // Compressed file is of Blob type
            // You can drop off here if you want to work with a Blob file

            // If you want to work with the File
            // Let's convert it here, by adding a couple of attributes
            compressedBlob.lastModifiedDate = new Date();
            // Convert the blob to file
            // const convertedBlobFile = new File([compressedBlob], file.name, {
            //   type: file.type,
            //   lastModified: Date.now(),
            // });
            arr[index].setResult(getSvgToImg(compressedBlob));
            // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
            resolve();
          })
          .catch((e) => {
            console.log(e);
            // Show the user a toast message or notification that something went wrong while compressing file
          });
      });
    });

    await Promise.allSettled(compressedAll).then(() => {
      setTimeout(() => {
        setIsLoaded(true);
        setIsUploadLoaded(true);
      }, 2000);
    });
  };

  useEffect(() => {
    const arr = [
      {
        link: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        setResult: setKitoCompressed,
      },
      {
        link: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
        setResult: setAnotherCompressed,
      },
      {
        link: mekito,
        setResult: setUploadAndDownload,
      },
    ];
    compressedImg(arr);
    console.log("passed async");
  }, []);

  const handleInput = () => {
    document.getElementById('icon-button-file').click()
  }

  const handleUpload = async (event) => {
    console.log(event.target.files[0]);
    let file = event.target.files[0]
    let blob = new Blob(
      [new Uint8Array(await file.arrayBuffer())],
      { type: file.type }
    );
    return new Promise((resolve, reject) => {
      Compress(blob, options)
        .then((compressedBlob) => {
          // Compressed file is of Blob type
          // You can drop off here if you want to work with a Blob file

          // If you want to work with the File
          // Let's convert it here, by adding a couple of attributes
          compressedBlob.lastModifiedDate = new Date();
          // Convert the blob to file
          // const convertedBlobFile = new File([compressedBlob], file.name, {
          //   type: file.type,
          //   lastModified: Date.now(),
          // });
          setUploadAndDownload(getSvgToImg(compressedBlob));
          // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
          setTimeout(()=> {
            setDownloadDisabled(false);
            setIsUploadLoaded(true);
          });
          resolve();
        })
        .catch((e) => {
          console.log(e);
          // Show the user a toast message or notification that something went wrong while compressing file
        });
    });
  }

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
          background: needToUseDark
            ? "rgba(41,20,62, 0.9)"
            : "rgba(227,227,227)",
          color: needToUseDark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
          height: matches ? "unset" : "100vh",
        }}
      >
        <Stack
          style={{ width: "100%" }}
          spacing={1}
          direction="column"
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <span style={{ fontSize: "2em", fontWeight: 900 }}>
            Lazy Loading Card
          </span>
          <span>reduce mental loading</span>
        </Stack>
        <Stack
          style={{ width: "100%", marginTop: matches ? "-26px" : 0}}
          spacing={1}
          gap={2}
          direction={matches ? "column" : "row"}
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <Card className={styles.root}>
            {isLoaded ? (
              <div style={{ position: "relative" }}>
                <CardMedia
                  className={styles.media}
                  component="img"
                  height={340}
                  image={
                    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                  }
                  loading="lazy"
                />
                <CardMedia
                  className={styles.mediaShadow}
                  component="img"
                  height={340}
                  loading="lazy"
                  image={kitoCompressed}
                />
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 6,
                  position: "relative",
                }}
                className="pulseAnimation"
              >
                <CardMedia
                  className={styles.mediaCompressed}
                  component="img"
                  height={340}
                  loading="lazy"
                  image={kitoCompressed}
                />
              </div>
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lazy Loading
              </Typography>
              <Typography
                variant={matches ? "body1" : "body2"}
                color="text.secondary"
                component="div"
              >
                A low resolution was fetched first, while full picture is
                downloading.
              </Typography>
              <Typography
                variant={matches ? "body1" : "body2"}
                color="text.secondary"
              >
                Theoritically, we store this low res image but in this case, we
                compressing it manually here.
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.root}>
            {isLoaded ? (
              <div style={{ position: "relative" }}>
                <CardMedia
                  className={styles.media}
                  component="img"
                  height={340}
                  image={
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                  }
                />
                <CardMedia
                  className={styles.mediaShadow}
                  component="img"
                  height={340}
                  image={anotherCompressed}
                />
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 6,
                  position: "relative",
                }}
                className="pulseAnimation"
              >
                <CardMedia
                  className={styles.mediaCompressed}
                  component="img"
                  height={340}
                  image={anotherCompressed}
                />
              </div>
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lazy Loading
              </Typography>
              <Typography
                variant={matches ? "body1" : "body2"}
                color="text.secondary"
                component="div"
              >
                Since the low res will likely be pixelated, we set it to blurry.
              </Typography>
              <Typography
                variant={matches ? "body1" : "body2"}
                color="text.secondary"
              >
                The pulse animation gives info that the actual pic is yet to be
                shown.
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.root}>
            {isUploadLoaded ? (
              <div style={{ position: "relative" }}>
                <CardMedia
                  className={styles.media}
                  component="img"
                  height={340}
                  image={uploadAndDownload}
                />
                <CardMedia
                  className={styles.mediaShadow}
                  component="img"
                  height={340}
                  image={uploadAndDownload}
                />
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 6,
                  position: "relative",
                }}
                className="pulseAnimation"
              >
                <CardMedia
                  className={styles.mediaCompressed}
                  component="img"
                  height={340}
                  image={uploadAndDownload}
                />
              </div>
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lazy Loading
              </Typography>
              <Typography
                variant={matches ? "body1" : "body2"}
                color="text.secondary"
                component="div"
              >
                Upload your image here. Then you'll able to download the
                compressed version.
              </Typography>
              <Stack
                style={{
                  width: "100%",
                  height: "100%",
                }}
                spacing={2}
                direction="row"
                sx={{ px: 2, py: 2 }}
                alignItems="center"
                justifyContent={"center"}
              >
                <PrimaryButton
                  size="medium"
                  disableElevation
                  variant="contained"
                  onClick={() => handleInput()}
                >
                  {"Upload"}
                  <input
                    accept={"image/*"}
                    hidden
                    multiple
                    onChange={(e) => {
                      setIsUploadLoaded(false);
                      setUploadAndDownload(null);
                      handleUpload(e);
                      e.target.value = null;
                    }}
                    id="icon-button-file"
                    type="file"
                  />
                </PrimaryButton>
                <PrimaryButton
                  size="medium"
                  disableElevation
                  variant="contained"
                  disabled={downloadDisabled}
                  onClick={()=> {
                    document.getElementById('download-compressed').click();
                  }}
                >
                  {"Download"}
                  <a id="download-compressed" hidden href={uploadAndDownload} download="compressedimage">
                    Download
                  </a>
                </PrimaryButton>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </>
  );
};

export default LazyLoading;
