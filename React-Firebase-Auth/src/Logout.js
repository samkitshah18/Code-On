import React from 'react'
import { logout } from './firebase'

const Logout = () => {
	return (
		<div>
			<button onClick={logout} />
		</div>
	)
}

export default Logout
