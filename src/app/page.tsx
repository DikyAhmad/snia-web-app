'use client';
'use strict';
import dynamic from 'next/dynamic'

export default function Home() {
    const DynamicHeader = dynamic(() => import('./home'), {
        loading: () => <p>Loading...</p>,
    })

    return <DynamicHeader />
}