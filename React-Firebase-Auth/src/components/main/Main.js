import { useState, useEffect } from 'react'
import { getallDocs, useAuth } from '../../firebase';
import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import "./Main.css";

const Main = () => {
	const [currentCode, setCurrentCode] = useState("");
	const [allCodes, setAllCodes] = useState([])
	const [currentItem, setCurrentItem] = useState("")
	const currentUser = useAuth();


	const [data, setData] = useState([{
		code: "print(1)",
		name: "1"
	}, {
		code: "print(2)",
		name: "2"
	}])

	function getdocs() {
		try {
			return getallDocs("yashp@gmail.com")
		}
		catch (e) {
			alert(e);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await getallDocs("yashp@gmail.com");
			console.log("Samkit shah", data)
			setData(data);
			setAllCodes(data)
			setCurrentItem(data[0])
		}
		fetchData();
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
