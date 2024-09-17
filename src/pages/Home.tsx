import Helmet from '../components/Helmet/Helmet';
import { Col, Container, Row } from 'reactstrap';
import heroIMg from '../assets/images/hero-img.png';
import '../style/home.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../Services/Services';
import ProductsList from '../components/Ui/ProductsList';
import products, { productsTyps } from '../assets/data/products';
import { useEffect, useState } from 'react';

import counterImg from '../assets/images/counter-timer-img.png';
import Clock from '../components/Ui/Clock';

export default function Home() {
	const [TrendingProducts, setTrendingProducts] =
		useState<productsTyps[]>(products);

	const [BestSales, setBestSales] = useState<productsTyps[]>(products);

	const [MobaleProducts, setMobaleProducts] =
		useState<productsTyps[]>(products);

	const [wirelessProducts, setwirelessProducts] =
		useState<productsTyps[]>(products);

	const [watchProducts, setWatchProducts] = useState<productsTyps[]>(products);

	useEffect(() => {
		const filterTrendingProducts = products.filter(
			(item) => item.category === 'chair'
		);
		const filterBestSales = products.filter((item) => item.category === 'sofa');

		const filtermobile = products.filter((item) => item.category === 'mobile');

		const filterwirelessProducts = products.filter(
			(item) => item.category === 'wireless'
		);

		const filterwatchProducts = products.filter(
			(item) => item.category === 'watch'
		);

		setTrendingProducts(filterTrendingProducts);
		setBestSales(filterBestSales);
		setMobaleProducts(filtermobile);
		setwirelessProducts(filterwirelessProducts);
		setWatchProducts(filterwatchProducts);
	}, []);
	const year = new Date().getFullYear();
	return (
		<Helmet title={'Home'}>
			<section className="hero__section">
				<Container>
					<Row>
						<Col lg="6" md="6" className='count__down-col'>
							<div className="hero__content">
								<p className="hero__subtitle">Trending product in {year} </p>
								<h2> make your Interior More Minimalistic 6 modern </h2>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt incidunt hic minima quod maxime voluptate molestias
								</p>
								<motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
									<Link to={'/Shop'}>Shop now</Link>
								</motion.button>
							</div>
						</Col>
						<Col lg="6" md="6">
							<div className="hero__img">
								<img src={heroIMg} alt="" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<Services />
			<section className="trending_products">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title">Trending Products</h2>
						</Col>
						<ProductsList data={TrendingProducts} />
					</Row>
				</Container>
			</section>
			<section className="best__sales">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title">Best Sales</h2>
						</Col>
						<ProductsList data={BestSales} />
					</Row>
				</Container>
			</section>
			<section className="timer__count">
				<Container>
					<Row>
						<Col lg="6" md="12">
							<div className="Clock__top-content">
								<h4 className="text-white fs-6 mb-2">Limited offers</h4>
								<h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
							</div>
							<Clock />
							<motion.button
								whileTap={{ scale: 1.1 }}
								className="but__btn store__btn"
							>
								<Link to={'/Shop'}>Visit Store</Link>
							</motion.button>
						</Col>
						<Col lg="6" md="12" className="text-end content__img">
							<img src={counterImg} alt="" />
						</Col>
					</Row>
				</Container>
			</section>
			<section className="new__arrivals">
				<Container>
					<Row>
						<Col lg="12" className="text-center mb-5">
							<h2 className="section_title">New Arrivals</h2>
						</Col>
						<ProductsList data={MobaleProducts} />
						<ProductsList data={wirelessProducts} />
					</Row>
				</Container>
			</section>

			<section className="popular_Category">
				<Container>
					<Row>
						<Col lg="12" className="text-center mb-5">
							<h2 className="section_title">Popular Category</h2>
						</Col>
						<ProductsList data={watchProducts} />
					</Row>
				</Container>
			</section>
		</Helmet>
	);
}
