import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../style/AllProducts.css';
import useGetData from '../custom-hooks/useGetData';
//delite
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AllProducts() {
	const { data, loding } = useGetData('products');

	const deleteProduts = async (id: string | undefined) => {
		if (id) {
			// بررسی اینکه id مقدار undefined نیست
			await deleteDoc(doc(db, 'products', id));
		} else {
			console.error("ID is undefined, can't delete product");
		}

		toast.success('Deletd')
	};

	console.log(data);
	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						<table className="table">
							<thead>
								<tr>
									<th>Image</th>
									<th>Title</th>
									<th>Category</th>
									<th>Price</th>
								</tr>
							</thead>

							<tbody>
								{loding ? (
									<h5>lodung...</h5>
								) : (
									data?.map((item, index) => (
										<tr key={index}>
											<td>
												<img src={item.imgUrl} alt="" />
											</td>
											<td>{item.title}</td>
											<td>{item.category}</td>
											<td>${item.price}</td>
											<td>
												<button
													className="btn btn-danger"
													onClick={() => item.id && deleteProduts(item.id)} // اطمینان از وجود id
												>
													Delete
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
