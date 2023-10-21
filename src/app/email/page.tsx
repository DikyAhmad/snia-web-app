'use client';
'use strict';
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function EmailPage() {
    const DynamicEmail = dynamic(() => import('./components/emailpage'), {
        loading: () => 
        <main className="flex min-h-screen flex-col items-center pt-24">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color="success" className="py-52"/>
            </Box>
        </main>
    })

    return <DynamicEmail />
}