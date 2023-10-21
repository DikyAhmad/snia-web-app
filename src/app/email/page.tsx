'use client';
'use strict';
import dynamic from 'next/dynamic'

export default function EmailPage() {
    const DynamicEmail = dynamic(() => import('./components/emailpage'), {
        loading: () => 
        <main className="flex min-h-screen flex-col items-center pt-24">
            <p>Loading Email Form...</p>
        </main>
    })

    return <DynamicEmail />
}