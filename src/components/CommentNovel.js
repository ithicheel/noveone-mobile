import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

import like from "../images/like.png";
import { TextInput } from "react-native-gesture-handler";
import commentImage from "../images/comment.png";
const CommentNovel = (props) => {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    axios
      .get("/comment/novel/" + props.id)
      .then((result) => {
        if (result.data) {
          console.log(result.data.data);
          setComment(result.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View>
      <Text style={{ marginTop: 20 }}>Reviews</Text>
      <View style={styles.comment}>
        {/* Comment */}
        {comment.map((el, ind) => {
          // let countParentId;
          return (
            <View key={ind} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#712ACB",
                    borderRadius: 40,
                    marginRight: 5,
                  }}
                ></Text>
                <Text>Dodobest</Text>
              </View>
              <View>
                <Text style={{ marginLeft: 35, marginVertical: 6 }}>
                  {el.comment}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <View
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
                      source={like}
                    />
                    <Text>{el.liked}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 5,
                      }}
                      source={commentImage}
                    />
                    <Text>{el.parentId}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        {/* Send */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <TextInput
            placeholder="Comment"
            style={{
              borderWidth: 1,
              borderColor: "#696969",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: "70%",
              marginRight: 10,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#712ACB",
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#f4f4f4" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentNovel;

const styles = StyleSheet.create({
  comment: {
    marginTop: 10,
    borderTopColor: "#696969",
    borderTopWidth: 1,
    borderStyle: "solid",
    paddingTop: 20,
  },
});
