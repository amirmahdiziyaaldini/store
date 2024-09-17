import Helmet from '../components/Helmet/Helmet';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../style/Login.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authFirebase } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';

const Signup = () => {
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleonSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!file) {
			toast.error('Please upload a file');
			return;
		}
		setLoading(true);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				authFirebase,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user)

			const storageRef = ref(storage, `images/${Date.now()}_${userName}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				() => {
					// Handle progress (optional)
				},
				(error) => {
					toast.error(error.message);
					setLoading(false);
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						await updateProfile(user, {
							displayName: userName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, 'user', user.uid), {
							uid: user.uid,
							displayName: userName,
							email,
							photoURL: downloadURL,
						});
						toast.success('Account created successfully!');
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					} catch (error) {
						toast.error('Failed to update profile or save user data.');
					} finally {
						setLoading(false);
					}
				}
			);
		} catch (error: unknown) {
			toast.error('Something went wrong');
			if (error instanceof Error) {
				console.error('Error during signup:', error.message);
			} else {
				console.error('An unexpected error occurred.');
			}
			setLoading(false);
		}
	};

	return (
		<Helmet title="Signup">
			<section>
				<Container>
					<Row>
						<Col lg="6" className="m-auto text-center">
							<h3 className="fw-bold fs-4 mb-4">Signup</h3>
							<Form className="auto__form" onSubmit={handleonSubmit}>
								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="UserName"
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</FormGroup>
								<FormGroup className="form__group">
									<input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</FormGroup>
								<FormGroup className="form__group">
									<input
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</FormGroup>
								<FormGroup className="form__group">
									<input
										type="file"
										onChange={(e) => setFile(e.target.files?.[0] || null)}
									/>
								</FormGroup>
								<button
									type="submit"
									className="buy__btn auth_btn"
									disabled={loading}
								>
									{loading ? 'Creating Account...' : 'Create an Account'}
								</button>
								<p className="mt-4">
									Already have an account? <Link to={'/Login'}>Login</Link>
								</p>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Signup;
