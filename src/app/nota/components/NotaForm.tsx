'use client'
'use strict'
import React, { useState, useEffect } from 'react';
import { TextField, Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, Alert, Fade, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider } from '@mui/material';
import { PDFDownloadLink} from '@react-pdf/renderer/lib/react-pdf.browser.cjs.js';
import { pdf } from '@react-pdf/renderer';
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import PdfGenerator from './PdfGenerator'
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import DownloadIcon from '@mui/icons-material/Download';
import { db } from "../../firebase";
import Link from 'next/link'
import image from '../../../../public/image/image.jpeg'

export default function NotaForm(){
    const [choose, setChoose] = useState("")
    const [amount, setAmount] = useState("")
    const [codePayment, setCodePayment] = useState("")
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [stateTable, setStateTable] = useState(true)
    const [finalPrice, setFinalPrice] = useState(0)
    const [listAllPriceSelected, setlistAllPriceSelected] = useState<number[]>([]) 

    const [totalPrice, setTotalPrice] = useState(0)
    const [listChoose, setListChoose] = useState<{layanan: string; jumlah: number; harga: number; totalHarga: number}[]>([
    ],)
    const [service, setService] = useState<any[]>([])
    // const [service, setService] = useState([
    //     {name:'Foto Studio', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
    //     {name:'Cetak Foto', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
    //     // {name:'Print', types:['HVS A4 Warna', 'HVS A4 Hitam Putih'], price:[500, 1000]},
    //     // {name:'Edit', types:['Foto', 'Dokumen'], price:[2000, 5000]},
    //     // {name:'Scan', types:['Foto', 'Dokumen'], price:[2000, 2000]},
    //     ])
        
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event: any, tipe: string, index: number){
        setChoose(tipe+" "+event.target.value)
        const indexSelected = service[index].types.indexOf(event.target.value)
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
            pushToList()
        } else {
            return
        }
    }

    function pushToList(){
        setListChoose(prevEmployees => [
        ...prevEmployees,
        {layanan: choose, jumlah: parseInt(amount), harga: selectedPrice, totalHarga: calculatePrice()},
        ])
        setStateTable(false)
        setChoose("")
        setAmount("") 
        setOpen(false)
    }

    function handleDelete(layanan: string, index: number){
        setListChoose(listChoose.filter(item => item.layanan !== layanan));
        if(index == 0 && listChoose.length == 1){
            setStateTable(true)
        }
    }

    function handleKey(event: any){
        if(event.key === "Enter"){
            setAmount(event.target.value)
            pushToList()
        }
    }

    function generateCodePayment(){
       
        const date = new Date()
        function addZero(i: number) {
            let x = ""
            if (i < 10) {
                x = "0" + i
                return x
            } else {
                return i
            }
        }
        const detik = addZero(date.getSeconds())
        const jam = addZero(date.getHours())
        const menit = addZero(date.getMinutes())
        const hari = date.getDate()
        const bulan = date.getMonth()
        const tahun = date.getFullYear().toString()
        const code = jam+""+menit+""+detik+""+hari+""+(bulan+1)+""+tahun.slice(2,4)

        const uploadPdf = async () => {
            const storage = getStorage();
            const storageRef = ref(storage, "nota_"+code+".pdf");
            const response = await pdf(<PdfGenerator datas={listChoose}/>).toBlob();

            uploadBytes(storageRef, response).then((snapshot) => {
                console.log('Uploaded PDF file!');
            });
        }

        uploadPdf()
        setCodePayment(code)
    }

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

            setService(finalData)
        }
        
        
        loadData()
       
    },[],);
    

    return(
        <Box className="flex min-h-screen flex-col items-center mt-8">
            <Box className="w-full px-8 lg:px-72 xl:px-96">
            <Box className=""> 
                <p className="text-3xl font-['Oswald'] my-8 text-center mx-auto">Pembuatan Nota</p>
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
                            // onKeyPress={e => handleKey(e)}
                            >
                            {types.map((type: any, id: number) => <MenuItem key={id} value={type} >{type}</MenuItem>)}
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
                    onKeyPress={e => handleKey(e)}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAmount}>Simpan</Button>
                </DialogActions>
            </Dialog>
            <Box className="w-full px-2 mb-8 mt-4" hidden={stateTable}> 
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
                    <PDFDownloadLink document={<PdfGenerator datas={listChoose} />} onClick={generateCodePayment} fileName={"Nota_Pembayaran_"+codePayment+".pdf"} >
                        <Button variant="outlined" className="w-full" size="large" endIcon={<DownloadIcon />}>
                             Download
                        </Button>
                    </PDFDownloadLink>
                </Stack>
            </Box>
            </Box>
        </Box>
    )
}