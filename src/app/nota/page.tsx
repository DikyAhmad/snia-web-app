'use client'
import React, { useState, useEffect } from 'react';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer/lib/react-pdf.browser.es.js';
import PdfGenerator from './PdfGenerator'

export default function Page(){

    const [service, setService] = useState([
        {name:'Foto Studio', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
        {name:'Cetak Foto', types:['2x3', '3x4', '4x6', '2R', '3R', '4R', '5R', '10R', '10RS'], price:[1500, 1500, 1500, 2000, 4000, 5000, 8000, 15000, 18000]},
        // {name:'Print', types:['HVS A4 Warna', 'HVS A4 Hitam Putih']},
        // {name:'Edit', types:['Foto', 'Dokumen']},
        // {name:'Scan', types:['Foto', 'Dokumen']},
        ])
    
    const [choose, setChoose] = useState("")
    const [amount, setAmount] = useState("")
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [stateTable, setStateTable] = useState(true)
    const [finalPrice, setFinalPrice] = useState(0)
    const [listAllPriceSelected, setlistAllPriceSelected] = useState<number[]>([]) 

    const [contoh, setContoh] = useState<{asu: string, berak: string}[]>([])

    const [totalPrice, setTotalPrice] = useState(0)
    const [listChoose, setListChoose] = useState<{layanan: string; jumlah: number; harga: number; totalHarga: number}[]>([],);

    function handleChange(nama: any,  tipe: string, index: number){
        setChoose(tipe+" "+nama.target.value)
        const b = service[index].price[nama.target.selectedIndex-1]
        setSelectedPrice(b)
        // console.log("Harganya: "+b)
        // showModal()
    }

    function calculateAllPrice(){
        let hrg = 0
        listChoose.map(({totalHarga}, index) => (
            hrg += totalHarga
        )) 
        return hrg
    }

    // function showModal(){
    //     return document.getElementById('my_modal_1').showModal()
    // }

    function calculatePrice(){
        return selectedPrice * parseInt(amount)
    }

    function handleAmount(){
        if(amount != ""){
            setListChoose(prevEmployees => [
            ...prevEmployees,
            {layanan: choose, jumlah: parseInt(amount), harga: selectedPrice, totalHarga: calculatePrice()},
            ])
            // console.log(listChoose)
            setStateTable(false)
            setChoose("")
            setAmount("") 
        } else {
            return
        }
    }

    function handleDelete(e){
        const name = e.target.getAttribute("name")
        const id = e.target.getAttribute("id")
        setListChoose(listChoose.filter(item => item.layanan !== name));
        if(id == 0 && listChoose.length == 1){
            setStateTable(true)
        }
    }
    
    function handlePrint(){
        // calculateAllPrice()
        // setListChoose(1000)
        // console.log(listChoose)
        // console.log("Harga Total: "+calculateAllPrice())
        // calculatePrice()
        // return getData(listChoose)
        setContoh({asu: "11", berak: "2"})
    }

    return(
        <main className="flex min-h-screen items-center flex-col p-8">
            <p className="text-xl font-['Oswald'] my-8 text-center mx-auto">Pembuatan Nota</p>
            {service.map(({name, types}, index) => (
                <select className="select select-bordered w-full max-w-xs mb-4" key={index} onChange={e => handleChange(e, name, index)} value={name}>
                    <option disabled value={name}>{name}</option>
                    {types.map((type, index) => <option key={index}>{type}</option>)}
                </select>
            ))}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
            <div className="overflow-x-auto" hidden={stateTable}>
                <p className="text-xl font-['Oswald'] my-4 text-center mx-auto">List</p>
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Layanan</th>
                        <th className="text-center">Jumlah</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listChoose.map(({layanan, jumlah}, index) => (
                        <tr key={index}>
                            <td>{layanan}</td>
                            <td className="text-center">{jumlah}</td>
                            <th onClick={handleDelete}><button className="btn btn-error btn-sm" name={layanan} id={index}>-</button></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="btn btn-success btn-md w-full max-w-xs my-4" onClick={handlePrint}>Print</button>
            </div>
            {/* <PDFDownloadLink document={<PdfGenerator getData={listChoose}/>} filename="Form">
                {({ loading }) =>
                    loading? (
                        <button>Loading Document....</button>
                    ) : (
                        <button>Download</button>
                    )
                }
            </PDFDownloadLink> */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{choose}</h3>
                    <p className="">Masukkan jumlah :</p>
                    <div className="modal-action">
                    <form method="dialog" className="flex items-stretch">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        {/* if there is a button in form, it will close the modal */}
                        <input type="number" placeholder="" className="input input-bordered w-full max-w-xs mb-4 mr-4" onChange={e => setAmount(e.target.value)} value={amount}/>
                        <button className="btn align-right"onClick={handleAmount}>Simpan</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </main>
    )
}