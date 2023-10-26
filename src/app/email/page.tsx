'use client';
'use strict';
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function EmailPage() {
    const DynamicEmail = dynamic(() => import('./components/emailpage'), {
        loading: () => 
        <main className="flex min-h-screen flex-col">
            <CircularProgress color="success"/>
        </main>
    })

    return <DynamicEmail />
}