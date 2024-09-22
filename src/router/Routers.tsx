import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
// admin

import Dashboard from '../admin/dashboard';

import ProtectedRoute from './ProtecttedRoutr';
import AddProducts from '../admin/addProducts';
import AllProducts from '../admin/allProduts';

export default function Routers() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/Home" />} />
			<Route path="Home" element={<Home />} />
			<Route path="Shop" element={<Shop />} />
			<Route path="Shop/:id" element={<ProductDetails />} />
			<Route path="Cart" element={<Cart />} />

			<Route path="/*" element={<ProtectedRoute />}>
				<Route path="Checkout" element={<Checkout />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="dashboard/add-Products" element={<AddProducts />} />
				<Route path="dashboard/all-Product" element={<AllProducts />} />
			</Route>

			<Route path="Login" element={<Login />} />
			<Route path="Signup" element={<Signup />} />
		</Routes>
	);
}
