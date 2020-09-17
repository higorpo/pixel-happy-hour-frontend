import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Game from './pages/Game';
import Auth from './pages/Auth';

function App() {
	// Remove todos os dados armazenados pelo game antes do usuário sair
	window.onbeforeunload = function () {
		sessionStorage.removeItem('playername');
		return '';
	};

	return (
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
	);
}

export default App;
