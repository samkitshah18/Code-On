import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signup, login, logout, useAuth } from "./firebase";
import Login from './components/login/Login';
import Logout from './Logout';
import Main from './components/main/Main';


export default function App() {
  return (
    <div id="main">

      <BrowserRouter>
        <Routes>
          <Route path="/login" caseSensitive={false} element={<Login />}></Route>
          <Route path="/logout" caseSensitive={false} element={<Logout />}></Route>
          <Route path="/code-on" element={<Main />} />
        </Routes>
      </BrowserRouter>



    </div>
  );
}