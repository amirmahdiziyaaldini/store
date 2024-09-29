import { useEffect, useState, useMemo } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

// تعریف نوع برای داده‌های مورد استفاده
interface DocumentData {
	id: string;
	[key: string]: unknown; // مشخص کردن کلیدهای متغیر با انواع داده مختلف
	title?: string;
	shortDesc?: string;
	description?: string;
	category?: string;
	price?: number;
	imgUrl?: string;
	//user
	displayName?: string;
	email?: string;
	photoURL?: string;
	uid?:string
}

export default function useGetData(collectinName: string) {
	const [data, setData] = useState<DocumentData[]>([]); // مشخص کردن نوع داده‌ها به صورت آرایه‌ای از DocumentData
	const [error, setError] = useState<string | null>(null); // اضافه کردن مدیریت خطا
	const [loding, setloding] = useState<boolean>(true);
	// استفاده از useMemo برای جلوگیری از ایجاد مداوم collectinRef
	const collectinRef = useMemo(
		() => collection(db, collectinName),
		[collectinName]
	);

	useEffect(() => {
		const getData = async () => {
			await onSnapshot(collectinRef, (snapshot) => {
				setData(
					snapshot.docs.map(
						(doc) => ({ ...doc.data(), id: doc.id } as DocumentData),
						setloding(false)
					)
				);
			});
		};
		setError('ff')
		// const getData = async () => {
		// 	try {
		// 		const data = await getDocs(collectinRef);
		// 		setData(
		// 			data.docs.map(
		// 				(doc) => ({ ...doc.data(), id: doc.id } as DocumentData),
		// 				setloding(false)
		// 			)
		// 		); // اطمینان از تایپ درست
		// 	} catch (err) {
		// 		setError('Error fetching data'); // مدیریت خطا
		// 		console.error(err);
		// 	}
		// };

		getData();
	}, []);

	return { data, error, loding };
}
