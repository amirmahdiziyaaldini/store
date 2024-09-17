import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';

export default function ProtectedRoute() {
	const { currentUser } = useAuth();

	return currentUser ? <Outlet /> : <Navigate to="/Login" />;
}
