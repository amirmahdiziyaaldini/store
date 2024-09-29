import { Col, Container, Row } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

export default function Users() {
    const { data, loding } = useGetData('user');

	const deleteProduts = async (id: string | undefined) => {
		if (id) {
			// بررسی اینکه id مقدار undefined نیست
			await deleteDoc(doc(db, 'user', id));
		} else {
			console.error("ID is undefined, can't delete product");
		}

		toast.success('Deletd');
	};

	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						<h4 className="fw-bold">User</h4>
					</Col>
					<table className="table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Username</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loding ? (
								<h5>loading...</h5>
							) : (
								data.map((item) => (
									<tr key={item.uid}>
										<td>
											<img src={item.photoURL} alt="" />
										</td>
										<td>{item.displayName}</td>
										<td>{item.email}</td>
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
				</Row>
			</Container>
		</section>
	);
}
