'use client';
'use strict';
import Image from 'next/image'
import React, { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [body, setBody] = useState("");

  const serviceValue = [
    {value:"Foto Studio"},  
    {value:"Cetak Foto"},  
    {value:"Edit Foto"},  
    {value:"Document"}
    ]

  function checkService(props: any){
    if (props == "Foto Studio") {
      setBody("Pelanggan yang terhormat,\r\nTerimakasih telah menggunakan layanan kami, berikut merupakan hasil foto studio dalam bentuk softcopy \r\n\r\n\r\n\r\n\r\nSNIA Photo Studio")
    } else {
      setBody("UWU")
    }
  }

  function handleChangeService(props: any){
    setService(props)
    checkService(props)
  }

  function mailTo(){
    window.location.href = "mailto:"+email+"?subject="+service+"&body="+body;
  }

  function getEmail(){
    console.log("mailto:"+email+"?subject="+service+"&body="+body)
    mailTo()
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
      <button className="btn btn-outline btn-accent w-full max-w-xs my-4" onClick={getEmail}>Kirim</button>
    </main>
  )
}
