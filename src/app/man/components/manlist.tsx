'use client';
'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return (
    <Slide direction="up" ref={ref} {...props} />
  )
});


export default function ManList() {

    const [dataMan, setDataMan] = useState<any[]>([])
    const babap = ["aa", "bbb", "ccc"]

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  
    useEffect(() => {
        async function loadData(){
            const docRef = doc(db, "layanan", "services");
            const docSnap = await getDoc(docRef)

            const finalData = Object.values(docSnap.data() as any)
            finalData.sort((a: any, b: any) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
                return 0;
            });
            
            setDataMan(finalData)
            // console.log(finalData)
        }

        loadData()
        
    },[],);

    return (
      <Box className="w-full flex min-h-screen flex-col lg:px-24 2xl:px-72" >
        <p className="text-3xl font-['Oswald'] mx-auto pt-4">SNIA PHOTO</p>
        <Button variant="outlined" sx={{ width: '90%'}}className="mx-auto mt-2">Tambah Data</Button>
        <Box sx={{ width: '90%', maxWidth: 360, bgcolor: 'background.paper' }} className="mx-auto mt-4">

            <nav aria-label="secondary mailbox folders">
                <List>
                {
                    dataMan.map(({name, price}, index) => {
                        return(
                            <ListItem disablePadding key={index}>
                                <ListItemButton>
                                    <ListItemText primary={name} secondary={price[0]} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
                </List>
            </nav>
        </Box>
        <Button variant="outlined" onClick={handleClickOpen} className="mx-auto mt-4" sx={{ width: '90%'}}>
            Open full-screen dialog
        </Button>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                save
                </Button>
            </Toolbar>
            </AppBar>
            <List>
            <ListItem button>
                <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
                />
            </ListItem>
            </List>
        </Dialog>
      </Box>
    )
  }