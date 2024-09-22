import { Container, Row } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import '../style/admin-nav.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function AdminNav() {
	const { currentUser } = useAuth();

	type admin_navtyps = {
		display: string;
		path: string;
	};
	const admin_nav: admin_navtyps[] = [
		{
			display: 'Dashboard',
			path: '/dashboard',
		},
		{
			display: 'All-Product',
			path: '/dashboard/add-Products',
		},
		{
			display: 'Orders',
			path: '/dashboard/orders',
		},
		{
			display: 'Users',
			path: '/dashboard/users',
		},
	];

	return (
		<>
			<header className="admin__header">
				<div className="admin__nav-top">
					<Container>
						<div className="admin__nav-wrapper-top">
							<div className="logo">
								<h2>Multimart</h2>
							</div>

							<div className="search__box">
								<input type="text" placeholder="Search..." />
								<span>
									<i className="ri-search-line"></i>
								</span>
							</div>

							<div className="admin__nav-top-right">
								<motion.span whileHover={{ scale: 1.2 }}>
									<i className="ri-notification-3-line"></i>
								</motion.span>
								<motion.span whileHover={{ scale: 1.2 }}>
									<i className="ri-settings-2-line"></i>
								</motion.span>
								<motion.img
									whileTap={{ scale: 1.2 }}
									src={currentUser.photoURL}
									alt=""
								/>
							</div>
						</div>
					</Container>
				</div>
			</header>

			<section className="admin__menu p-0">
				<Container>
					<Row>
						<div className="admin__navigetrton">
							<ul className="admin__menu-list">
								{admin_nav.map((item, index) => (
									<li className="admin__menu-item" key={index}>
										<NavLink
											className={(navClass) =>
												navClass.isActive ? 'active__admin-menu' : ''
											}
											to={item.path}
										>
											{item.display}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					</Row>
				</Container>
			</section>
		</>
	);
}
