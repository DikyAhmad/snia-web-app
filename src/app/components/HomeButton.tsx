'use client'
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { Alert, Stack, Box } from '@mui/material';
import Link from "next/link";
import {
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export default function LoginPage(){

    const [alertState, setAlertState] = useState(true)
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
                localStorage.setItem('auth_uid', currentUser.uid.toString())
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => { 
        let authid = localStorage.getItem("auth_uid") 
        if(authid !== null) {
            triggerAlert()
        } 
    },[],)

    const triggerAlert = () => {
        setAlertState(false)
        
        setTimeout(() => {
            setAlertState(true)
        }, 3000);
    }
    
    return (
        <main className="m-auto">
            <Stack spacing={2}>
                <Alert severity="warning" className="mt-4" hidden={alertState}>Anda Tidak Memiliki Akses ke Apikasi Ini!</Alert>
                <Button variant="outlined" color="success" onClick={handleSignIn} className="px-16 py-8 text-2xl">Login</Button>
            </Stack>
        </main>
    )
}