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
    const [id, setId] = useState("")

    return (
        <main className="flex min-h-screen flex-col lg:px-96">
            {id === "JOdGNYHekQO2bUZVYZTZ94ksG2s1" || id === "gvILTVngNAQmp8MIfQ8ExzkAwax1"? (
                <DynamicHome/>
            ): (
                <DynamicButton idUser={setId}/>
            )}
        </main>
    )
}