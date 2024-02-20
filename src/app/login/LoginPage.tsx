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
import { useRouter } from 'next/navigation'
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { getDatabase, ref, set, onValue, get, push, update} from "firebase/database";

const provider = new GoogleAuthProvider();

export default function Page(){
    return (
        <Router>
            <LoginPage/>
        </Router>
    )
}

function LoginPage(){
    const db = getDatabase()
    const router = useRouter()
    const navigate = useNavigate()
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

    const loadAdminUid = async (user_uid: any) => {
        try {
            const dbRef = ref(db, '/admin_uid');
            onValue(dbRef, (snapshot) => {
                let adminUid = [] as any
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    adminUid.push(childData)
                });

                if (adminUid.includes(user_uid)) {
                    localStorage.setItem('role', 'admin')
                } else {
                    localStorage.setItem('role', 'login')
                }
            },);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const refreshPage = () => {
            navigate(0);
        }

        const setUserUid = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // router.push(0)
                refreshPage()
                localStorage.setItem('auth_uid', currentUser.uid.toString())
                if(localStorage.getItem('role') === null){
                    loadAdminUid(currentUser.uid.toString())
                }
            }
        });
        return () => setUserUid();
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
        <Box className="m-auto">
            <Stack spacing={2}>
                <Alert severity="warning" className="mt-4" hidden={alertState}>Anda Tidak Memiliki Akses ke Apikasi Ini!</Alert>
                <Button variant="outlined" color="success" onClick={handleSignIn} className="px-16 py-8 text-2xl">Login</Button>
            </Stack>
        </Box>
    )
}