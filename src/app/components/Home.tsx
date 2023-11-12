'use client';
'use strict';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react';
import { Button, Box, Stack, Chip } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DescriptionIcon from '@mui/icons-material/Description';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import logo from '../../../public/image/logo_colour.png'
import Page from '../page'
import dynamic from 'next/dynamic'

export default function HomePage() {

  return (
    <Box className="w-full px-8 lg:px-24 2xl:px-72 my-auto" >
      <Box>
        <Stack>
          <Image
              width={100}
              height={100}
              src={logo.src}
              alt="Image"
              blurDataURL={logo.src}
              className="mx-auto"
          />  
           <p className="text-2xl font-['Oswald'] mb-12 text-center">SNIA PHOTO APP</p>
        </Stack>
      </Box>
      <Box className="py-auto mb-32">
        <Stack spacing={3}>
          <Button variant="outlined" color="success" endIcon={<MarkEmailReadIcon />} className="w-full py-4 text-lg"><Link className="w-full py-4 text-lg" href="/email">Aplikasi Email</Link></Button>
          <Button variant="outlined" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/nota">Pembuatan Nota</Link></Button>
          <Button variant="outlined" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/man">MAN</Link></Button>
          <Button variant="outlined" color="secondary" endIcon={<WallpaperIcon/>} ><Link className="w-full py-4 text-lg" href="https://express.adobe.com/tools/remove-background">Hapus Background</Link></Button>
        </Stack>
      </Box>
      <Analytics />
    </Box>
  )
}
