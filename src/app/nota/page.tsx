'use client';
'use strict';
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function NotaPage() {

    const DynamicNota = dynamic(() => import('./components/NotaForm'), {
        loading: () => 
        <main className="flex min-h-screen flex-col items-center pt-24">
            <CircularProgress color="success" className="py-32"/>
        </main>
    })

    return <DynamicNota />
}