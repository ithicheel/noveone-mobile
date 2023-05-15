import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import defaultProfileImg from "../images/default.jpg"
import axios from "../../axios";
import VerNovelItem from '../components/VerNovelItem';
import { getToken } from "../Auth/AuthToken";


const ProfilePage = ({ navigation }) => {
    const [novelData, setNovelData] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get("/novel").then((result) => {
            if(result.data){
              setNovelData(result.data.data);
            }
          })
        getToken()
          .then((result) => {
            if (result !== null || result !== "none") {
              const obj = JSON.parse(result);
              setUser(obj.data);
            } else {
              console.log("first")
            }
          })
          .catch((error) => {
            console.log(error);
          });  
    }, []);
  return (
    <View style={{}}>
        <View style={{ flexDirection: 'row', padding: 10 }} >
            <Image style={{width: 100, height: 100, borderRadius: 20}} source={defaultProfileImg} />
            <View  >
                <Text style={{color: '#434343', fontSize: 18, fontWeight: 500, marginBottom: 1, marginLeft: 5, marginTop: 5}} >{user?.username}</Text>
                <Text style={{color: '#434343', fontSize: 18, fontWeight: 500, marginBottom: 5, marginLeft: 5}}>{user?.email}</Text>
                <View style={{backgroundColor: "#8484FF", padding: 5, width: 70, borderRadius: 5, marginLeft: 5}}>
                    <Text style={{color: "#fff"}}>Wallet: {user?.wallet}</Text>
                </View>
            </View>
        </View>
        <View style={{marginTop: 15, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#434343', fontSize: 16, fontWeight: 500}}>Rank</Text>
                <Text style={{color: '#434343', fontSize: 16, fontWeight: 500}}>{user?.ranks} nvn</Text>
            </View>
            <View style={{height: 8, width: '100%', backgroundColor:'#D9D9D9', borderRadius: 10, marginVertical: 5}}></View>
        </View>
        <View>
            <Text style={{color: '#434343', fontSize: 16, fontWeight: 500, paddingHorizontal: 10, marginTop: 10}}>Last</Text>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ marginBottom: 0, marginHorizontal: 10 }}
                >
                {novelData.map((el, ind) => {
                    return (
                    <VerNovelItem
                        key={ind}
                        index={ind}
                        navigation={navigation}
                        data={el}
                    />
                    );
                })}
            </ScrollView>
        </View>

      <Text></Text>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})