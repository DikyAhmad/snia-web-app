'use client';
'use strict';
import Image from 'next/image'
import React, { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [file, setFile] = useState("");

  const serviceValue = [
    {value:"Foto Studio"},  
    {value:"Cetak Foto"},  
    {value:"Edit Foto"},  
    {value:"Document"}
    ]

  function mailTo(){
    window.location.href = "mailto:mail@example.org";
  }

  function getEmail(){
    console.log()
    console.log(email, " + ",service, " + ", file)
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
      {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs my-4"  onChange={e => setFile(e.target.files)}/> */}
      <button className="btn btn-outline btn-accent w-full max-w-xs my-4" onClick={getEmail}>Kirim</button>
    </main>
  )
}
