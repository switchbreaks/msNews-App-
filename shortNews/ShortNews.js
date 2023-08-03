import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Text, StatusBar, Dimensions, StyleSheet, Alert, SafeAreaView, Button, TouchableOpacity } from "react-native";
import HTML from "react-native-render-html";

import { useFonts, OpenSans_400Regular, } from "@expo-google-fonts/open-sans";
import { Roboto_400Regular, } from "@expo-google-fonts/roboto";
import Loding from "../Loding";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import PenSymbole from "react-native-vector-icons/Feather"
import PaperPublicerName from "react-native-vector-icons/Entypo"
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";


const ShortNews = () => {
    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        Roboto_400Regular,
    });
    const [allNewsData, setAllNewsData] = useState([]);
   const fetchall_Ctegory_data = async () => {
    try {
        const piadata = await fetch("lioiuhjkih");
        const mainData = await piadata.json();
        setAllNewsData(mainData.articles);
    } catch (error) {
        console.log("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data. Please check your internet connection.");
    }
}
console.log(allNewsData)
    useEffect(() => {
        fetchall_Ctegory_data();
    }, [])
    // default Loding....
    if (!fontsLoaded) {
        return (
            <>
                <Loding />
            </>
        )
    } else {
        return (
            <SafeAreaView style={shortVideo.safearea}>
                <View style={{ height: responsiveHeight(100), width: responsiveWidth(100) }}>
                    <FlashList
                        data={allNewsData}
                        scrollEventThrottle={12}
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        estimatedItemSize={10}
                        // onEndReached={loadeMoredata}
                        renderItem={({ item, index }) => {
                            const { author, description, title, source, urlToImage, content, publishedAt } = item;
                            const birthdateObj = new Date(publishedAt);
                            const diffMs = Date.now() - birthdateObj.getTime();
                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            // const mainDesc = itm.excerpt.rendered.slice(0, 300);

                            return (
                                <View style={{ height: responsiveHeight(100) }} >
                                    <View style={[shortVideo.dateAndPublicer, shortVideo.commonDisplayFlex]} >
                                        <Text style={shortVideo.bothdatepublicerText}>{diffDays}Day ago</Text>
                                        <View style={shortVideo.commonDisplayFlex}>
                                            <PaperPublicerName name="newsletter" size={responsiveFontSize(3)} color="#fff" />
                                            <Text style={shortVideo.bothdatepublicerText}>{source.name}</Text>
                                        </View>
                                    </View>

                                    {urlToImage ? (
                                        <Image source={{ uri: urlToImage }} style={shortVideo.imageStyle} />
                                    ) : (
                                        <Image source={{ uri: "https://img.freepik.com/premium-vector/epidemic-breaking-news-mockup-coronavirus-newspaper-coronavirus-outbreak-newsletter-paper-page-mockup-daily-newspaper-news-related-covid-19_87561-473.jpg?w=2000" }} style={shortVideo.imageStyle} />
                                    )}

                                    <View style={{ paddingHorizontal: 4 }}>
                                        <View style={{ height: responsiveHeight(15) }}>
                                            <Text style={shortVideo.titleStyls} numberOfLines={3}>{title}</Text>
                                        </View>
                                        <View style={[shortVideo.descriptionView, shortVideo.descripTionStyle]}>
                                            <HTML source={{ html: description }} contentWidth={responsiveWidth(100)} style={{ backgroundColor: "red" }} />

                                        </View>
                                        <View style={[shortVideo.aurtherName, shortVideo.commonDisplayFlex]}>
                                            <Text></Text>
                                            <View style={shortVideo.commonDisplayFlex}>
                                                {
                                                    author ? (<>
                                                        <PenSymbole name="pen-tool" size={responsiveFontSize(2)} color="green" />
                                                        <Text numberOfLines={1}> {author}</Text></>) : (
                                                        null
                                                    )
                                                }
                                            </View>
                                        </View>

                                        <LinearGradient style={shortVideo.touchableopac} colors={['#4c669f', '#3b5998', '#334166']} >
                                            <Text style={shortVideo.readfullNews} >Read full News{index}</Text>
                                        </LinearGradient>

                                    </View>
                                </View>
                            );
                        }}
                    />



                </View>
            </SafeAreaView>

        )
    }
};
const shortVideo = StyleSheet.create({
    commonDisplayFlex: {
        display: "flex",
        flexDirection: "row"
    },
    safearea: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        
    },
    dateAndPublicer: {
        justifyContent: "space-between",
        backgroundColor: "#478eff",
        

    },
    bothdatepublicerText: {
        color: "#fff",
        fontSize: responsiveFontSize(2),
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontWeight: 600
        
    },
    imageStyle: {
        height: responsiveHeight(30),
        width: responsiveWidth(100),
    },
    titleStyls: {
        fontSize: responsiveFontSize(3),
        textAlign: "justify",
        fontFamily: 'Roboto_400Regular',
        lineHeight: 30,
        fontWeight: 600,
        paddingVertical: responsiveHeight(1.5)
    },
    descriptionView: {
        height: responsiveHeight(25),
        width: responsiveWidth(100),
        opacity: .5,
        lineHeight: 55
    },
    descripTionStyle: {
        color: "gray",
        lineHeight: 25,
        fontSize: responsiveFontSize(2),
        textAlign: "justify",
        paddingTop: responsiveHeight(3),
    },
    aurtherName: {
        justifyContent: "space-between",
        marginTop: responsiveHeight(4)
    },
    touchableopac: {
        marginTop: responsiveHeight(5),
        borderRadius: 7
    },
    readfullNews: {
        textAlign: "center",
        padding: responsiveHeight(1.5),
        fontFamily: 'Roboto_400Regular',
        color: "white",
        fontSize: responsiveFontSize(2.5),
    }
})


export default ShortNews;