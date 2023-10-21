'use client';
import React, { useState } from 'react';
import { TextField, Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, Alert, Fade, Typography} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';

export default function FormEmail(){
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [body, setBody] = useState("");
    const hours = new Date().getHours();
    const [value, setValue] = useState<string>("");

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorLayanan, setErrorLayanan] = useState(false)
    const [helperEmail, setHelperEmail] = useState("")

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
    }

    function validateForm(){
        if(isValidEmail(email)){
            if(isValidService(service)){
                mailTo()
            } else {
                setErrorLayanan(true)
            }
        } else {
            if(isValidService(service)){
                checkErrorEmail()
            } else {
                checkErrorEmail()
                setErrorLayanan(true)
            }
        }
    }

    function checkErrorEmail(){
        setErrorEmail(true)
        setHelperEmail("Cek email dengan benar")
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
        <main className="flex min-h-screen flex-col items-center p-8 py-20">
            <p className="text-2xl font-['Oswald'] my-12 text-center mx-auto">EMAIL APP</p>
            <Box sx={{ width: '100%' }} > 
                <Stack spacing={2} className="mx-2">
                    <TextField id="outlined-basic" label="Email Penerima" variant="outlined" error ={errorEmail} helperText={helperEmail} onChange={e=> setEmail(e.target.value)}/>
                    <FormControl fullWidth error={errorLayanan}>
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
                    <Button variant="outlined" color="secondary" className="py-4" onClick={sendEmail} endIcon={<SendIcon />}>Kirim</Button>
                </Stack>
            </Box>
        </main>
    )
}