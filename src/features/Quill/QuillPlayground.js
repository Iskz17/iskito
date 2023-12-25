import ReactQuill from 'react-quill';
import Compress from "browser-image-compression";
import { Title } from "../../components/Component";
import { useState, useEffect, useRef, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import './QuillPlayground.css'
// import 'react-quill/dist/quill.snow.css';
import React from 'react';

const QuillPlayground = (props) => {
    window.katex = katex;
    const [QuillText, setQuillText] = useState('');
    const quillRef = useRef(null);

    const getSvgToImg = (el) => {
        return URL.createObjectURL(el);
    };

    useEffect(() => {
        document.addEventListener('click', function (event) {
            let allParagraphs = document.getElementsByTagName('p');
            let arr = [].slice.call(allParagraphs);
            arr.forEach((paragraph) => {
                if (paragraph.getAttribute('data-childid') !== event.target.id && paragraph.getAttribute('data-childid') !== event.target.getAttribute('data-childid')) {

                    let pStyle = paragraph.style.cssText;
                    paragraph.style.cssText = pStyle.replace("resize: horizontal; overflow: hidden;", "");

                    // Click occurred outside the paragraph
                    // Perform actions or trigger events as needed
                }
            });
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                // Do something
                const paragraphs = document.querySelectorAll('p');
                paragraphs.forEach(paragraph => {
                    if (!paragraph.querySelector('img')) {
                        // Do something with the paragraphs that don't contain an img
                        // For example: paragraph.style.color = 'red';
                        paragraph.removeAttribute('data-childid');
                        paragraph.removeAttribute('style');
                    }
                });
            }
        })
    }, [])

    const options = {
        // As the key specify the maximum size
        // Leave blank for infinity
        maxSizeMB: 0.07,
        // Use webworker for faster compression with
        // the help of threads
        useWebWorker: true,
    };
    const handleInput = () => {
        document.getElementById("icon-button-file-quill").click();
    };
    const imgOnClickHandler = (e) => {
        const clickedElement = e.target;
        const p = clickedElement.closest('p');
        p.setAttribute('data-childid', 'gg_iskito');
        console.log(p.style);
        p.style = `${p.style.cssText} resize:horizontal; overflow:hidden;`;
        p.focus();
    }
    const handleCorrectBlob = (imageUrl) => {
        let allImg = document.getElementsByTagName('img');
        let arr = [].slice.call(allImg);
        arr.forEach(x => {
            if (x.src === "http://dummy:3000/") {
                x.src = imageUrl;
                x.style = "width:100%;"
                x.id = "gg_iskito";
                x.onclick = (e) => {
                    imgOnClickHandler(e);
                    e.preventDefault();
                }
            }
        })
    }
    const handleImageUpload = async (event) => {
        let file = event.target.files[0];
        let blob = new Blob([new Uint8Array(await file.arrayBuffer())], {
            type: file.type,
        });
        //insert into editor first.
        const imageId = 'uniqueImageId123'; // Assign a unique ID to the image

        // Assuming the editor instance is named 'quillRef'
        const quillEditor = quillRef.current.getEditor();
        const range = quillEditor.getSelection();
        const index = range?.index || 0;

        return new Promise((resolve, reject) => {
            Compress(blob, options)
                .then((compressedBlob) => {
                    compressedBlob.lastModifiedDate = new Date();
                    const convertedBlobFile = new File([compressedBlob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });

                    // Replace this logic with your image upload implementation
                    // After uploading, get the image URL and ID
                    const uploadedImageURL = getSvgToImg(convertedBlobFile);// Replace with actual URL

                    // Insert the image with its ID at the cursor position
                    quillEditor.insertEmbed(index, 'image', 'http://dummy:3000/', 'user', imageId);
                    resolve();
                    handleCorrectBlob(uploadedImageURL);
                })
                .catch((e) => {
                    console.log(e);
                    // Show the user a toast message or notification that something went wrong while compressing file
                });
        });
    };

    const handleInsertZombie = () => {
        // Implement your custom upload logic here...
        console.log('Custom upload button clicked');
        // Call your upload function or open an upload dialog
        // Update the editor content with the uploaded image

        const editor = quillRef.current.getEditor();
        const cursorPosition = editor.getSelection()?.index || 0;

        // Insert the desired Unicode character at the cursor position
        editor.insertText(cursorPosition, '🧟‍♂️');
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'script', 'indent', 'direction', 'size', 'header', 'color', 'background',
        'font', 'link', 'image', 'video', 'pdf', 'formula', 'align', 'clean' // Added customUpload
    ];
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ script: "sub" }, { script: "super" }],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],

                    [
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    [{ direction: "rtl" }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["link", "image", "video", "formula"],
                    [{ 'customUpload': '' }],
                    ["clean"],
                ],

                handlers: {
                    customUpload: handleInsertZombie,
                    image: handleInput,
                },
                // history: {
                //     delay: 500,
                //     maxStack: 100,
                //     userOnly: true,
                // },
            },
        }),
        []
    );

    return (
        <div style={{
            fontFamily: "Gilroy",
            backgroundColor: "#568371",
            paddingTop: '18px'
            // height: matches ? "unset" : "100vh",
            // minHeight: "699px",
        }}>
                        <Title title={"Quill Editor"} description={"quill playground"} />
            <input
                accept={"image/*"}
                hidden
                multiple
                onChange={(e) => {
                    handleImageUpload(e);
                    console.log(e, 'this is e');
                }}
                id="icon-button-file-quill"
                type="file"
            />
            <ReactQuill
                value={QuillText || ''}
                onChange={setQuillText}
                theme="snow"
                ref={quillRef}
                modules={modules}
                formats={formats}
                placeholder="Write something..."

            />
        </div>
    )
}

export default QuillPlayground;