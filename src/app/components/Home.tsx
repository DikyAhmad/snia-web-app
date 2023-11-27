'use client';
'use strict';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react';
import { Button, Box, Stack, Chip } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Image from 'next/image'
import Link from 'next/link'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DescriptionIcon from '@mui/icons-material/Description';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import logo from '../../../public/image/logo_colour.png'
import Page from '../page'
import dynamic from 'next/dynamic'

// Augment the palette to include an theme color
declare module '@mui/material/styles' {
  interface PaletteOptions {
    black?: PaletteOptions['primary'];
    colorButton1?: PaletteOptions['primary'];
    colorButton2?: PaletteOptions['primary'];
    colorButton3?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a theme option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
    colorButton1: true;
    colorButton2: true;
    colorButton3: true;
  }
}

const blackBase = '#000000';
const colorButton1= '#557c55'
const colorButton2 = '#FA7070';
const colorButton3 = '#468B97';

const theme = createTheme({
  palette: {
    black: {
      main: blackBase,
    },
    colorButton1: {
      main: colorButton1
    },
    colorButton2: {
      main: colorButton2
    },
    colorButton3: {
      main: colorButton3
    },
  },
});

export default function HomePage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
    }
  },[],);

  return (
    <Box className="w-full px-8 lg:px-24 2xl:px-72 my-auto" >
      <ThemeProvider theme={theme}>
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
            <p className="text-2xl font-serif mb-12 text-center">SNIA PHOTO APP</p>
          </Stack>
        </Box>
        <Box className="py-auto mb-32">
          <Stack spacing={3}>
            {/* <Button variant="outlined" color="success" endIcon={<MarkEmailReadIcon />} className="w-full py-4 text-lg"><Link className="w-full py-4 text-lg" href="/email">Aplikasi Email</Link></Button> */}
            <Button variant="outlined" color="colorButton1" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/nota">Pembuatan Nota</Link></Button>
            <Button variant="outlined" color="colorButton2" endIcon={<DescriptionIcon />}><Link className="w-full py-4 text-lg" href="/man">MAN</Link></Button>
            <Button variant="outlined" color="colorButton3" endIcon={<WallpaperIcon/>} ><Link className="w-full py-4 text-lg" href="https://express.adobe.com/tools/remove-background">Hapus Background</Link></Button>
          </Stack>
        </Box>
        <Analytics />
      </ThemeProvider>
    </Box>
  )
}
