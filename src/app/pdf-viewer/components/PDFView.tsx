'use client'
'use strict'
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Decoration from '../../../../src/image/decoration/title.png'

// Create Document Component
export default function PDFView () {
    const [images, setImages] = useState([])
    const Row3x4 = [1, 2, 3]
    const Row4x6 = [1, 2]
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            marginLeft: 15,
            marginBottom: 15,
        },
        section4x6: {
            marginLeft: 12,
            marginRight: 3,
            marginBottom: 15,
        },
        sectionUp: {
            flexDirection: 'row',
            marginTop: 15,
            marginLeft: 50,
            flexGrow: 1
        },
        sectionUp4x6: {
            flexDirection: 'row',
            marginTop: 15,
            marginLeft: 5,
            flexGrow: 1
        },
        sectionDown: {
            flexDirection: 'row',
            marginTop: 170,
            marginLeft: 50,
            flexGrow: 1,
            position: "absolute"
        },
        sectionDown4x6: {
            flexDirection: 'row',
            marginTop: 240,
            marginLeft: 5,
            flexGrow: 1,
            position: "absolute"
        },
        size3x4: {
            width: 105.4488189,
            height: 144,
        },
        size4x6: {
            width: 144,
            height: 211.27559055,
        },
        size3x4S: {
            width: 170,
            height: 150,
        },
        size3R: {
            width: 480,
            height: 336,
        },
        size3RVertical: {
            width: 336,
            height: 480,
        },
        size4R: {
            width: 576,
            height: 384,
        },
        photoSize: {
            width: 100,
            height: 100,
        },
        photoTitle: {
            width: 105.4488189,
            height: 144,
            position: "absolute"
        },
        photoTitle4x6: {
            width: 144,
            height: 211.27559055,
            position: "absolute"
        },
    });

    useEffect(() => {
        // const merah = ["2", "3", "1", "7"]
        // const biru = ["12", "23", "31", "47"]
        let imgMerah = [] as any
        let imgBiru = [] as any
        let imgMerahSrc = []as any
        let imgBiruSrc = [] as any
        let imgSort = [] as any
        function importAll(r: any) {
            let images = {} as any;
            r.keys().forEach((item: string, index: number) => { 
                images[item.replace('./', '')] = r(item) 
            })
            return images
        }
        const imageMerah = importAll(require.context('../../../../src/image/photo/merah', false, /\.(png|jpe?g|svg)$/));
        const imageBiru = importAll(require.context('../../../../src/image/photo/biru', false, /\.(png|jpe?g|svg)$/));
        imgMerah = Object.values(imageMerah) as any
        imgBiru = Object.values(imageBiru) as any
        imgMerah.map((iMerah: any) => {
            imgMerahSrc.push(iMerah.default.src)
        })
        imgBiru.map((iBiru: any) => {
            imgBiruSrc.push(iBiru.default.src)
        })

        const imgSliceMerah = imgMerahSrc.slice(0, imgMerahSrc.length-(imgMerahSrc.length/2)) as any
        const imgSliceBiru = imgBiruSrc.slice(0, imgBiruSrc.length-(imgBiruSrc.length/2)) as any
        
        imgSliceMerah.map((mr: string, index: number) => {
           imgSort.push([mr, imgSliceBiru[index]])
        })
        setImages(imgSort)
        console.log("adalah: ",imgSort)
        console.log("adalah 2: ",imgSliceBiru)
    },[],)

    return (
        <main></main>
        // Membuat title secara otomatis
        // <Document>
        //     {images.map((data, index) => {
        //         return(
        //             <Page size={{width: 105.4488189, height: 144, }} style={styles.page}>
        //                 <View>
        //                     <Image 
        //                         src={data[0]} 
        //                         style={styles.size3x4}
        //                     />
        //                     <Image 
        //                         src={Decoration.src} 
        //                         style={styles.photoTitle}
        //                     />
        //                 </View>
        //             </Page>
        //         )
        //     })}
        // </Document>

        //PDF dengan ukuran 3R didalamnya terdapat 3x4 sebanyak 6 Lembar
        // <Document>
        //     {images.map((data, index) => {
        //         return(
        //             <Page size={styles.size3R} style={styles.page}>
        //                 <View style={styles.sectionUp}>
        //                     {Row3x4.map((test, index) => {
        //                         return (
        //                             <View style={styles.section}>
        //                                 <Image 
        //                                     src={data[0]} 
        //                                     style={styles.size3x4}
        //                                 />
        //                                 <Image 
        //                                     src={Decoration.src} 
        //                                     style={styles.photoTitle}
        //                                 />
        //                             </View>
        //                         )
        //                     })}
        //                 </View>
        //                 <View style={styles.sectionDown}>
        //                     {Row3x4.map((test, index) => {
        //                         return (
        //                             <View style={styles.section}>
        //                                 <Image 
        //                                     src={data[0]} 
        //                                     style={styles.size3x4}
        //                                 />
        //                                 <Image 
        //                                     src={Decoration.src} 
        //                                     style={styles.photoTitle}
        //                                 />
        //                             </View>
        //                         )
        //                     })}
        //                 </View>
        //             </Page>
        //         )
        //     })}
        // </Document>


        //Membuat PDF dengan ukuran 3R didalamnya terdapat 4x6 sebanyak 4 Lembar
        // <Document>
        //     {images.map((data, index) => {
        //         return(
        //             <Page size={styles.size3RVertical} style={styles.page} wrap break key={index}>
        //                 <View style={styles.sectionUp4x6}>
        //                     {Row4x6.map((test, index) => {
        //                         return (
        //                             <View style={styles.section4x6}>
        //                                 <Image 
        //                                     src={data[0]} 
        //                                     style={styles.size4x6}
        //                                 />
        //                             </View>
        //                         )
        //                     })}
        //                 </View>
        //                 <View style={styles.sectionDown4x6}>
        //                     {Row4x6.map((test, index) => {
        //                         return (
        //                             <View style={styles.section4x6}>
        //                                 <Image 
        //                                     src={data[0]} 
        //                                     style={styles.size4x6}
        //                                 />
        //                             </View>
        //                         )
        //                     })}
        //                 </View>
        //             </Page>
                    
        //         )
        //     })}
        // </Document>
    )
} 
