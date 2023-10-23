'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function Page() {
    
    const DynamicHome = dynamic(() => import('./components/Home'))
    const DynamicButton = dynamic(() => import('./components/HomeButton'))
    const [id, setId] = useState("")

    return (
        <main>
            {id === "JOdGNYHekQO2bUZVYZTZ94ksG2s1" ? (
                <DynamicHome/>
            ): (
                <DynamicButton idUser={setId}/>
            )}
        </main>
    )
}