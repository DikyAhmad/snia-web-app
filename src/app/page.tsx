'use client';
'use strict';
import Image from 'next/image'
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [body, setBody] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const serviceValue = [
    {value:"Foto Studio"},  
    {value:"Cetak Foto"},  
    {value:"Edit Foto"},  
    {value:"Document"}
    ]

  function checkService(props: any){
    if (props == "Foto Studio") {
      setBody("Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil foto studio anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
    } else if (props == "Cetak Foto") {
      setBody("Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil cetak foto anda yang telah diedit dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
    } else if(props == "Edit Foto") {
      setBody("Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan hasil pengeditan foto anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
    } else if(props == "Document") {
      setBody("Pelanggan yang terhormat,%0D%0ATerimakasih telah menggunakan layanan kami, berikut merupakan document anda dalam bentuk softcopy %0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASNIA Photo Studio")
    } 
  }

  function handleChangeService(props: any){
    setService(props)
    checkService(props)
  }

  function mailTo(){
    window.location.href = "mailto:"+email+"?subject="+service+"&body="+body;
  }

  function sendEmail(){
    checkService(service)
    validateForm()
    console.log("mailto:"+email+"?subject="+service+"&body="+body)
  }

  function AlertBox(){
    return(
      <div className="alert alert-warning">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>Warning: {alertMsg}</span>
      </div>
    )
  }

  function showAlert(msg: any){
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

  function isValidService(service){
    if(service==""){
      return false
    } else {
      return true
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <p className="text-xl font-['Oswald'] my-8">SNIA PHOTO EMAIL APP</p>
      <input type="email" placeholder="Masukkan Email Penerima" className="input input-bordered w-full max-w-xs my-4" onChange={e=> setEmail(e.target.value)}/>
      <select className="select select-bordered w-full max-w-xs" onChange={e => handleChangeService(e.target.value)} defaultValue="Tipe Layanan">
        <option disabled value="Tipe Layanan">Tipe Layanan</option>
        {serviceValue.map(({ value }, index) => 
          <option value={value} key={index}>{value}</option>)
        }
      </select>
      <button className="btn btn-outline btn-accent w-full max-w-xs my-4" onClick={sendEmail}>Kirim</button>
      { alert ? <AlertBox /> : null }
      <Analytics />
    </main>
  )
}
