import { onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { authFirebase } from '../firebase.config';

type UserType = {
	displayName?: string;
	email?: string;
	photoURL?: string;
	uid?: string;
};

export default function useAuth() {
	const [currentUser, setCurrentUser] = useState<UserType>({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
			if (user) {
				// Mapping Firebase User object to UserType
				const mappedUser: UserType = {
					displayName: user.displayName || '',
					email: user.email || '',
					photoURL: user.photoURL || '',
					uid: user.uid,
				};
				setCurrentUser(mappedUser);
			} else {
				setCurrentUser({});
			}
		});

		return () => unsubscribe(); // Clean up the listener
	}, []);

	return { currentUser };
}
