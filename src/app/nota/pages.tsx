'use client';
'use strict';

import PdfGenerator from './PdfGenerator'
// import ReactPDF from '@react-pdf/renderer';
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer/lib/react-pdf.browser.es.js';
import FormNota from './FormNota'

export default function Page(){
    const [data, setData] = useState<{layanan: string; jumlah: number; harga: number; totalHarga: number}[]>([],);

    function showData(){
        console.log(data)
    }

    return(
        <main className="flex min-h-screen items-center flex-col p-8">
            {/* <h1>Hai</h1> */}
            {/* <FormNota getData={setData}/> */}
             {/* <h2>Count: {data}</h2> */}
            <button className="btn btn-success btn-md w-full max-w-xs my-4" onClick={showData}>Show</button>
            {/* <PDFDownloadLink document={<PdfGenerator getData={data}/>} filename="Form">
            {({ loading }) =>
                loading? (
                    <button>Loading Document....</button>
                ) : (
                    <button>Download</button>
                )
            }
            </PDFDownloadLink> */}
            {/* <PDFViewer width="1000" height="1000">
                <PdfGenerator/>
            </PDFViewer> */}
        </main>
    )
}