import { StyleSheet, Text,Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import commentImage from "../images/comment.png";
import liked from "../images/like.png";
import { TouchableOpacity } from 'react-native-gesture-handler';

const CommentNovelItem = (props) => {
    const [like, setLike] = useState(0);
    const likeHandler = () => {
        if(like > props.data.liked){
            setLike(like - 1);
        }else {
            setLike(like + 1);
        }
    }
    useEffect(() => {
        setLike(props.data.liked);
    }, []);
  return (
    <View key={props.ind} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
            style={{
            width: 30,
            height: 30,
            backgroundColor: "#712ACB",
            borderRadius: 15,
            overflow: 'hidden',
            marginRight: 5,
            }}
        ></Text>
        <Text>{props.data.username}</Text>
        </View>
        <View>
        <Text style={{ marginLeft: 35, marginVertical: 6 }}>
            {props.data.comment}
        </Text>
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            }}
        >
            <TouchableOpacity onPress={likeHandler}
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
            }}
            >
                <Image
                    style={{
                    width: 20,
                    height: 20,
                    marginRight: 5,
                    }}
                    source={liked}
                />
                <Text>{like}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
                style={{
                width: 20,
                height: 20,
                marginRight: 5,
                }}
                source={commentImage}
            />
            <Text>{props.data.parentId}</Text>
            </View>
        </View>
        </View>
    </View>
  )
}

export default CommentNovelItem

const styles = StyleSheet.create({})