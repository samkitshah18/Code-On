import React from 'react'
import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import "./Main.css";

const Main = () => {
	return (
		<div className="app">
		  <div className="app__body">
			<Sidebar />
			<Chat/>
		  </div>
		</div>
	  );
}

export default Main
