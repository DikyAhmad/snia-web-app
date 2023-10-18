'use client'
import React, { useState, useEffect } from 'react';
import { Page, Text, Image, Document, StyleSheet, View , Svg, Line} from "@react-pdf/renderer";


// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 15,
        paddingBottom: 65,
        paddingHorizontal: 15,
        fontFamily: "Helvetica",
        // backgroundColor: '#E4E4E4'
    },
    section: {
        marginHorizontal: 10,
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
const PdfGenerator = ({getData}) => {

    // const [datas, setDatas] = useState<{layanan: string; jumlah: number; harga: number; totalHarga: number}[]>([],);

    // function gettingData() {
    //     setDatas(getData)
    // }

    const notas = [
        {desc: 'Cetak Foto 3x4', amount: '4 Lembar', price: 'Rp 1.800.000'},
        {desc: 'Print Warna A4', amount: '2 Lembar', price: 'Rp 2.000'},
        {desc: 'SoftFile Foto Studio', amount: '1', price: 'Rp 15.000'},
    ]

    // gettingData()

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
                        <Image source="/_next/static/media/logo.3ffc9857.jpg" style={styles.image} ></Image>
                    </View>
                    <Svg height="8" width="495">
                        <Line x1="5" y1="5" x2="700" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
                    </Svg>
                    {/* <Text style={{left:10}}>Test</Text>
                    <Text style={{left:100}}>Test2</Text> */}
                    {getData.map((data, index) =>{
                        return(
                            <View style={...styles.textBody} key={index}>
                                <Text style={{position: "absolute"}}>{data.asu}</Text>
                                <Text style={styles.listItem}>{data.berak+" Lembar"}</Text>
                                <Text style={{position: "absolute", left: 380, }}>{data.asu}</Text>
                            </View>
                        )
                    })}
                    <Svg height="5" width="495" style={{top:10}}>
                        <Line x1="5" y1="5" x2="700" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
                    </Svg>
                    <View style={styles.textBody}>
                        <Text style={{ left: 280 }}>Total         :</Text>
                        <Text style={styles.textTotal}>Rp 2.000.000</Text>
                    </View>
                </View>
                <View>
                    <Text style={{position: "absolute", left: 330}}>
                        17:03, 16 Oktober 2023
                    </Text>
                </View> 
            </Page>
        </Document>
    );
}
// console.log(gambar)
export default PdfGenerator;