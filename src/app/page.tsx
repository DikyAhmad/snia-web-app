'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const router = useRouter()
    
    const MainApp = dynamic(() => import('./app/page'), {
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
        let authid = localStorage.getItem("auth_uid") 
        const loadUid = () => {
            setAuthUid(localStorage.getItem("auth_uid") as string)
        }
        loadUid()
    },[],)

    return (
        <main className="flex min-h-screen flex-col items-center">
            {authUid !== null? 
                <MainApp/>: <LoginPage/>
            }
        </main>
    )
}