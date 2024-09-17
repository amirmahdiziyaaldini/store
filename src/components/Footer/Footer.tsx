import './footer.css';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col lg="4" md='6' className="mb-4">
						<div className="logo">
							<div>
								<h1 className="text-white">Muiltimart</h1>
							</div>
						</div>
						<p className="footer__text mt-3">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
							debitis amet exercitationem consequuntur repellendus? Maxime esse
							praesentium nobis deserunt iusto, officia ab labore ut
						</p>
					</Col>
					<Col lg="3" md='3' className="mb-4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Top Categories</h4>
							<ListGroup>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'#'}> Mobile Phones</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'#'}> Modern sofa</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'#'}>Arm Chair</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'#'}>Smart Watches</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg="2" md='3' className="mb-4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Useful Links</h4>
							<ListGroup>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'/Shop'}>Shop</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'/Cart'}>Cart</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'/Login'}>Login</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to={'#'}>Privacy Policy</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg="3"  md='3' className="mb-4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Contact</h4>
							<ListGroup className="footer__contact">
								<ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
									<span>
										<i className="ri-map-pin-line"></i>
									</span>
									<p>123 , ZindaBazar , Sylhet , Bangladesh</p>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
									<span>
										<i className="ri-phone-line"></i>
									</span>
									<p>+916967666</p>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
									<span>
										<i className="ri-mail-check-line"></i>
									</span>
									<p>amirmahdiziyaaldini@gmail.com</p>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>

					<Col lg="12" >
						<p className=" footer__copyright">CopyRight{year} developed by</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
