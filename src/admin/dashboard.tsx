import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../style/dashboard.css'
import useGetData from '../custom-hooks/useGetData';
export default function dashboard() {

// eslint-disable-next-line react-hooks/rules-of-hooks
const { data, loding } = useGetData('products');
// eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: user } = useGetData('user');
	return (
		<section>
			<Container>
				<Row>
					<Col className="lg-3">
						<div className="revenue__box">
							<h5>Total Sales</h5>
							<span>$7890</span>
						</div>
					</Col>
					<Col className="lg-3">
						<div className="Orders__box">
							<h5>Orders</h5>
							<span>$7890</span>
						</div>
					</Col>
					<Col className="lg-3">
						<div className="products__box">
							<h5>Total Products</h5>
							<span>{data.length}</span>
						</div>
					</Col>
					<Col className="lg-3">
						<div className="user__box">
							<h5>Total user</h5>
							<span>{user.length}</span>
						</div>
					</Col>
				</Row>
			</Container>
			;
		</section>
	);
}
