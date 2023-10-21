'use client'
'use strict'
import React, { useState } from 'react';
import { TextField, Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, Alert, Fade, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider } from '@mui/material';
import { PDFDownloadLink} from '@react-pdf/renderer/lib/react-pdf.browser.cjs.js';
import PdfGenerator from './PdfGenerator'
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import Link from 'next/link'

export default function NotaForm(){

    const [choose, setChoose] = useState("")
    const [amount, setAmount] = useState("")
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [stateTable, setStateTable] = useState(true)
    const [finalPrice, setFinalPrice] = useState(0)
    const [listAllPriceSelected, setlistAllPriceSelected] = useState<number[]>([]) 

    const [totalPrice, setTotalPrice] = useState(0)
    const [listChoose, setListChoose] = useState<{layanan: string; jumlah: number; harga: number; totalHarga: number}[]>([
    ],)
    const [service, setService] = useState([
        {name:'Foto Studio', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
        {name:'Cetak Foto', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
        {name:'Print', types:['HVS A4 Warna', 'HVS A4 Hitam Putih'], price:[500, 1000]},
        {name:'Edit', types:['Foto', 'Dokumen'], price:[2000, 5000]},
        {name:'Scan', types:['Foto', 'Dokumen'], price:[2000, 2000]},
        ])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(nama: any,  tipe: string, index: number){
        setChoose(tipe+" "+nama.target.value)
        const indexSelected = service[index].types.indexOf(nama.target.value)
        const priceSelected = service[index].price[indexSelected]
        setSelectedPrice(priceSelected)
        setOpen(true)
    }

    function calculateAllPrice(){
        let hrg = 0
        listChoose.map(({totalHarga}, index) => (
            hrg += totalHarga
        )) 
        return hrg
    }


    function calculatePrice(){
        return selectedPrice * parseInt(amount)
    }

    function handleAmount(){
        if(amount != ""){
            setListChoose(prevEmployees => [
            ...prevEmployees,
            {layanan: choose, jumlah: parseInt(amount), harga: selectedPrice, totalHarga: calculatePrice()},
            ])
            setStateTable(false)
            setChoose("")
            setAmount("") 
            setOpen(false)
        } else {
            return
        }
    }

    function handleDelete(layan: string, index: number){
        setListChoose(listChoose.filter(item => item.layanan !== layan));
        if(index == 0 && listChoose.length == 1){
            setStateTable(true)
        }
    }

    return(
        <main className="flex min-h-screen items-center flex-col p-4">
            <p className="text-2xl font-['Oswald'] my-8 text-center mx-auto">Pembuatan Nota</p>
            <Box sx={{ width: '100%' }} > 
                <Stack spacing={2} className="mx-2">
                    {service.map(({name, types}, index) => (
                        <FormControl fullWidth key={index}>
                            <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value=""
                            label={name}
                            onChange={e => handleChange(e, name, index)}
                            >
                            {types.map((type, id) => <MenuItem key={id} value={type} >{type}</MenuItem>)}
                            </Select>
                        </FormControl>
                    ))}
                </Stack>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{choose}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="number"
                    fullWidth
                    variant="outlined"
                    label="Masukkan jumlah"
                    onChange={e => setAmount(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAmount}>Simpan</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ width: '95%' }} className="my-4" hidden={stateTable}> 
                <Stack spacing={2}>
                    <Divider/>
                    <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">List Item</p>
                    <TableContainer style={{backgroundColor:'#ebdfb2', color: 'white',}} className="my-2" >
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell>Layanan</TableCell>
                                    <TableCell align="center">Jumlah</TableCell>
                                    <TableCell align="center">Hapus</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {listChoose.map((list, index) => (
                                <TableRow
                                key={list.layanan}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {list.layanan}
                                    </TableCell>
                                    <TableCell align="center">{list.jumlah}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="Example" onClick={e => handleDelete(list.layanan, index)}><BackspaceSharpIcon fontSize="large" color="error"/></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <PDFDownloadLink document={<PdfGenerator datas={listChoose} />} fileName="notapembayaran.pdf">
                        <Button variant="outlined" color="error" className="py-4 w-full">
                             Download
                        </Button>
                    </PDFDownloadLink>
                </Stack>
            </Box>
        </main>
    )
}