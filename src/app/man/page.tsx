'use client';
'use strict';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const [showPage, setShowPage] = useState(false)

    const DynamicList = dynamic(() => import('./components/ManList'), {
        loading: () => 
        <main className="flex min-h-screen flex-col lg:px-96">
            <main className="m-auto">
                <CircularProgress color="success"/>
            </main>
        </main>
    })

    const checkLogin = () => {
        if(localStorage.getItem("auth_uid") !== null) {
            setShowPage(true)
            return
        } else {
            redirect('/')
        }
    }

    useEffect(() => {
        checkLogin()
    }, []);

    return (
        <Box>
            {showPage?
                <DynamicList/>: null
            }
        </Box>
    )
}