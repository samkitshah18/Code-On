import { useState } from "react";

import { IconButton, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";
import "brace/theme/github";

import "./Chat.css";
import axios from "../../axios";

const Chat = () => {
  const [codeText, setCodeText] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const available_languages = [];

  const sendCode = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:9000/executeItBastard", {
        code: codeText,
        lang: "python3",
        input: input,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.output);
        setOutput(response.data.output);
      });
  };

  const onChange = (new_value) => {
    console.log("change", new_value);
    setCodeText(new_value);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>CodeFile name</h3>
          {/* <p>Last seen at...</p> */}
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <PlayArrowIcon onClick={sendCode} />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <div className="yashpatel">
        <AceEditor
          mode="java"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true,
          }}
        />
        <div className="input_output">
          <div className="chat__body2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Input"
            />
          </div>

          <div className="chat__body2">
            <p>Output:</p>
            <pre
              value={input}
              type="text"
              placeholder="Output"
              className="foobar"
            >
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
