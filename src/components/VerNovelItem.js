import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import view from "../../src/images/view.png";
import liked from "../../src/images/like.png";

const VerNovelItem = (props) => {
    const handler = () => {
        props.navigation.navigate("Intro", {id: props.data.id, type: props.data.type});
    }
  return (
        <TouchableOpacity key={props.index} onPress={handler} style={{marginBottom: 15, marginRight: 20}}>
            <ImageBackground source={{ uri: `data:image/jpeg;base64,${props.data.image}` }} style={styles.item} imageStyle={{ borderRadius: 20}} >
            </ImageBackground>
            <View style={styles.content}>
                <View style={styles.time}>
                    <Image style={styles.img} source={view} />
                    <Text style={styles.fonts} >{45}</Text>
                </View>
                <View style={styles.time}>
                    <Image style={styles.img} source={liked} />
                    <Text style={styles.fonts} >{102}</Text>
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default VerNovelItem;

const styles = StyleSheet.create({
    item: {
        width: 140,
        height: 180,
        marginTop: 10,
        borderRadius: 20,
        position: 'relative',
    },
    chapter: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    type: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    back: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        fontSize: 10,
        color: "#696969",
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    img: {
        width: 20,
        height:20,
        marginRight: 8,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fonts: {
        fontSize: 13,
        color: "#696969"
    },
    title: {
        width: 210,
    }

})