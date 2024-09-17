import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../style/Cart.css';
import CommoSection from '../components/Ui/CommoSection';
import { Col, Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
//redux
import { cartActions } from '../redux/slicees/cartSlicees';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

function Cart() {
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);
	const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

	const dispatch = useDispatch();
	const deleteItemHandler = (id: string) => {
		dispatch(cartActions.deleteItem(id));
	};

	return (
		<Helmet title={'Cart'}>
			<CommoSection title="Shopping Cart" />
			<section>
				<Container>
					<Row>
						<Col lg="9">
							{cartItems.length === 0 ? (
								<h1 className="fs-4 text-center"> NO item added to cart</h1>
							) : (
								<table className="table bordered">
									<thead>
										<tr>
											<th>Image</th>
											<th>Title</th>
											<th>Price</th>
											<th>Qty</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>
										{cartItems?.map((item, index) => (
											<tr key={index}>
												<td>
													<img src={item.imgUrl} alt={item.productName} />
												</td>
												<td>{item.productName}</td>
												<td>${item.price}</td>
												<td>{item.quantity}px</td>
												<td>
													<motion.i
														whileTap={{ scale: 1.2 }}
														onClick={() => deleteItemHandler(item.id)}
														className="ri-delete-bin-5-line"
													></motion.i>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</Col>
						<Col lg="3">
							<div>
								<h6
									className="d-flex align-items-center
								justify-content-between
								"
								>
									Subtotal
									<span className="fs-4 fw-bold">${totalAmount}</span>
								</h6>
							</div>

							<p className="fs-6 mt-2">
								taxes and shipping will calculate in checkout
							</p>
							<div>
								<button className="buy__btn w-100 mt-2">
									<Link className="w-100" to={'/Checkout'}>
										Checkout
									</Link>
								</button>
								<button className="buy__btn w-100">
									<Link to={'/Shop'}>Continue Shooping </Link>
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
}

export default Cart;
