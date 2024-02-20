'use client';
'use strict';
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const EmailPage = dynamic(() => import('./components/EmailPage'), {
        loading: () => 
        <main className="flex min-h-screen flex-col lg:px-96">
            <main className="m-auto">
                <CircularProgress color="success"/>
            </main>
        </main>
    })

    return <EmailPage />
}