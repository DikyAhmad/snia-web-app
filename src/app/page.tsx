'use client';

import dynamic from 'next/dynamic'

export default function Page() {

    const DynamicNota = dynamic(() => import('./Home'), {
        ssr: false,
    })

    return <DynamicNota />
}