'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const DynamicHome = dynamic(() => import('./components/Home'))
    const DynamicButton = dynamic(() => import('./components/HomeButton'), {
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
            {authUid === "gvILTVngNAQmp8MIfQ8ExzkAwax1" || authUid === "JOdGNYHekQO2bUZVYZTZ94ksG2s1"? (
                <DynamicHome/>
            ): (
                <DynamicButton/>
            )}
        </main>
    )
}