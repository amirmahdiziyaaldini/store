import React from 'react';
import { Container } from 'reactstrap';
import '../../style/common__section.css';

export default function CommoSection({ title }: { title: string }) {
	return (
		<section className="common__section">
			<Container className="text_center">
				<h1>{title}</h1>
			</Container>
		</section>
	);
}
