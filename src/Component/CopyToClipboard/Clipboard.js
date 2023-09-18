import React, { useState } from "react";
import { PrimaryButton } from "../Button/CustomButton"

export function ClipboardCopy({ copyText, hidden, id }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id={id} hidden={hidden} onClick={id ? handleCopyClick : undefined}>
      <PrimaryButton
        size="small"
        disableElevation
        variant="contained"
        onClick={handleCopyClick}
      >
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </PrimaryButton>
    </div>
  );
}
