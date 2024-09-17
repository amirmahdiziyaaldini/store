import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommoSection from '../components/Ui/CommoSection';
import { Col, Container, Row } from 'reactstrap';
import '../style/shop.css';
import products, { productsTyps } from '../assets/data/products';
import ProductsList from '../components/Ui/ProductsList';

const Shop = () => {
	const [productsData, setProductsData] = useState<productsTyps[]>(products);

	const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const filterValue = event.target.value;
		if (filterValue === 'sofa') {
			const filterdproducts = products.filter(
				(item) => item.category === 'sofa'
			);
			setProductsData(filterdproducts);
		}
		if (filterValue === 'mobile') {
			const filterdproducts = products.filter(
				(item) => item.category === 'mobile'
			);
			setProductsData(filterdproducts);
		}
		if (filterValue === 'chair') {
			const filterChair = products.filter((item) => item.category === 'chair');
			setProductsData(filterChair);
		}
		if (filterValue === 'watch') {
			const filterWatch = products.filter((item) => item.category === 'watch');
			setProductsData(filterWatch);
		}
		if (filterValue === 'wireless') {
			const filteWireless = products.filter(
				(item) => item.category === 'wireless'
			);

			setProductsData(filteWireless);
		}
		if (filterValue === 'aulto') {
			setProductsData(products);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const seachTerm = e.target.value;
		const searchedProducts = products.filter((item) =>
			item.productName.toLowerCase().includes(seachTerm.toLowerCase())
		);
		setProductsData(searchedProducts);
	};

	return (
		<Helmet title={'Shop'}>
			<CommoSection title="Products" />

			<section>
				<Container>
					<Row>
						<Col lg="3" md="6" className="mb-3">
							<div className="filter__widget">
								<select onChange={handleFilter}>
									<option value="aulto">Filter By Category</option>
									<option value="sofa">Sofa</option>
									<option value="mobile">Mobile</option>
									<option value="chair">Chair</option>
									<option value="watch">Watch</option>
									<option value="wireless">Wireless</option>
								</select>
							</div>
						</Col>
						<Col lg="3" md="6" className="mb-3 text-end">
							<div className="filter__widget">
								<select>
									<option>Sort By</option>
									<option value="ascending">Ascending</option>
									<option value="descending">Descending</option>
								</select>
							</div>
						</Col>
						<Col lg="6" md="12">
							<div className="search__box">
								<input
									type="text"
									placeholder="Search........"
									onChange={handleSearch}
								/>
								<span>
									<i className="ri-search-line"></i>
								</span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section className="pt-0">
				<Container>
					<Row>
						{productsData.length === 0 ? (
							<h1 className="text-center fs-4">No product are foind !</h1>
						) : (
							<ProductsList data={productsData} />
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Shop;
