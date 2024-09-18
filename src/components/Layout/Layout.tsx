import React from 'react';
import Routers from '../../router/Routers';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import AdminNav from '../../admin/adminNav';

export default function Layout() {
	const location = useLocation();
	return (
		<>
			{location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />}
			<div>
				<Routers />
			</div>
			<Footer />
		</>
	);
}
