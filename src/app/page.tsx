'use client';
'use strict';

import React, { useState } from 'react';
import FormEmail from './FormEmail'
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* <FormEmail /> */}
      <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">SNIA PHOTO APP</p>
      <button href="/email"className="btn btn-outline btn-success text-center w-full max-w-xs my-4"><Link className="w-full max-w-xs" href="/email">Email</Link></button>
      <button href="/email" className="btn btn-outline btn-warning text-center w-full max-w-xs my-4"><Link className="w-full max-w-xs" href="/nota">Nota</Link></button>
      <Analytics />
    </main>
  )
}
