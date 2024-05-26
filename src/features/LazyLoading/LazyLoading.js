import Compress from "browser-image-compression";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Stack, MenuItem, FormControl, useMediaQuery, Typography } from "@mui/material";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { PrimaryButton, Dropdown, Title } from "../../components/Component";
import { AppContext } from "../../Context/AppContext";
import ProgressStepper from "../../components/ProgressStepper/ProgressStepper";
import React, { useState, useContext, useEffect } from "react";
import mekito from "../../assets/kito.jpg";
import { useTranslation } from 'react-i18next';
import "./LazyLoading.css";

const LazyLoading = () => {
  const { t } = useTranslation();
  const [state] = useContext(AppContext);
  const [kitoCompressed, setKitoCompressed] = useState(null);
  const [anotherCompressed, setAnotherCompressed] = useState(null);
  const [uploadAndDownload, setUploadAndDownload] = useState(null);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [stepActive, setStepActive] = useState(0);
  const [steps, setSteps] = useState([
    {
      titleText: t('lazyLoading.progressStepper.uploadImage.label'),
      helperText: t('lazyLoading.progressStepper.uploadImage.description'),
      completed: false,
      skip: false,
    },
    {
      titleText: t('lazyLoading.progressStepper.chooseFormat.label'),
      helperText: t('lazyLoading.progressStepper.chooseFormat.description'),
      completed: false,
      skip: false
    },
    {
      titleText: t('lazyLoading.progressStepper.download.label'),
      helperText: t('lazyLoading.progressStepper.download.description'),
      completed: false,
      skip: false
    }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploadLoaded, setIsUploadLoaded] = useState(false);
  const [currentFileType, setCurrentFileType] = useState(null);
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
    rootUploadDownload: {
      maxWidth: 343,
      height: 570,
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
    return () => { };
  }, [state]);

  const getSvgToImg = (el) => {
    return URL.createObjectURL(el);
  };

  const options = {
    // As the key specify the maximum size
    // Leave blank for infinity
    maxSizeMB: 0.07,
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
            const convertedBlobFile = new File([compressedBlob], ";aklsjfgjfa", {
              type: "image/png",
              lastModified: Date.now(),
            });
            arr[index].setResult(getSvgToImg(convertedBlobFile));
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
    let arr = [
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
    return () => {
      arr = null;
    }
  }, []);

  const handleInput = () => {
    document.getElementById("icon-button-file").click();
  };

  const handleRenderMenuItemBg = () =>
    ["image/webp", "image/png", "image/jpeg"]?.map((type) => (
      <MenuItem
        style={{ fontFamily: "Gilroy" }}
        key={`${type}_menuItem`}
        value={type}
      >
        {type}
      </MenuItem>
    ));

  const handleFileTypeChange = (event) => {
    return new Promise((resolve, reject) => {
      Compress.canvasToFile(
        Compress.drawImageInCanvas(document.getElementById("testconvert")),
        event.target.value,
        "compressedImage"
      ).then(data => {
        setUploadAndDownload(getSvgToImg(data));
      });
      setCurrentFileType(event.target.value);
      handleStepper(2);
      resolve();
    });
  }

  const handleStepper = (stepNumber) => {
    setStepActive(stepNumber);
    let stepsArr = [...steps];
    stepsArr.forEach((st, index) => {
      if (index < stepNumber) {
        st.completed = true;
        return;
      }
      st.completed = false;
    })
    //complete the previous
    //incomplete the next
    setSteps(stepsArr);
  }

  const handleUpload = async (event) => {
    let file = event.target.files[0];
    let blob = new Blob([new Uint8Array(await file.arrayBuffer())], {
      type: file.type,
    });
    return new Promise((resolve, reject) => {
      Compress(blob, options)
        .then((compressedBlob) => {
          // Compressed file is of Blob type
          // You can drop off here if you want to work with a Blob file
          setCurrentFileType(file.type);
          // If you want to work with the File
          // Let's convert it here, by adding a couple of attributes
          compressedBlob.lastModifiedDate = new Date();
          // Convert the blob to file
          const convertedBlobFile = new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          setUploadAndDownload(getSvgToImg(convertedBlobFile));
          // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
          setTimeout(() => {
            setDownloadDisabled(false);
            setIsUploadLoaded(true);
            handleStepper(1);
          });
          resolve();
        })
        .catch((e) => {
          console.log(e);
          // Show the user a toast message or notification that something went wrong while compressing file
        });
    });
  };

  return (
    <div
      id="arrangeParent"
      style={{
        fontFamily: "Gilroy",
        background: needToUseDark
          ? "rgba(41,20,62, 0.9)"
          : "rgba(240,203,168)",
        color: needToUseDark
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(0, 0, 0, 0.7)",
        height: "unset",
        minHeight: "699px"
      }}
    >
      <Title title={t('lazyLoading.title')} description={t('lazyLoading.description')} />
      <Stack
        style={{ width: "100%", marginTop: matches ? "-26px" : 0 }}
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.lazyLoading')}
            </Typography>
            <Typography
              variant={matches ? "body1" : "body2"}
              color="text.secondary"
              component="div"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.card1.p1')}
            </Typography>
            <Typography
              variant={matches ? "body1" : "body2"}
              color="text.secondary"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.card1.p2')}
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.lazyLoading')}
            </Typography>
            <Typography
              variant={matches ? "body1" : "body2"}
              color="text.secondary"
              component="div"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.card2.p1')}
            </Typography>
            <Typography
              variant={matches ? "body1" : "body2"}
              color="text.secondary"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.card2.p2')}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className={
            downloadDisabled ? styles.root : styles.rootUploadDownload
          }
        >
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
              <img id="testconvert" src={uploadAndDownload} hidden alt={"upload desired pic"} />
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontFamily: "Gilroy", }}
            >
              {t('lazyLoading.lazyLoading')}
            </Typography>
            <Typography
              variant={matches ? "body1" : "body2"}
              color="text.secondary"
              component="div"
              style={{ fontFamily: "Gilroy" }}
            >
              {t('lazyLoading.card3.p1')}
            </Typography>
            {!downloadDisabled ? (
              <Stack
                style={{
                  width: "100%",
                  height: "100%",
                }}
                spacing={1}
                direction="column"
                sx={{ px: 1, py: 1 }}
                alignItems="center"
                justifyContent={"center"}
              >
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography
                    variant={matches ? "body1" : "body2"}
                    color="text.secondary"
                    component="div"
                    style={{ fontFamily: "Gilroy", fontWeight: "900" }}
                  >
                    {t('lazyLoading.downloadType')}
                  </Typography>

                  <FormControl
                    sx={{
                      minWidth: "100px",
                    }}
                    size="small"
                  >
                    <Dropdown
                      value={currentFileType}
                      onChange={handleFileTypeChange}
                      displayEmpty
                      overrideDarkmode={true}
                      isDarkMode={false}
                      style={{ fontFamily: "Gilroy", fontSize: "13px" }}
                    >
                      {handleRenderMenuItemBg()}
                    </Dropdown>
                  </FormControl>
                </div>
              </Stack>
            ) : null}
            <Stack
              style={{
                width: "100%",
                height: "100%",
              }}
              spacing={2}
              direction="row"
              sx={{ px: 2, py: downloadDisabled ? 2 : 1 }}
              alignItems="center"
              justifyContent={"center"}
            >
              <PrimaryButton
                size="medium"
                disableElevation
                variant="contained"
                onClick={() => handleInput()}
              >
                {t('lazyLoading.upload')}
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
                onClick={() => {
                  document.getElementById("download-compressed").click();
                  handleStepper(3);
                }}
              >
                {t('lazyLoading.download')}
                <a
                  id="download-compressed"
                  hidden
                  href={uploadAndDownload}
                  download="compressedimage"
                >
                  {t('lazyLoading.download')}
                </a>
              </PrimaryButton>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Stack
        spacing={1}
        gap={2}
        direction={"row"}
        sx={{ py: 2 }}
        alignItems="center"
        justifyContent={"center"}
        style={{ width: "100%", marginTop: matches ? "-26px" : 0 }}
      >
        <ProgressStepper
          active={stepActive}
          steps={steps}
          trailingConnector={true}
          isHorizontalOrientation={true}
          onClick={() => { }}
          buttonText="Ello"
        />
      </Stack>
    </div>
  );
};

export default LazyLoading;
