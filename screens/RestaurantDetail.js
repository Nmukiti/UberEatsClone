import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetail/About'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const foods =[
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image: 
        "https://images.unsplash.com/photo-1560035285-64808ba47bda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
    },
    {
        title: "Tandoori Chicken",
        description: "Amazing Indian dish with tenderloin chicken off the sizzles",
        price: "$19.20",
        image: 
        "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
    },
    {
        title: "Chilaquiles",
        description: "Chilaquiles with cheese and sauce. Adelicious mexican dish",
        price: "$14.20",
        image: 
        "https://images.unsplash.com/photo-1633372363856-f2fe2669a26e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"
    },
    {
        title: "Chicken Caesar Salad",
        description:
          "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
        price: "$21.50",
        image:
          "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
      },
      {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
      },
    ];


export default function RestaurantDetail({ route, navigation}) {
    return (
        <View>
            <About route={route}/>
            <Divider width={1.8} style={{marginVertical: 20 }} />
            <MenuItems restaurantName={route.params.name} foods={foods}/>
            <ViewCart navigation={navigation} />
        </View>
    )
}
