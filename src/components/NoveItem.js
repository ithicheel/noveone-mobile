import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import clock from "../../src/images/clock.png"

const NoveItem = (props) => {
    const timeAgo = (dated) => {
        const date = new Date(dated);
        const seconds = Math.floor((new Date() - date) / 1000);
        const intervals = {
          year: 31536000,
          month: 2592000,
          week: 604800,
          day: 86400,
          hour: 3600,
          minute: 60,
          second: 1
        };
        for (let interval in intervals) {
          const count = Math.floor(seconds / intervals[interval]);
          if (count >= 1) {
            return `${count} ${interval}${count > 1 ? 's' : ''} ago`;
          }
        }
        return 'just now';
      }
    const handler = () => {
        props.navigation.navigate("Intro", {id: props.data.id, type: props.data.type});
    }
  return (
        <TouchableOpacity key={props.index} onPress={handler} style={{marginBottom: 15}}>
            <ImageBackground source={{ uri: `data:image/jpeg;base64,${props.data.image}` }} style={styles.item} imageStyle={{ borderRadius: 20}} >
                <Text style={[styles.chapter, styles.back]}>Chapter {props.data.numbers}</Text>
                <Text style={[styles.type, styles.back]}>{props.data.type}</Text>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={[styles.title, styles.fonts]}>{props.data.name}</Text>
                <View style={styles.time}>
                    <Image style={styles.img} source={clock} />
                    <Text style={styles.fonts} >{timeAgo(props.data.dated)}</Text>
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default NoveItem

const styles = StyleSheet.create({
    item: {
        width: "100%",
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