import { useState, useEffect } from 'react'
import { getallDocs, getInfo, useAuth } from '../../firebase';
import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import "./Main.css";

const Main = () => {
	const [currentCode, setCurrentCode] = useState("");
	const [allCodes, setAllCodes] = useState([])
	const [currentItem, setCurrentItem] = useState("")
	const [mailId, setMailId] = useState(null)
	const currentUser = useAuth();


	const [data, setData] = useState([{
		code: "print(1)",
		name: "1"
	}, {
		code: "print(2)",
		name: "2"
	}])

	// function getdocs() {
	// 	try {
	// 		return getallDocs("yashp@gmail.com")
	// 	}
	// 	catch (e) {
	// 		alert(e);
	// 	}
	// }

	useEffect(() => {
		const fetchData = async () => {
			const userInfo = JSON.parse(localStorage.getItem("userInfo"))
			let userEmail = ""
			console.log("mail before", mailId)
			if (userInfo) {
				setMailId(userInfo)
			} else {

				userEmail = getInfo()

				console.log("userinfor", userEmail)
				setMailId(userEmail)
			}

			console.log("mail after", mailId)
			const data = await getallDocs(userInfo || userEmail);
			setData(data);
			setAllCodes(data)
			setCurrentItem(data[0])
		}
		fetchData();
	}, [])
	return (
		<div className="app">
			<div className="app__body">
				<Sidebar allCodes={allCodes} setCurrentItem={setCurrentItem} setAllCodes={setAllCodes} />
				<Chat currentCode={currentCode} currentItem={currentItem} setCurrentItem={setCurrentItem} setAllCodes={setAllCodes} />
			</div>
		</div>
	);
}

export default Main
