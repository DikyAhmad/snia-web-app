'use client';
'use strict';

import { Analytics } from '@vercel/analytics/react';
import { Button, Box, Stack } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DescriptionIcon from '@mui/icons-material/Description';
import logo from '../../public/image/logo_colour.png'
import dynamic from 'next/dynamic'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <Image
          width={100}
          height={100}
          src={logo.src}
          alt="Image"
          loading="lazy"
      />  
      <p className="text-2xl font-['Oswald'] mb-12 text-center mx-auto">SNIA PHOTO APP</p>
      <Box sx={{ width: '100%' }} >
        <Stack spacing={2} className="mx-8">
          <Button variant="outlined" color="success" endIcon={<MarkEmailReadIcon />}><Link className="w-full py-4 text-lg" href="/email">Aplikasi Email</Link></Button>
          <Button variant="outlined" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/nota">Pembuatan Nota</Link></Button>
        </Stack>
      </Box>
      <Analytics />
    </main>
  )
}
