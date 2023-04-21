import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import view from "../images/view.png";
import heart from "../images/heart.png";
import colorHeart from "../images/colorheart.png";
import love from "../images/love.png";
import book from "../images/book.png";
import axios from "../../axios";
import SimularNovel from "../components/SimularNovel";
import CommentNovel from "../components/CommentNovel";
const IntroPage = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [novelId, setNovelId] = useState("");
  const [readMore, setReadMore] = useState(true);
  const [like, setLike] = useState(0);
  const [views, setViews] = useState(0);
  const handler = () => {
    navigation.navigate("Read", { novelId });
  };
  const readMoreHandler = () => {
    if (readMore) setReadMore(false);
    else setReadMore(true);
  };
  const likeHandler = () => {
    if(like === 0) setLike(1);
    else setLike(0);
  }
  useEffect(() => {
    const id = route.params?.id;
    axios
      .get("/novel/" + id)
      .then((result) => {
        if (result.data) {
          setData(result.data.data);
        }
      })
      .catch((error) => console.log(error));
    setNovelId(id);
  }, []);
  return (
    <SafeAreaView style={styles.intro}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.background}
          source={{ uri: `data:image/jpeg;base64,${data?.image}` }}
        ></ImageBackground>
        <View style={styles.content}>
          {/* Main */}
          <View style={styles.main}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.dot}></View>
              <Text
                style={{ color: "#696969", fontSize: 16, fontWeight: "bold" }}
              >
                {data.type}
              </Text>
            </View>
            <View style={styles.status}>
              <View style={styles.view}>
                <Image style={styles.icon} source={view} />
                <Text style={styles.colors}>{data.view / 1000 + "K"}</Text>
              </View>
              <View style={styles.view}>
                <Image style={styles.icon} source={heart} />
                <Text style={styles.colors}>{data.voted + like}</Text>
              </View>
            </View>
          </View>
          {/* Details */}
          <View showsVerticalScrollIndicator={false} style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  color: "#111",
                  fontSize: 20,
                  fontWeight: "bold",
                  width: 210,
                }}
              >
                {data.name}
              </Text>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#f3f3f3",
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={likeHandler}
              >
                <Image style={{ width: 23, height: 23 }} source={like === 0 ? love : colorHeart} />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ color: "#696969", fontSize: 16, fontWeight: "bold" }}
              >
                {data.chapter} Chapter |
                <Text style={{ color: "#111" }}>
                  {" "}
                  {data.author} |{" "}
                  <Text style={{ color: "#696969" }}>{data.language} </Text>
                </Text>
              </Text>
            </View>
            <View>
              <View style={readMore && { height: 100 }}>
                <Text
                  onPress={readMoreHandler}
                  style={{
                    color: "#696969",
                    fontSize: 16,
                    textAlign: "justify",
                  }}
                >
                  {data.description}
                </Text>
              </View>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 16,
                  textAlign: "justify",
                  marginTop: -10,
                }}
              >
                {readMore && "..."}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {/* <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#FFB7B7",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 30,
                }}
              >
                <Image style={{ width: 24, height: 24 }} source={book} />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={handler}
                style={{
                  backgroundColor: "#D72A2A",
                  alignItems: "center",
                  borderRadius: 50,
                  paddingHorizontal: 50,
                  paddingVertical: 13,
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                  >
                    Read now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Simular novels */}
          <SimularNovel type={route.params?.type} />
          {/* Comment */}
          <CommentNovel id={route.params?.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IntroPage;

const styles = StyleSheet.create({
  intro: {
    position: "relative",
    backgroundColor: "#fff",
  },
  background: {
    height: 320,
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    top: -40,
    padding: 16,
    paddingTop: 30,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#D72A2A",
    marginRight: 8,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  colors: {
    fontSize: 16,
    color: "#696969",
    marginHorizontal: 8,
  },
});
