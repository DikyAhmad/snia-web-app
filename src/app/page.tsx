'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const Main = dynamic(() => import('./components/MainApp'), {
        loading: () => 
        <main className="m-auto">
            <CircularProgress color="success"/>
        </main>
    })

    const LoginPage = dynamic(() => import('./login/LoginPage'), {
        loading: () => 
        <main className="m-auto">
            <CircularProgress color="success"/>
        </main>
    })
   
    const [authUid, setAuthUid] = useState("")
    
    useEffect(() => { 
        const loadUid = () => {
            setAuthUid(localStorage.getItem("auth_uid") as string)
        }
        loadUid()
    },[],)

    return (
        <main className="flex min-h-screen flex-col lg:px-96">
            {authUid !== null? 
                <Main/>: <LoginPage/>
            }
        </main>
    )
}