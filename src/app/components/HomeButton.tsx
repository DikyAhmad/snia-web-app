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
                setUserId(currentUser.uid.toString())
            }
        });
        idUser(userId)
        return () => unsubscribe();
    }, [user]);
    
    return (
         <main className="flex min-h-screen flex-col items-center py-64">
            <Button variant="outlined" color="success" onClick={handleSignIn} className="px-24 py-8 text-2xl">Login</Button>
        </main>
    )
}