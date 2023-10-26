'use client'
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export default function FormEmail({ idUser }: { idUser: any}){

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [userId, setUserId] = useState("");

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const handleSignIn = async () => {
        try {
        await googleSignIn();
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const uid = currentUser.uid
                setUserId(uid.toString())
            }
        });
        return () => unsubscribe();
    }, [user]);
    
    function pushId(){
        idUser(userId)
    }

    pushId()
    
    return (
        <main className="m-auto">
            <Button variant="outlined" color="success" onClick={handleSignIn} className="px-16 py-8 text-2xl my-32">Login</Button>
        </main>
    )
}