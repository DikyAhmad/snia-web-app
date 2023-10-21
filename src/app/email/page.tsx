'use client';
'use strict';
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function EmailPage() {
    const DynamicEmail = dynamic(() => import('./components/emailpage'), {
        ssr: false,
        loading: () => 
        <main className="flex min-h-screen flex-col items-center pt-24">
            <CircularProgress color="success" className="py-48"/>
        </main>
    })

    return <DynamicEmail />
}