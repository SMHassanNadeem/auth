import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { global } from "./global-context"

import { db } from "./firebase"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, where, query } from "firebase/firestore"

export default function Home() {
    const [editValues, setEditValues] = useState({});
    const [newname, setName] = useState("")
    const [newprice, setPrice] = useState("")
    const [newproduct, setProduct] = useState("")

    const { uid, setUid } = useContext(global)

    const [user, setUser] = useState([])
    const collectionRef = collection(db, "test1")
    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (userAuth) => {
            if (!userAuth) {
                setUser([]);
                setUid("");
                return;
            }
            setUid(userAuth.uid);

            const q = query(
                collection(db, "test1"),
                where("ownerId", "==", userAuth.uid)
            );
            const unsubSnap = onSnapshot(q, (snapshot) => {
                setUser(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }, console.error);

            // cleanup snapshot when user logs out
            return unsubSnap;
        });

        return unsubAuth;
    }, []);


    const deleteUser = async (id) => {
        const userDoc = doc(db, "test1", id)
        await deleteDoc(userDoc)
    }

    const updateUser = async (id,newName) => {
        const userDoc = doc(db, "test1", id)
        await updateDoc(userDoc, { name: newName })
    }

    const signout = async () => {
        try {
            await signOut(auth)
            setUid("");
            localStorage.removeItem("uid");
            navigate('/login')
        }
        catch (e) {
            console.log(e)
        }
    }
    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>Home</h1>
                <button style={{ height: '50px', }} onClick={signout}>Sign out</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder='Name...' value={newname} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder='Price...' value={newprice} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder='Product...' value={newproduct} onChange={(e) => setProduct(e.target.value)} />
                <button onClick={
                    async () => {
                        try {
                            if (!auth.currentUser) {
                                alert("Please wait until you're authenticated");
                                return;
                            }
                            await addDoc(collection(db, "test1"), {
                                name: newname,
                                price: newprice,
                                product: newproduct,
                                ownerId: auth.currentUser.uid
                            })
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }}>Save</button>
            </div>
            <ul>
                {user.map(u => (
                    <div key={u.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <li>{u.name}</li>
                        <button onClick={() => deleteUser(u.id)}>Delete</button>

                        <input type="text" value={editValues[u.id] ?? ""} onChange={(e) => setEditValues({ ...editValues, [u.id]: e.target.value })} />
                        <button onClick={() => updateUser(u.id, editValues[u.id])}>Update</button>
                    </div>
                ))}
            </ul >
        </>
    )
}