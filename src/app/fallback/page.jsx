'use client'
import React from 'react';

export default function Fallback(){
  return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div>
          <h1>This is fallback page when device is offline </h1>
          <small>Route will fallback to this page</small>
        </div>
      </main>
  )
}