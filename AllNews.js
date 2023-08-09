import { FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, StyleSheet, Image, Touchable } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { useFonts, OpenSans_400Regular, OpenSans_500Medium } from "@expo-google-fonts/open-sans";
import { Ubuntu_300Light, Ubuntu_300Light_Italic, Ubuntu_400Regular, Ubuntu_400Regular_Italic } from '@expo-google-fonts/ubuntu';

import { } from '@expo-google-fonts/open-sans';
import Loding from "./Loding";
import { FlashList } from "@shopify/flash-list";
import NewsCategory from "./Newscategory";

const AllNews = (props) => {
    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_500Medium,
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
    });
    const [allNewsData, setAllNewsData] = useState([]);
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
                <View>
                    <FlatList
                        data={NewsCategory}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item, index }) => { // Corrected 'items' to 'item'
                            console.log(item.id);
                            return (
                                <View style={allNews.scrollItms}>
                                    <TouchableOpacity style={allNews.categoryType}>
                                        <Text style={allNews.selecterText}>{item.values}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

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
                                <TouchableOpacity>
                                    <View style={allNews.mainContentView}>
                                        <View style={[allNews.public_Time_And_Publicer_Name, allNews.displayFlexprop]}>
                                            <Text style={allNews.publicer_Time_Text}>{diffDays}Day ago </Text>
                                            <Text style={allNews.publicer_Time_Text}>{source.name}</Text>
                                        </View>
                                        {
                                            urlToImage ? (
                                                <Image source={{ uri: urlToImage }}
                                                    style={allNews.imageStyl} resizeMethod="auto" />
                                            ) : (
                                                <Image source={{ uri: "https://img.freepik.com/premium-vector/epidemic-breaking-news-mockup-coronavirus-newspaper-coronavirus-outbreak-newsletter-paper-page-mockup-daily-newspaper-news-related-covid-19_87561-473.jpg?w=2000" }}
                                                    style={allNews.imageStyl} />
                                            )
                                        }
                                        <Text style={allNews.newsTital} numberOfLines={4}>{title}</Text>
                                    </View>
                                </TouchableOpacity>
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
    scrollItms: {
        // backgroundColor:"#c9c9c9"
    },
    categoryType: {
        paddingVertical: 7,
        paddingHorizontal: 18,
        // backgroundColor: "#478eff",
        borderColor: "#478eff",
        borderWidth: 3,
        marginVertical: 10,
        marginRight: 5,
        borderRadius: 3,

    },
    selecterText: {
        color: "#478eff",
        fontWeight: 600,
    },
    mainContentView: {

        marginBottom: responsiveHeight(2)
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
