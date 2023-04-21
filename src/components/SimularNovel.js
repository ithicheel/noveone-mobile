import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

const SimularNovel = (props) => {
  const [simularNovel, setSimularNovel] = useState([]);
  useEffect(() => {
    axios.get("/novel/type/" + props.type).then(result => {
        if(result.data){
            setSimularNovel(result.data.data);
        }
    })
  }, [])
  return (
    <View>
      <Text style={{ marginTop: 50 }}>Simular Novels</Text>
      <ScrollView style={{ marginVertical: 20 }} horizontal={true}>
        {simularNovel.map((el, ind) => {
          return (
            <View key={ind} style={{ marginRight: 20 }}>
              <Image
                style={{ width: 100, height: 140, borderRadius: 15 }}
                source={{ uri: `data:image/jpeg;base64,${el.image}` }}
              />
              <Text style={{ width: 100 }}>{el.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimularNovel;

const styles = StyleSheet.create({});
