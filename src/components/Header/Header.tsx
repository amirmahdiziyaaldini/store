import './header.css';
import { Container, Row } from 'reactstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/images/eco-logo.png';
import user_icon from '../../assets/images/user-icon.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { authFirebase } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
interface nav__LinksType {
	path: string;
	display: string;
}
const nav__Links: nav__LinksType[] = [
	{
		path: '/Home',
		display: 'Home',
	},
	{
		path: '/Shop',
		display: 'Shop',
	},
	{
		path: '/Cart',
		display: 'Cart',
	},
];

export default function Header() {
	const { currentUser } = useAuth();
	const headerUseRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	// redux
	const totalQuantitys = useSelector(
		(state: RootState) => state.cart.totalQuantity
	);

	useEffect(() => {
		const handleScroll = () => {
			if (
				document.documentElement.scrollTop > 80 ||
				document.body.scrollTop > 80
			) {
				headerUseRef.current?.classList.add('sticky__header');
			} else {
				headerUseRef.current?.classList.remove('sticky__header');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const menuToggle = () => menuRef.current?.classList.toggle('active__menu');

	const navigate = useNavigate();
	const navigateToCart = () => {
		navigate('/Cart');
	};

	const logout = () => {
		signOut(authFirebase)
			.then(() => {
				toast.success('Successfully logged in');
			})
			.catch(() => {
				toast.error('Failed to update profile or save user data.');
			});
	};

	return (
		<header className="header" ref={headerUseRef}>
			<Container>
				<Row>
					<div className="nav__wrapper">
						<div className="logo">
							<img src={logo} alt="logo" />
							<div>
								<h1>Muiltimart</h1>
							</div>
						</div>

						<div className="navigation" ref={menuRef} onClick={menuToggle}>
							<ul className="menu">
								{nav__Links.map((item, index) => (
									<li className="nav__item" key={index}>
										<NavLink
											className={(navClass) =>
												navClass.isActive ? 'nav__active' : ''
											}
											to={item.path}
										>
											{item.display}
										</NavLink>
									</li>
								))}
							</ul>
						</div>

						<div className="nav__icons">
							<span className="fav__icon" onClick={navigateToCart}>
								<i className="ri-shopping-bag-line"></i>
								<span className="badge">{totalQuantitys}</span>
							</span>
							<span className="cart__icon">
								<i className="ri-heart-3-line"></i>
								<span className="badge">6</span>
							</span>
							<div className="profile">
								<motion.img
									whileTap={{ scale: 1.2 }}
									src={currentUser?.photoURL || user_icon}
									alt=""
								/>

								<div className="profile__actions">
									{currentUser ? (
										<span onClick={logout}>Logout</span>
									) : (
										<span className="asd">
											<Link to={'/Signup'}>Signup</Link>
											<Link to={'/Login'}>Login</Link>
											<Link to={'/dashboard '}>Dashboard</Link>
										</span>
									)}
								</div>
							</div>
							<div className="mobile__menu">
								<span onClick={menuToggle}>
									<i className="ri-menu-line"></i>
								</span>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</header>
	);
}
