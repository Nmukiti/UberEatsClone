import React,  { useEffect, useState }from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import BottomTabs from '../components/home/BottomTabs'
import { Divider } from 'react-native-elements'

const YELP_API_KEY = "vzdVyhaxOcXYtzwMJUA2HdmmOoId92HzGZ30AulBBpVI8XfSV98iwjomxN2v-ma042YvsRdnHCFIS431c7USwvsYcFFe9n9yRVypg3_2TWUexVNAYlVHxv_WwL9aYXYx";

export default function Home({ navigation}) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("San Francisco")
    const [activeTab, setActiveTab] = useState("Delivery")

//pull restaurants data from yelp API    
    const getRestaurantsFromYelp = () => {
        const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    
       const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };

          return fetch(yelpurl, apiOptions) //get yelp api 
            .then((res) => res.json())  //get json from yelp api
            .then((json) => 
                setRestaurantData(
                    json.businesses.filter((business) => 
                        business.transactions.includes(activeTab.toLowerCase())))); //pull the json from yelp api and set the restaurants data to all the restaurants you got 
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, [city, activeTab]);
    
    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1}}>
            <View style={{ backgroundColor: "white", padding: 15}}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SearchBar  cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Categories/>
            <RestaurantItems 
                restaurantData={restaurantData}
                navigation={navigation}
            />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs/>
        </SafeAreaView>
    )
}
