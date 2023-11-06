'use client';
'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, Divider, AppBar, Toolbar, IconButton,  Typography, Slide, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { database } from "../../firebase";
import { doc, getDoc, collection, query, getDocs, setDoc, addDoc } from "firebase/firestore";
import { getDatabase, ref, set, onValue, get, push, update} from "firebase/database";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return (
    <Slide direction="up" ref={ref} {...props} />
  )
});

export default function ManList() {
    const db = getDatabase()
    const [keyState, setKeyState] = useState("")
    const [allKey, setAllKey] = useState([])
    const [addState, setAddState] = useState(true)
    const [dataState, setDataState] = useState("")
    const [dataFinal, setDataFinal] = useState([])
    const [name, setName] = useState("")
    const [kelas, setKelas] = useState("")
    const [nim, setNim] = useState(NaN)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (name: string, kelas: string, nim: number, index: number) => {
        handleData(name, kelas, nim)
        setKeyState(allKey[index])
        setDataState("Edit")
        setAddState(false)
        setOpen(true);   
    }

    const handleClose = () => {
        setOpen(false);
    }

    const addData = () => {
        handleData("", "", NaN)
        setDataState("Tambah Data")
        setAddState(true)
        setOpen(true)
    }

    const handleData = (name: string, kelas: string, nim: number) => {
        setName(name)
        setKelas(kelas)
        setNim(nim)
    }

    const handleSave = async () => {
        if(addState) return handleInputData()
        if(!addState) return handleEditData()
    }

    const handleEditData = async() => {
        const postListRef = ref(db, 'man_insan');
        const updateData = {
            nama: name,
            kelas: kelas,
            nim: nim
        }
        const updates = {} as any;
        updates['/man_insan/' + keyState] = updateData;
        handleClose()

        return update(ref(db), updates);
    }

    const handleRemoveData = async() => {
        const postListRef = ref(db, 'man_insan');
        const removeData = {} as any;
        removeData['/man_insan/' + keyState] = null;
        handleClose()

        return update(ref(db), removeData);
    }

    const handleInputData = async () => {
        const postListRef = ref(db, 'man_insan');
        const newPostRef = await push(postListRef);
        set(newPostRef, {
            nama: name,
            kelas: kelas,
            nim: nim
        });

        handleClose()
    }

  
    useEffect(() => {
        const loadData = () => {
            const dbRef = ref(database, 'man_insan');

            onValue(dbRef, (snapshot) => {
                let finalData = [] as any
                let key = [] as any
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    finalData.push(childData)
                    key.push(childKey)
                });
                setDataFinal(finalData)
                setAllKey(key)
            },);
        }
        return () => {
            loadData()
        }

        // return loadData
    },[],);

    return (
      <Box className="w-full flex min-h-screen flex-col lg:px-24 2xl:px-72" >
        <p className="text-3xl font-['Oswald'] mx-auto pt-4">SNIA PHOTO</p>
        <Button variant="outlined" className="mt-2 mx-5" onClick={addData}>Tambah Data</Button>
        <Box sx={{ width: '90%', maxWidth: 360, bgcolor: 'background.paper' }} className="mx-auto my-4">

            <nav aria-label="secondary mailbox folders">
                <List>
                {
                    dataFinal.map(({nama, kelas, nim}, index) => {
                        return (
                            <Box key={index}>
                                <Stack direction="row" >
                                <ListItem>
                                    <ListItemButton onClick={e => handleClickOpen(nama, kelas, nim, index)}>
                                        <ListItemText primary={nama} secondary={kelas}/>
                                        <ListItemText secondary={"Urutan "+(index+1)} className="text-end"/>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                                </Stack>
                            </Box>
                        )
                    })
                }
                </List>
            </nav>
        </Box>
      
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
                {dataState}
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSave}>
                save
                </Button>
            </Toolbar>
            </AppBar>
            <TextField id="outlined-basic" label="Nama" value={name} variant="outlined" className="mt-8 mx-4" onChange={e => setName(e.target.value)}/>
            <TextField id="outlined-basic" label="Kelas" value={kelas} variant="outlined" className="mt-8 mx-4" onChange={e => setKelas(e.target.value)}/>
            <TextField id="outlined-basic" label="Nim" value={nim} type="number" variant="outlined" className="mt-8 mx-4" onChange={e => setNim(parseInt(e.target.value))}/>
            <Button variant="outlined" className="mt-4 mx-5" onClick={handleRemoveData} color="error" hidden={addState}>Delete</Button>
        </Dialog>
      </Box>
    )
  }