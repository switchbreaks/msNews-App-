import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AllNews from "./News/AllNews.js"
import GameNews from "./News/GameNews.js"
import IndiaNews from "./News/IndiaNews.js"
import ScienceNews from "./News/ScienceNews.js";

const FirstRoute = () => (
    <AllNews />
);

const SecondRoute = () => (
    <ScienceNews />
);
const Game = () => (
    <GameNews />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    three: Game
});

export default function SecNavigation() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'All News' },
        { key: 'second', title: 'Science' },
        { key: 'three', title: 'Game News' },
    ]);

    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />

    );
}