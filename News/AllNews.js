import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, StyleSheet, Image, Touchable } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { useFonts, OpenSans_400Regular, OpenSans_500Medium } from "@expo-google-fonts/open-sans";
import { Ubuntu_300Light, Ubuntu_300Light_Italic, Ubuntu_400Regular, Ubuntu_400Regular_Italic } from '@expo-google-fonts/ubuntu';

import { } from '@expo-google-fonts/open-sans';
import Loding from "../Loding";
import { FlashList } from "@shopify/flash-list";
const useFetchData = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData.articles);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url]);
    return data;
};

const AllNews = (props) => {
    const allNewsData = useFetchData(props.url);
    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_500Medium,
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
    });
    // const [allNewsData, setAllNewsData] = useState([]);
    const urls = props.url;
    // alert(urls)
    const fetchall_Ctegory_data = async () => {
        try {
            const piadata = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=2cdb1db1f7ba4a55bbc546cc3e5c72d7");
            const mainData = await piadata.json();
            setAllNewsData(mainData.articles);
        }
        catch {
            console.log("galat j")
        }
    }
    useEffect(() => {
        fetchall_Ctegory_data();
    }, [])
    console.log(allNewsData)
    if (!fontsLoaded) {
        return (<Loding />)
    }
    else {
        return (

            <View style={allNews.topMainView}>
                <FlashList
                    data={allNewsData}
                    scrollEventThrottle={12}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    estimatedItemSize={10}
                    renderItem={({ item, index }) => {
                        const { title, name, publishedAt, urlToImage, source } = item;
                        const birthdateObj = new Date(publishedAt);
                        const diffMs = Date.now() - birthdateObj.getTime();
                        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                        return (
                            <View>
                                <View>
                                    <View style={allNews.mainContentView}>
                                        <View style={[allNews.public_Time_And_Publicer_Name, allNews.displayFlexprop]}>
                                            <Text style={allNews.publicer_Time_Text}>{diffDays}Day ago </Text>
                                            <Text style={allNews.publicer_Time_Text}>{source.name}</Text>
                                        </View>
                                        {
                                            urlToImage ? (
                                                <Image source={{ uri: urlToImage }}
                                                    style={allNews.imageStyl} />
                                            ) : (
                                                <Image source={{ uri: "https://img.freepik.com/premium-vector/epidemic-breaking-news-mockup-coronavirus-newspaper-coronavirus-outbreak-newsletter-paper-page-mockup-daily-newspaper-news-related-covid-19_87561-473.jpg?w=2000" }}
                                                    style={allNews.imageStyl} />
                                            )
                                        }
                                        <Text style={allNews.newsTital} numberOfLines={4}>{title}</Text>
                                    </View>
                                </View>
                            </View>
                        )

                    }}

                />

            </View>

        )
    }
}
const allNews = StyleSheet.create({
    displayFlexprop: {
        display: "flex",
        flexDirection: "row"
    },
    topMainView: {
        flex: 1,
        height: responsiveHeight(100),
        width: responsiveWidth(100),
    },
    mainContentView: {
        // backgroundColor: "red",
        // height: responsiveHeight(40)
    },
    public_Time_And_Publicer_Name: {
        justifyContent: "space-between",
        backgroundColor: "#478eff",
    },
    publicer_Time_Text: {
        paddingVertical: 7,
        paddingHorizontal: 3,
        fontWeight: 700,
        borderRadius: 2,
        color: "white",
        fontFamily: "Ubuntu_400Regular",
    },
    imageStyl: {
        width: responsiveScreenWidth(100),
        height: responsiveHeight(30),
    },
    newsTital: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 600,
        paddingHorizontal: 3,
        paddingBottom: responsiveHeight(.2),
        textAlign: 'justify',
        color: "#4d4d4d"
    }


})
export default AllNews;
