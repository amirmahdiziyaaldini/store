import Helmet from '../components/Helmet/Helmet';
import CommoSection from '../components/Ui/CommoSection';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products, { productsTyps } from '../assets/data/products';
import '../style/Product_Details.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ProductsList from '../components/Ui/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slicees/cartSlicees';
import { toast } from 'react-toastify';

const ProductDetails = () => {
	const [rating, setRating] = useState<null | number>(null);

	const [tab, setTab] = useState<string>('desc');
	const { id } = useParams();
	const product: productsTyps | undefined = products.find(
		(item) => item.id === id
	);

	const {
		imgUrl,
		productName,
		price,
		avgRating,
		shortDesc,
		reviews,
		description,
		category,
	} = product!;

	const ratingProduct = products.filter((item) => item.category === category);

	// redux

	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id,
				image: imgUrl,
				productName,
				price,
			})
		);

		toast.success('Product added successfully');
	};

	const reviewUser = useRef<HTMLInputElement>(null);
	const reviewMsg = useRef<HTMLTextAreaElement>(null);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (reviewUser.current && reviewMsg.current) {
			const reviewUserName = reviewUser.current.value;
			const reviewUserMsg = reviewMsg.current.value;

			const reviewob = {
				userName: reviewUserName,
				text: reviewUserMsg,
				rating,
			};
			console.log(reviewob);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [product]);
	return (
		<Helmet title={productName}>
			<CommoSection title={productName} />

			<section className="pt-0">
				<Container>
					<Row>
						<Col lg="6">
							<img src={imgUrl} alt="" />
						</Col>
						<Col lg="6">
							<div className="product__datalis">
								<h2>{productName}</h2>
								<div className="product__rating d-flex align-items-center gap-5 mb-3">
									<div>
										<span onClick={() => setRating(1)}>
											<i className="ri-star-fill"></i>
										</span>
										<span onClick={() => setRating(2)}>
											<i className="ri-star-fill"></i>
										</span>
										<span onClick={() => setRating(3)}>
											<i className="ri-star-fill"></i>
										</span>
										<span onClick={() => setRating(4)}>
											<i className="ri-star-fill"></i>
										</span>
										<span onClick={() => setRating(5)}>
											<i className="ri-star-half-fill"></i>
										</span>
									</div>
									<p>
										(<span>{avgRating}</span>Rating)
									</p>
								</div>

								<div className="d-flex align-items-center gap-5">
									<span className="product__price">${price}</span>
									<span>Category : {category.toUpperCase()}</span>
								</div>
								<p className="mt-3">{shortDesc}</p>

								<motion.button
									whileTap={{ scale: 1.2 }}
									className="buy__btn"
									onClick={addToCart}
								>
									Add to Cart
								</motion.button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<Container>
					<Row>
						<Col lg="12">
							<div className="tab__wrapper d-flex align-items-center gap-5">
								<h6
									className={`${tab === 'desc' ? 'active__tab' : ''}`}
									onClick={() => setTab('desc')}
								>
									Description
								</h6>
								<h6
									className={`${tab === 'rev' ? 'active__tab' : ''}`}
									onClick={() => setTab('rev')}
								>
									Reviews({reviews.length})
								</h6>
							</div>
							{tab === 'desc' ? (
								<div className="tab__content mt-5">
									<p>{description}</p>
								</div>
							) : (
								<div className="product__reviews mt-5">
									<div className="product__wrapper">
										<ul>
											{reviews.map((item, index) => (
												<li key={index} className="mb-4">
													<h6>Jhon Doe</h6>
													<span> {item.rating}(reviews)</span>
													<p>{item.text}</p>
												</li>
											))}
										</ul>
										<div className="reviews__from">
											<h4>Leave your experience</h4>

											<form action="" onSubmit={submitHandler}>
												<div className="from__group">
													<input
														type="text"
														placeholder="Enter name"
														ref={reviewUser}
														required
													/>
												</div>

												<div className="from__group d-flex align-items-center gap-5 reviews__group">
													<motion.span
														whileTap={{ scale: 0.2 }}
														onClick={() => setRating(1)}
													>
														1<i className="ri-star-fill"></i>
													</motion.span>
													<motion.span
														whileTap={{ scale: 0.2 }}
														onClick={() => setRating(2)}
													>
														2<i className="ri-star-fill"></i>
													</motion.span>
													<motion.span
														whileTap={{ scale: 0.2 }}
														onClick={() => setRating(3)}
													>
														3<i className="ri-star-fill"></i>
													</motion.span>
													<motion.span
														whileTap={{ scale: 0.2 }}
														onClick={() => setRating(4)}
													>
														4<i className="ri-star-fill"></i>
													</motion.span>
													<motion.span
														whileTap={{ scale: 0.2 }}
														onClick={() => setRating(5)}
													>
														5<i className="ri-star-fill"></i>
													</motion.span>
												</div>

												<div className="from__group">
													<textarea
														ref={reviewMsg}
														rows={4}
														placeholder="Review Message..."
														required
													/>
												</div>
												<motion.button
													whileTap={{ scale: 1.2 }}
													type="submit"
													className="buy__btn"
												>
													Submit
												</motion.button>
											</form>
										</div>
									</div>
								</div>
							)}
						</Col>

						<Col lg="12">
							<h2 className="related__title mt-5">You might also like</h2>
						</Col>
						<ProductsList data={ratingProduct} />
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default ProductDetails;
