'use client';
'use strict';
import Image from 'next/image'
import React, { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  // const [file, setFile] = useState("");
  const [body, setBody] = useState("");

  const serviceValue = [
    {value:"Foto Studio"},  
    {value:"Cetak Foto"},  
    {value:"Edit Foto"},  
    {value:"Document"}
    ]

  function checkService(){
    if (service == "Foto Studio") {
      setSubject("Pelanggan yang terhormat \nTerimakasih telah menggunakan layanan kami, berikut merupakan hasil foto studio dalam bentuk softcopy\n\n\nSNIA Photo Studio")
    }
    console.log(body)
  }

  function mailTo(){
    window.location.href = "mailto:", email, "?subject=", service, "&body=", body;
  }

  function getEmail(){
    checkService()
    mailTo()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <p className="text-xl font-['Oswald'] my-8">SNIA PHOTO EMAIL APP</p>
      <input type="email" placeholder="Masukkan Email Penerima" className="input input-bordered w-full max-w-xs my-4" onChange={e=> setEmail(e.target.value)}/>
      <select className="select select-bordered w-full max-w-xs" onChange={e => setService(e.target.value)} defaultValue="Tipe Layanan">
        <option disabled value="Tipe Layanan">Tipe Layanan</option>
        {serviceValue.map(({ value }, index) => <option value={value} key={index}>{value}</option>)}
      </select>
      <button className="btn btn-outline btn-accent w-full max-w-xs my-4" onClick={getEmail}>Kirim</button>
    </main>
  )
}
