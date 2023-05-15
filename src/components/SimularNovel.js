import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import SimularNovelItem from "./SimularNovelItem";

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
            <SimularNovelItem data={el} ind={ind}/>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimularNovel;

const styles = StyleSheet.create({});
