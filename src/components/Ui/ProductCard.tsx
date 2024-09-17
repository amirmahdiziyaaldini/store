import React from 'react';
import { motion } from 'framer-motion';
// import productImg from '../../assets/images/arm-chair-01.jpg';
import { Col } from 'reactstrap';
import '../../style/product__Card.css';
import { Link } from 'react-router-dom';
import { productsTyps } from '../../assets/data/products';
import { toast } from 'react-toastify';
// redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slicees/cartSlicees';
// type
import { AppDispatch } from '../../redux/store';
export default function ProductCard({ item }: { item: productsTyps }) {
	const dispatch = useDispatch<AppDispatch>();
	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id: item.id,
				productName: item.productName,
				image: item.imgUrl,
				price: item.price,
			})
		);
		toast.success('Product added successfully');
	};

	return (
		<Col lg="3" md="4" className="mb-2">
			<div className="product__item">
				<div className="product__img">
					<motion.img
						whileHover={{ scale: 0.9 }}
						src={`${item.imgUrl}`}
						alt=""
					/>
				</div>
				<div className="p-2 product__info">
					<h3 className="product__name">
						<Link to={`/Shop/${item.id}`}>{item.productName}</Link>
					</h3>
					<span>{item.category}</span>
				</div>
				<div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
					<span className="pricee">${item.price}</span>
					<motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
						<i className="ri-add-fill"></i>
					</motion.span>
				</div>
			</div>
		</Col>
	);
}
