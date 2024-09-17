import Helmet from '../components/Helmet/Helmet';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';
import { useState } from 'react';
import { authFirebase } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		const valueinput = event.target.value;
		setEmail(valueinput);
	};
	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const valueinput = event.target.value;
		setPassword(valueinput);
	};

	const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			const userCredential = await signInWithEmailAndPassword(
				authFirebase,
				email,
				password
			);
			const user = userCredential.user;
			toast.success('Successfully logged in');
			setLoading(false);
			navigate('/Checkout');
			console.log(user);
		} catch (error) {
			setLoading(false);
			toast.error('Failed to update profile or save user data.');
			throw error;
		}
	};

	return (
		<Helmet title="Login">
			<section>
				<Container>
					<Row>
						{loading ? (
							<Col lg="12" className="text-center">
								<h5 className='fw-bold'>Lodeing......</h5>
							</Col>
						) : (
							<Col lg="6" className="m-auto text-center">
								<h3 className="fw-bold fs-4 mb-4">Login</h3>

								<Form className="auto__form" onSubmit={signIn}>
									<FormGroup className="form__group">
										<input
											type="email"
											placeholder="Enter your email"
											value={email}
											onChange={handleEmail}
										/>
									</FormGroup>

									<FormGroup className="form__group">
										<input
											type="password"
											placeholder="Enter your password"
											value={password}
											onChange={handlePassword}
										/>
									</FormGroup>

									<button
										type="submit"
								
										className="buy__btn auth_btn w-50"
									>
										Login
									</button>
									<p className="mt-4">
										Don`t have an account?
										<Link to={'/Signup'}> Create an account</Link>
									</p>
								</Form>
							</Col>
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Login;
