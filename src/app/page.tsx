'use client';
'use strict';

import * as React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DescriptionIcon from '@mui/icons-material/Description';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">SNIA PHOTO APP</p>
      <Box sx={{ width: '100%' }} >
        <Stack spacing={2} className="mx-12">
          <Button variant="outlined" color="success" endIcon={<MarkEmailReadIcon />}><Link className="w-full" href="/email">Aplikasi Email</Link></Button>
          <Button variant="outlined" endIcon={<DescriptionIcon />}><Link className="w-full" href="/nota">Pembuatan Nota</Link></Button>
        </Stack>
      </Box>
      <Analytics />
    </main>
  )
}
