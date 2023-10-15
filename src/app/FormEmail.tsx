'use client';
import React, { useState } from 'react';
import AlertBox from './AlertBox'

export default function FormEmail(){
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [body, setBody] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const hours = new Date().getHours();

    const serviceList = [
        {value:"Foto Studio"},  
        {value:"Cetak Foto"},  
        {value:"Edit Foto"},  
        {value:"Document"}
        ]

    function checkService(props: string){
        const greeting = checkHours()
        if (props == "Foto Studio") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil foto studio anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if (props == "Cetak Foto") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil cetak foto anda yang telah diedit dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if(props == "Edit Foto") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil pengeditan foto anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } else if(props == "Document") {
        setBody(greeting+" Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan document anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
        } 
    }

    function handleChangeService(props: string){
        checkHours()
        setService(props)
        checkService(props)
    }

    function mailTo(){
        window.location.href = "mailto:"+email+"?subject="+service+"&body="+body;
    }

    function sendEmail(){
        checkService(service)
        validateForm()
        // console.log("mailto:"+email+"?subject="+service+"&body="+body)
    }

    function showAlert(msg: string){
        setAlertMsg(msg)
        setAlert(true)
        setTimeout(() => {
            setAlert(false);
            }, 2500);
    }

    function validateForm(){
        if(isValidEmail(email)){
            if(isValidService(service)){
                mailTo()
                console.log("Berhasil")
            } else {
                showAlert("Pilih Layanan")
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
        <main className="items-center">
            <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">SNIA PHOTO EMAIL APP</p>
            <input type="email" placeholder="Masukkan Email Penerima" className="input input-bordered w-full max-w-xs my-4" onChange={e=> setEmail(e.target.value)}/>
            <select className="select select-bordered w-full max-w-xs" onChange={e => handleChangeService(e.target.value)} defaultValue="Tipe Layanan">
            <option disabled value="Tipe Layanan">Tipe Layanan</option>
            {serviceList.map(({ value }, index) => 
            <option value={value} key={index}>{value}</option>)
            }
            </select>
            <button className="btn btn-outline btn-accent w-full max-w-xs my-4" onClick={sendEmail}>Kirim</button>
            { alert ? <AlertBox msg={alertMsg}/> : null }
        </main>
    )
}