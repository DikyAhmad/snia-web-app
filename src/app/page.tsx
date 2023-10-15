'use client';
'use strict';

import React, { useState } from 'react';
import FormEmail from './FormEmail'
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <FormEmail/>
      <Analytics />
    </main>
  )
}
