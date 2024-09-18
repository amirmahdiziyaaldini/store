import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { authFirebase } from '../firebase.config';

export default function useAuth() {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser({});
			}
		});

		return () => unsubscribe(); // برای پاک کردن listener
	}, []); // اضافه کردن آرایه خالی برای اجرا یک بار

	return { currentUser };
}
