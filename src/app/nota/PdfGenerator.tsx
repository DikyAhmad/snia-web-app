import React, { useState, useEffect } from 'react';
import { Page, Text, Image, Document, StyleSheet, View , Svg, Line} from "@react-pdf/renderer";
import reactStringReplace from 'react-string-replace';
import logo from '../image/image.jpeg'


// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 15,
        fontFamily: "Helvetica",
        // backgroundColor: '#E4E4E4'
    },
    section: {
        marginHorizontal: 20,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 18,
        marginBottom: 5,
        textAlign: "center",
        color: "black",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    textHeaderTitle: {
        fontFamily: "Times-Bold", 
        marginBottom: 5, 
        marginTop:10,
    },
    textHeaderOne: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: "justify",
    },
    textHeaderTwo: {
        marginTop:30,
        textDecoration: "underline",
        marginHorizontal: 35,
        fontSize: 18,
        textAlign: "center",
        color: "black",
        fontFamily: "Helvetica",
    },
    image: {
        width: "75px", 
        height: "75px", 
        marginLeft:15,
    },
    textBody: {
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        fontSize: 16,
        color: "#434336",
    },
    textTotal: {
        position: "absolute",
        top: 10,
        left: 380,
    },
    listItem: {
        position: "absolute",
        left: 220,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },    
});

// Create Document Component
const PdfGenerator = ({props}:{props: any}) => {
    const date = new Date()
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    // const notas = [
    //     {layanan: 'Cetak Foto 3x4', jumlah: '4 Lembar', totalHarga: 'Rp 1.800.000'},
    //     {layanan: 'Print Warna A4', jumlah: '2 Lembar', totalHarga: 'Rp 2.000'},
    //     {layanan: 'SoftFile Foto Studio', jumlah: '1', totalHarga: 'Rp 15.000'},
    // ]

    function getDate(){
        function addZero(i: number) {
            let x = ""
            if (i < 10) {
                x = "0" + i
                return x
            } else {
                return i
            }
        }

        const jam = addZero(date.getHours())
        const menit = addZero(date.getMinutes())
        const hari = date.getDate()
        const bulan = date.getMonth()
        const tahun = date.getFullYear()
        const bulanString = month[bulan]

        return (jam+":"+menit+", "+hari+" "+bulanString+" "+tahun)
    }

    function formattingCurrency(current: number){
        const numberFormat = (currency: number) =>
            new Intl.NumberFormat('en-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(currency);   
        return reactStringReplace(numberFormat(current), 'IDR', (match, i) => (
            'Rp. '
        ));
    }

    function calculatePrice(){
        let hrg = 0
        props.map(({totalHarga}:{totalHarga: number}) => (
            hrg += totalHarga
        )) 
        return formattingCurrency(hrg)
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.header}>
                        <View style={{marginLeft: 5,}}>
                            <Text style={styles.textHeaderTitle} fixed>SNIA Photo Studio</Text>
                            <Text style={styles.textHeaderOne} fixed>Jl.Kodiklat Tni No 174</Text>
                            <Text style={styles.textHeaderOne} fixed>Tangerang Selatan</Text>
                        </View>
                        <Text style={styles.textHeaderTwo} fixed>NOTA PEMBAYARAN </Text>
                        <Image src={logo.src} style={styles.image} ></Image>
                    </View>
                    <Svg height="8" width="495">
                        <Line x1="5" y1="5" x2="700" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
                    </Svg>
                    {props.map((data, index) =>{
                        return(
                            <View style={styles.textBody} key={index}>
                                <Text style={{position: "absolute"}}>{data.layanan}</Text>
                                <Text style={styles.listItem}>{data.jumlah+" Lembar"}</Text>
                                <Text style={{position: "absolute", left: 380, }}>{formattingCurrency(data.totalHarga)}</Text>
                            </View>
                        )
                    })}
                    <Svg height="5" width="495" style={{top:10}}>
                        <Line x1="5" y1="5" x2="700" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
                    </Svg>
                    <View style={styles.textBody}>
                        <Text style={{ left: 280 }}>Total       : </Text>
                        <Text style={styles.textTotal}>{calculatePrice()}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{position: "absolute", left: 330}}>
                        {getDate()}
                    </Text>
                </View> 
            </Page>
        </Document>
    );
}
export default PdfGenerator;