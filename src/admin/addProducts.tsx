import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { db, storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function AddProducts() {
	const [enterTitle, setEnterTitle] = useState<string>('');
	const [enterShortDesc, setEnterShortDesc] = useState<string>('');
	const [enterDescription, setEnterDescription] = useState<string>('');
	const [enterPrice, setEnterPrice] = useState<string>('');
	const [enterCategory, setEnterCategory] = useState<string>('sofa'); // Set default category
	const [enterProductImag, setEnterProductImag] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false); // For disabling the button when submitting

	const navigate = useNavigate();

	const validateForm = () => {
		if (
			!enterTitle ||
			!enterShortDesc ||
			!enterDescription ||
			!enterPrice ||
			!enterCategory ||
			!enterProductImag
		) {
			toast.error('All fields are required.');
			return false;
		}
		if (isNaN(Number(enterPrice)) || Number(enterPrice) <= 0) {
			toast.error('Please enter a valid price.');
			return false;
		}
		return true;
	};

	const addProducts = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			const storageRef = ref(
				storage,
				`productImages/${Date.now()}_${enterProductImag!.name}`
			);
			const uploadTask = uploadBytesResumable(storageRef, enterProductImag!);

			uploadTask.on(
				'state_changed',
				null,
				(error) => {
					toast.error(`Upload failed: ${error.message}`);
					setIsSubmitting(false);
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					const productData = {
						title: enterTitle,
						shortDesc: enterShortDesc,
						description: enterDescription,
						category: enterCategory,
						price: enterPrice,
						imgUrl: downloadURL,
						createdAt: new Date().toISOString(), // Track product creation time
					};

					//add firbes
					await addDoc(collection(db, 'products'), productData);
					toast.success('Product successfully added!');
					navigate('/dashboard/all-Product');
				}
			);
		} catch (error) {
			toast.error('Failed to add product. Please try again.');
			console.error('Error adding product: ', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						<h4 className="mb-5">Add Products</h4>
						<Form onSubmit={addProducts}>
							<FormGroup className="from__group">
								<span>Product Title</span>
								<input
									type="text"
									placeholder="Double sofa"
									value={enterTitle}
									onChange={(event) => setEnterTitle(event.target.value)}
								/>
							</FormGroup>

							<FormGroup className="from__group">
								<span>Short Description</span>
								<input
									type="text"
									placeholder="lorem......."
									value={enterShortDesc}
									onChange={(event) => setEnterShortDesc(event.target.value)}
								/>
							</FormGroup>

							<FormGroup className="from__group">
								<span>Description</span>
								<input
									type="text"
									placeholder="Description...."
									value={enterDescription}
									onChange={(event) => setEnterDescription(event.target.value)}
								/>
							</FormGroup>

							<div className="d-flex align-items-center justify-content-between gap-5">
								<FormGroup className="from__group">
									<span>Price</span>
									<input
										type="number"
										placeholder="$100"
										value={enterPrice}
										onChange={(event) => setEnterPrice(event.target.value)}
									/>
								</FormGroup>

								<FormGroup className="from__group w-50">
									<span>Category</span>
									<select
										className="w-100 p-2"
										value={enterCategory}
										onChange={(event) => setEnterCategory(event.target.value)}
									>
										<option value="sofa">Sofa</option>
										<option value="mobile">Mobile</option>
										<option value="chair">Chair</option>
										<option value="watch">Watch</option>
										<option value="wireless">Wireless</option>
									</select>
								</FormGroup>
							</div>

							<FormGroup className="from__group">
								<span>Product Image</span>
								<input
									type="file"
									accept="image/*"
									onChange={(event) =>
										setEnterProductImag(event.target.files?.[0] || null)
									}
								/>
							</FormGroup>

							<button
								className="buy__btn"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Adding Product...' : 'Add Product'}
							</button>
						</Form>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
