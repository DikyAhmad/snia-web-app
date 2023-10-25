'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function Page() {
    
    const DynamicHome = dynamic(() => import('./components/Home'))
    const DynamicButton = dynamic(() => import('./components/HomeButton'))
    const [id, setId] = useState("")

    return (
        <main className="flex min-h-screen flex-col items-center pt-16">
            {id === "JOdGNYHekQO2bUZVYZTZ94ksG2s1" || id === "gvILTVngNAQmp8MIfQ8ExzkAwax1"? (
                <DynamicHome/>
            ): (
                <DynamicButton idUser={setId}/>
            )}
        </main>
    )
}