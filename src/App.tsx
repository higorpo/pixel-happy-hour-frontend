import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Game from './pages/Game';
import { connection, SocketContext } from './socket-context';

function App() {
	// Remove todos os dados armazenados pelo game antes do usuário sair
	window.onbeforeunload = function () {
		sessionStorage.removeItem('playername');
		return '';
	};

	return (
		<SocketContext.Provider value={connection}>
			<BrowserRouter>
				<Route
					component={Game}
					path="/"
					exact
				/>
				<Route
					component={Auth}
					path="/identify"
				/>
			</BrowserRouter>
		</SocketContext.Provider>
	);
}

export default App;
