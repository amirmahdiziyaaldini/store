import React from 'react';
import Routers from '../../router/Routers';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout() {
	return (
		<>
			<Header />
			<div>
				<Routers />
			</div>
			<Footer />
		</>
	);
}
