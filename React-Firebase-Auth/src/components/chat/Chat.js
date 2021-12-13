import { useState, useEffect } from "react";

import { IconButton, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from '@mui/icons-material/Save';
import { signup, login, logout, useAuth, createFile, fetchFile, getDocs, deleteFile } from "../../firebase";

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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./Chat.css";
import axios from "../../axios";

const Chat = ({ currentItem, setCurrentItem }) => {
  const [codeText, setCodeText] = useState(currentItem.code);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const currentUser = useAuth();

  const sendCode = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:9000/executeItBastard", {
        code: codeText,
        lang: language,
        input: input,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.output);
        setOutput(response.data.output);
      });
  };

  useEffect(() => {

    console.log("From chat: ", currentItem)
    setCodeText(currentItem.code)

  }, [currentItem])

  const onChange = (new_value) => {
    console.log("change", new_value);
    setCodeText(new_value);
  };

  const saveFile = async () => {
    console.log(codeText)
    console.log(currentUser);
    try { createFile(currentUser.email, currentItem.code, currentItem.name); }
    catch (e) {
      alert(e);
    }
  }

  const deleteCode = () => {
    try { deleteFile(currentUser.email, currentItem.name) }
    catch (e) {
      alert(e);
    }
  }


  const handleChange = (e) => {
    setLanguage(e.target.value);
    console.log("languages: ", language);
  }

  return (
    <div className="chat">
      <div className="chat__header">

        <div className="chat__headerInfo">
          <input className="title" value={currentItem?.name || ""} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}></input>
          {/* <p>Last seen at...</p> */}
        </div>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Languge</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem value={"python3"}>Python</MenuItem>
              <MenuItem value={"cpp17"}>C++</MenuItem>
              <MenuItem value={"java"}>Java</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="chat__headerRight">
          <IconButton>
            <SaveIcon onClick={() => {
              saveFile();
            }} />
          </IconButton>
          <IconButton>
            <PlayArrowIcon onClick={sendCode} />
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={deleteCode} />
          </IconButton>
        </div>
      </div>

      <div className="yashpatel">
        <AceEditor
          mode="java"
          theme="github"
          value={codeText}
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
