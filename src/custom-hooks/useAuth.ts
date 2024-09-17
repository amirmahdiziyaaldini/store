import { onAuthStateChanged, User } from 'firebase/auth';
import  { useEffect, useState } from 'react';
import { authFirebase } from '../firebase.config';

export default function useAuth() {
 const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(authFirebase, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        })
    })

	return { currentUser };
}
