import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { useAuth } from '../../firebase';
import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import "./Main.css";

const Main = () => {
	const [currentCode, setCurrentCode] = useState("");
	const [allCodes, setAllCodes] = useState([])
	const [currentItem, setCurrentItem] = useState("")
	const [currentUser, setCurrentUser] = useState(null)

	console.log("out: ", currentUser);
	const data = [{
		code: "print(1)",
		name: "1"
	}, {
		code: "print(2)",
		name: "2"
	}]

	function getdocs() {
		try {
			// console.log("currentuser", currentUser)
			// console.log("user email: ", currentUser.email)
			return getDocs("yashp@gmail.com")
		}
		catch (e) {
			alert(e);
		}
	}

	useEffect(() => {

		getdocs()
		setAllCodes(data)
		setCurrentItem(data[0])
	}, [])
	return (
		<div className="app">
			<div className="app__body">
				<Sidebar allCodes={allCodes} setCurrentItem={setCurrentItem} />
				<Chat currentCode={currentCode} currentItem={currentItem} setCurrentItem={setCurrentItem} />
			</div>
		</div>
	);
}

export default Main
