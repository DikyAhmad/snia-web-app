'use client';
'use strict';

import { Analytics } from '@vercel/analytics/react';
import { Button, Box, Stack, Chip } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DescriptionIcon from '@mui/icons-material/Description';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import logo from '../../../public/image/logo_colour.png'
import dynamic from 'next/dynamic'

export default function HomePage() {

  return (
    <Box sx={{ width: '80%' }} >
        <Stack>
          <Image
              width={100}
              height={100}
              src={logo.src}
              alt="Image"
              blurDataURL={logo.src}
              className="mx-auto"
          />  
           <p className="text-2xl font-['Oswald'] mb-12 text-center mx-auto">SNIA PHOTO APP</p>
        </Stack>
        <Box>
          <Stack spacing={3}>
            <Button variant="outlined" color="success" endIcon={<MarkEmailReadIcon />}><Link className="w-full py-4 text-lg" href="/email">Aplikasi Email</Link></Button>
            <Button variant="outlined" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/nota">Pembuatan Nota</Link></Button>
            <Button variant="outlined" color="secondary" endIcon={<WallpaperIcon/>} ><Link className="w-full py-4 text-lg" href="https://express.adobe.com/tools/remove-background">Hapus Background</Link></Button>
          </Stack>
        </Box>
        <Analytics />
      </Box>
  )
}
