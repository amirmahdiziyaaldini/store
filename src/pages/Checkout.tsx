import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import CommoSection from '../components/Ui/CommoSection';
import '../style/Checkout.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const Checkout = () => {
	const totalQty = useSelector((stata: RootState) => stata.cart.totalQuantity);
	const totalAmount = useSelector((stata: RootState) => stata.cart.totalAmount);
	return (
		<Helmet title="Checkout">
			<CommoSection title="Checkout" />

			<section>
				<Container>
					<Row>
						<Col lg="8">
							<h6 className="mb-4 fw-bold">Billing Information</h6>
							<Form billing__form>
								<FormGroup className="form__group">
									<input type="text" placeholder="Enter your name" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="email" placeholder="Enter your email" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="number" placeholder="Phone number" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Street address" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="City" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Postal code" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Country" />
								</FormGroup>
							</Form>
						</Col>
						<Col lg="4">
							<div className="checkout__cart">
								<h6>
									Total Qty: <span>{totalQty} items</span>
								</h6>
								<h6>
									Subtoatl : <span>${totalAmount}</span>
								</h6>
								<h6>
									Shipping : <span>$0</span>
								</h6>
								<h6>
									<span>
										Shipping : <br />
										Free shipping
									</span>
								</h6>
								<h4>
									Total Qty: <span>${totalAmount}</span>
								</h4>
								<button className="buy__btn auth_btn w-100">
									Plac an order
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};
