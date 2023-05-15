import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const SimularNovelItem = (props) => {
    const navigation = useNavigation();
    const handler = () => {
        navigation.navigate("Intro", {id: props.data.id, type: props.data.type})
      }
  return (
    <TouchableOpacity onPress={handler} key={props.ind} style={{ marginRight: 20 }}>
    <Image
      style={{ width: 100, height: 140, borderRadius: 15 }}
      source={{ uri: `data:image/jpeg;base64,${props.data.image}` }}
    />
    <Text style={{ width: 100 }}>{props.data.name}</Text>
  </TouchableOpacity>
  )
}

export default SimularNovelItem

const styles = StyleSheet.create({})