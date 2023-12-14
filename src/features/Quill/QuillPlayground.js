import ReactQuill from 'react-quill';
import { useState, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import './QuillPlayground.css'

const QuillPlayground = (props) => {
    window.katex = katex;
    const [QuillText, setQuillText] = useState('');
    return (
        <div style={{
            fontFamily: "Gilroy",
            backgroundColor: "#568371",
            paddingTop: '18px'
            // height: matches ? "unset" : "100vh",
            // minHeight: "699px",
        }}>
            <ReactQuill
                // theme="snow"
                value={QuillText || ''}
                onChange={e => {
                    setQuillText(e)
                }}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        ['link', 'image', 'video', 'pdf', 'formula'],
                        [{ 'align': [] }],

                        ['clean']                                         // remove formatting button
                    ],

                    clipboard: {
                        // toggle to add extra line breaks when pasting HTML:
                        matchVisual: false,
                    },
                }}
            />
        </div>
    )
}

export default QuillPlayground;