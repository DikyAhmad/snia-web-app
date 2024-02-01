'use client';
'use strict';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { PDFDownloadLink} from '@react-pdf/renderer/lib/react-pdf.browser.cjs.js';
import { redirect } from 'next/navigation';
import { Button, Box, Stack, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, Divider, AppBar, Toolbar, IconButton,  Typography, Slide, TextField, Hidden, Paper} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintPDF from './PrintPDF'
import DownloadIcon from '@mui/icons-material/Download';
import { database } from "../../firebase";
import { doc, getDoc, collection, query, getDocs, setDoc, addDoc } from "firebase/firestore";
import { getDatabase, ref, set, onValue, get, push, update} from "firebase/database";
import * as XLSX from 'xlsx';

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return (
    <Slide direction="up" ref={ref} {...props} />
  )
});

export default function ManList() {
    const db = getDatabase()
    const [sizeList, setSizeList] = useState(0)
    const [totalList, setTotalList] = useState([])
    const [keyState, setKeyState] = useState("")
    const [allKey, setAllKey] = useState([])
    const [addState, setAddState] = useState(true)
    const [dataState, setDataState] = useState("")
    const [dataFinal, setDataFinal] = useState([])
    const [dataRaw, setDataRaw] = useState([])
    const [name, setName] = useState("")
    const [kelas, setKelas] = useState("")
    const [nim, setNim] = useState("")

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (name: string, kelas: string, nim: string, index: number) => {
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
        handleData("", "", "")
        setDataState("Tambah Data")
        setAddState(true)
        setOpen(true)
    }

    const handleData = (name: string, kelas: string, nim: string) => {
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

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };

    useEffect(() => { 
        const loadUid = () => {
            let auth_id
            auth_id = localStorage.getItem("auth_uid")
            if(auth_id !== null) {
                return
            } else {
                redirect('/')
            }
        }
        loadUid()
    },[],)

    useEffect(() => {
        const loadData = async () => {
            try {
                const dbRef = ref(database, 'man_insan');
                onValue(dbRef, (snapshot) => {
                    let finalData = [] as any
                    let key = [] as any
                    let list = [] as any
                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        finalData.push(childData)
                        key.push(childKey)
                    });
                    setAllKey(key)
                    const loopSizeData = () => {
                        for (let i = snapshot.size; i >= 1; i--) {
                            list.push(i)
                        }
                    }
                    const numDescending = [...finalData].reverse() as any
                    setDataRaw(finalData)
                    setDataFinal(numDescending)
                    loopSizeData()
                    setTotalList(list)
                   
                },);
            } catch(e) {
                console.error(e);
            }
        }
        loadData()
       
    },[],);

    return (
      <Box className="w-full flex min-h-screen flex-col lg:px-24 2xl:px-72" >
        <p className="text-3xl font-serif mx-auto pt-4 my-4">SNIA PHOTO</p>
        <Box className="mx-4 my-4">
            <Button variant="outlined" className="w-full" onClick={addData}>Tambah Data</Button>
            <Box className="mx-auto mt-4" component={Paper}>
                {
                    dataFinal.map(({nama, kelas, nim}, index) => {
                        return (
                            <Box key={index}>
                                <Stack direction="row" >
                                <ListItem>
                                    <ListItemButton onClick={e => handleClickOpen(nama, kelas, nim, (totalList[index]-1))}>
                                        <ListItemText primary={nama} secondary={kelas}/>
                                        <ListItemText secondary={"No."+(totalList[index])} className="text-end"/>
                                    </ListItemButton>
                                </ListItem>
                                
                                </Stack>
                                <Divider/>
                            </Box>
                        )
                    })
                }
            </Box>
            <PDFDownloadLink document={<PrintPDF datas={dataRaw} />} fileName={"MAN_INSAN.pdf"}>
                <Button variant="outlined" className="w-full my-4" size="large" endIcon={<DownloadIcon />}>
                        Download PDF
                </Button>
            </PDFDownloadLink>
            <Button variant="outlined" className="w-full" onClick={()=>downloadExcel(dataRaw)}>Download Excel</Button>
        </Box>
      
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <Box>
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
            </Toolbar>
            </AppBar>
                <Stack spacing={2} className="mt-8 mx-4">
                    <TextField id="outlined-basic" label="Nama" value={name} variant="outlined" className="mt-8 mx-4" onChange={e => setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Kelas" value={kelas} variant="outlined" className="mt-8 mx-4" onChange={e => setKelas(e.target.value)} helperText="Contoh: XII IPA 2"/>
                    <TextField id="outlined-basic" label="Nim" value={nim} type="number" variant="outlined" className="mt-8 mx-4" onChange={e => setNim(e.target.value)} helperText="Contoh: 012345678"/>
                    <Button variant="outlined" className="mt-4 mx-4" onClick={handleSave}>SIMPAN</Button> 
                    {!addState && (
                         <Button variant="outlined" className="mt-4 mx-4" onClick={handleRemoveData} color="error">HAPUS</Button>
                    )}
                </Stack>
            </Box>
        </Dialog>
      </Box>
    )
  }
