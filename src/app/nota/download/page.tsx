'use client'
import { PDFDownloadLink} from '@react-pdf/renderer/lib/react-pdf.browser.cjs.js';
import PdfGenerator from '../PdfGenerator'
import { Button } from '@mui/material'

export default function Page({searchParams}:{searchParams:any}){
    return(
        <main className="flex min-h-screen items-center flex-col p-8">
            <PDFDownloadLink document={<PdfGenerator datas={JSON.parse(searchParams.search)} />} fileName="notapembayaran.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </main>
    )
}