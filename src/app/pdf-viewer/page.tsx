'use client'
'use strict'
import { useEffect } from 'react'
import { redirect } from 'next/navigation';
// import { PDFViewer } from '@react-pdf/renderer/lib/react-pdf.browser.es.js'
// import PDFView from './components/PDFView'
import dynamic from 'next/dynamic'
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
   
    useEffect(() => { 
        let auth_id
        auth_id = localStorage.getItem("auth_uid")
        if(auth_id !== "") {
            return
        } else {
            redirect('/')
        }
    },[],)

    return <main></main>
}