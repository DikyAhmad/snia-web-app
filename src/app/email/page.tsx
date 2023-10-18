'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


export default function FormEmail(){
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [body, setBody] = useState("");
    const [alert, setAlert] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");
    const hours = new Date().getHours();
    const [value, setValue] = useState<string>("");

    function checkService(props: string){
        const greeting = checkHours()
        if (props == "Foto Studio") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0A%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil foto studio anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if (props == "Cetak Foto") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0A%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil cetak foto anda yang telah diedit dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if(props == "Edit Foto") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0A%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil pengeditan foto anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if(props == "Document") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0A%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan document anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } 
    }

    function handleChangeService(event: SelectChangeEvent){
        setValue(event.target.value as string)
        checkHours()
        setService(event.target.value as string)
        checkService(event.target.value as string)
    }

    function mailTo(){
        window.location.href = "mailto:"+email+"?subject="+service+"&body="+body;
    }

    function sendEmail(){
        checkService(service)
        validateForm()
        console.log("mailto:"+email+"?subject="+service+"&body="+body)
    }

    function showAlert(msg: string){
        setAlertMsg(msg)
        setAlert(false)
        setTimeout(() => {
            setAlert(true);
            }, 2500);
    }

    function validateForm(){
        if(isValidEmail(email)){
            if(isValidService(service)){
                mailTo()
                console.log("Berhasil")
            } else {
                showAlert("Pilih Layanan Dahulu")
            }
        } else {
            if(isValidService(service)){
                showAlert("Cek email dengan benar")
            } else {
                showAlert("Isikan form diatas")
            }
        }
    }

    function isValidService(service: string){
        if(service==""){
            return false
        } else {
            return true
        }
    }

    function isValidEmail(email: string){
        return /\S+@\S+\.\S+/.test(email);
    }

    function checkHours(){
        if(hours<4 || hours>18){
            return "Selamat Malam"
        } else if(hours<11){
            return "Selamat Pagi"
        } else if(hours<16){
            return "Selamat Siang"
        } else {
            return "Selamat Sore"
        }
    }

    return(
        <main className="flex min-h-screen flex-col items-center p-8">
            <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">SNIA PHOTO EMAIL APP</p>
            <Box sx={{ width: '100%' }} > 
                <Stack spacing={2} className="mx-2">
                    <TextField id="outlined-basic" label="Email Penerima" variant="outlined" onChange={e=> setEmail(e.target.value)}/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipe Layanan</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Tipe Layanan"
                        onChange={handleChangeService}
                        >
                        <MenuItem value={"Foto Studio"}>Foto Studio</MenuItem>
                        <MenuItem value={"Cetak Foto"}>Cetak Foto</MenuItem>
                        <MenuItem value={"Edit Foto"}>Edit Foto</MenuItem>
                        <MenuItem value={"Document"}>Document</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" color="secondary" onClick={sendEmail}>Kirim</Button>
                </Stack>
            </Box>
            <Alert severity="error" hidden={alert} className="my-4">{alertMsg}</Alert>
        </main>
    )
}