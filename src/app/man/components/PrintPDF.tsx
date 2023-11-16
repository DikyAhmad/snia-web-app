'use client'
'use strict'

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Page, Text, Image, Document, StyleSheet, View , Svg, Line, Link} from "@react-pdf/renderer";
import logo from '../../../../public/image/A4-NEW.png'

// Create Document Component
export default function PrintPDF({datas}:{datas: any}) {

    // Create styles
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            color: '#333333',
            fontSize: 16,
            flexDirection: 'row',
            backgroundColor: '#ffffff'
        },
        section: {
            padding:5,
            flexGrow: 1
        },
        image: {
            width: "75px", 
            height: "75px", 
            marginLeft:15,
        },
        pageNumber: {
            position: "absolute",
            left: 300,
            top: 775,
        },
        textHeader1: {
            position: "absolute",
            left: 100,
            top: 88,
        },
        textHeader2: {
            position: "absolute",
            left: 100,
            top: 115,
        },
        textHeader25: {
            position: "absolute",
            left: 165,
            top: 115,
        },
        textHeader3: {
            position: "absolute",
            left: 100,
            top: 142,
        },
        text: {
            fontFamily: 'Helvetica',
            color: '#555555',
        }
    });

    let numPages = [] as any

    const loopNumber = () => {
        Array.from(Array(datas.length), (e, i) => {
            numPages.push(i+1)
        })
    }

    loopNumber()

    return (
        <Document>
            {
            datas.map((data: any, index: number) => {
                return (
                     <Page size="A4" style={styles.page} wrap break key={index}>                    
                        <View style={styles.section}>
                            <Image 
                                src={logo.src} 
                            />
                            <Text style={styles.textHeader1}> 
                                Nama     :   {data.nama}
                            </Text>
                            <Text style={styles.textHeader2}> 
                                Kelas     
                            </Text>
                            <Text style={styles.textHeader25}> 
                            :   {data.kelas}
                            </Text>
                            <Text style={styles.textHeader3}> 
                                NISN      :   {data.nim}
                            </Text>
                            <Text style={styles.pageNumber}> 
                                {numPages[index]}
                            </Text>
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
}