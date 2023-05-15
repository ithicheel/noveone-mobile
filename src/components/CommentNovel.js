import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

import { TextInput } from "react-native-gesture-handler";
import { getToken } from "../Auth/AuthToken";
import CommentNovelItem from "./CommentNovelItem";

const getDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  return yyyy + "-" + mm + "-" + dd;
}

const CommentNovel = (props) => {
  const [comment, setComment] = useState([]);
  const [sendCommendData, setSendCommentData] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const sendCommend = () => {
    console.log(sendCommendData);
    let send = {
      id: 0,
      novelId: props.id,
      userId,
      parentId: "",
      dated: getDate(),
      liked: 0,
      comment: sendCommendData
    }
    if(sendCommendData.length > 1){
      console.log("sdf");
      axios
      .post("/comment", send)
      .then((result) => {
        if (result.data) {
          console.log(result.data.data);
          setSendCommentData("");
          let comments = [...comment];
          send.username = username;
          comments.push(send);
          setComment(comments);
          
        }
      })
      .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    getToken()
    .then((result) => {
      if (result !== null || result !== "none") {
        const obj = JSON.parse(result);
        setUserId(obj.data.id);
        setUsername(obj.data.username);
      } else {
        console.log("first")
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
            <CommentNovelItem data={el} ind={ind} />
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
            value={sendCommendData}
            onChangeText={(e) => setSendCommentData(e)}

          />
          <TouchableOpacity
            style={{
              backgroundColor: "#712ACB",
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
            }}
            onPress={sendCommend}
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
