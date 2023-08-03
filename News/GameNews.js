import AllNews from "./AllNews";
const GameNews = () => {
    return <AllNews url="https://newsapi.org/v2/everything?q=tesla&from=2023-07-01&sortBy=publishedAt&apiKey=2cdb1db1f7ba4a55bbc546cc3e5c72d7"/>
}
export default GameNews;





{/* <View>
    <FlashList
        data={NewsCategory}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => { // Corrected 'items' to 'item'
            console.log(item.id);
            return (
                <View style={allNews.scrollItms}>
                    <TouchableOpacity style={allNews.categoryType}>
                        <Text style={allNews.selecterText}>{item.id}</Text>
                    </TouchableOpacity>
                </View>
            )
        }}
    />
</View> */}
