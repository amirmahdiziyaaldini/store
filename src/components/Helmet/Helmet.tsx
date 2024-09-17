import React from 'react';

interface Helmettype {
	children: React.ReactNode;
	title: string;
}

export default function Helmet(props: Helmettype) {
	document.title = 'Store-' + props.title;
	return <div className='w-100'>{props.children}</div>;
}
