import React, { useState} from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import firebase from "../../firebase";
import LottieView from 'lottie-react-native'

export default function ViewCart({ navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setloading] = useState(false)

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total = items
      .map((item) => Number(item.price.replace("$", "")))
      .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const addOrderToFirebase = () => {
         setloading(true);
        const db = firebase.firestore();
        db.collection("orders").add({
            items: items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
         .then(() => {
             setTimeout(() => {
                 setloading(false);
                 navigation.navigate("OrderCompleted");
             }, 2500);
         });
    };
    
    const styles= StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },

        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 350,
            borderWidth: 1,
        },
        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          },
      
          subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
          },
    })

    const checkoutModalContent = () => {
        return(
           <>
           <View style={styles.modalContainer}>
               <View style={styles.modalCheckoutContainer}>
                   <Text styles={styles.restaurantName}>{restaurantName}</Text>
                   {items.map((item, index) => (
                       <OrderItem key={index} item={item}/>
                   ))}

                <View style={styles.subtotalContainer}>
                    <Text style={styles.subtotalText}>SubTotal</Text>
                    <Text>{totalUSD}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity 
                       style={{
                           marginTop: 20,
                           backgroundColor: "black",
                           alignItems: "center",
                           padding: 13,
                           borderRadius: 30,
                           width: 300,
                           position: "relative"
                       }} 
                         onPress={() => {
                             addOrderToFirebase();
                             setModalVisible(false);
                         }}
                       >
                        <Text style={{color: "white", fontSize: 20}}>Checkout</Text>
                        <Text 
                           style={{
                               position: "absolute", 
                               right: 20, 
                               color: "white", 
                               top: 17}}
                            >
                                {total ? totalUSD : " "}</Text>
                    </TouchableOpacity>
                </View>
               </View>
           </View>
           </>
        )
    };

    return (
        <>
        <Modal 
           animationType="slide" 
           visible={modalVisible} 
           transparent={true}
           onRequestClose={() => setModalVisible(false)}
        >
           { checkoutModalContent()}
        </Modal>    
        {total ? ( 
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 290,
            zIndex: 999
        }}>
        <View  
          style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%"
          }}>
            <TouchableOpacity 
              style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  padding: 13,
                  borderRadius: 30,
                  width: 200,
                  position: "relative"
              }}
              onPress={() => setModalVisible(true)}>
            <Text style={{ color: "white", fontSize: 20, marginRight: 20}}>View Cart</Text>
            <Text style={{ color: "white", fontSize: 25}}>{totalUSD}</Text>
            </TouchableOpacity>
        </View>
        </View>
        ): (<></>
        )}
        {loading ? ( 
          <View
             style={{
                 backgroundColor: "black",
                 position: "absolute",
                 opacity: 0.6,
                 justifyContent: "center",
                 alignItems: "center",
                 height: "100%",
                 width: "100%"             
                }}
         >
            <LottieView 
               style={{ height: 200 }}
               source={require("../../assets/animations/scanner.json")}
               autoPlay
               speed={3}
               />
         </View>
         ): (<></>
         )}
        </>
    )
}
