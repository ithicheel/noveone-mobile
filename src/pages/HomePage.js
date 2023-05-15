import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomePageCategoryItem from "../components/HomePageCategoryItem";
import NoveItem from "../components/NoveItem";
import background3 from "../images/background4.webp";
import axios from "../../axios";
import VerNovelItem from "../components/VerNovelItem";
const HomePage = ({ navigation }) => {
  const defaultCate = [
    { typed: "Popular", id: 1 },
    { typed: "The Lastest", id: 2 },
    { typed: "New", id: 3 },
  ];
  const [selectedId, setSelectedId] = useState();
  const [popSelectedId, setPopSelectedId] = useState();
  const [cateData, setCateData] = useState([]);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [novelData, setNovelData] = useState([]);

  const selectedType = (item) => {
    let filter = data.filter((el) =>
      el.type.toLowerCase().includes(item.typed.toLowerCase())
    );
    setFilterData(filter);
    setSelectedId(item.id);
  };
  const renderItem = ({ item }) => {
    let backgroundColor = item.id === selectedId ? "#EB2828" : "transparent";
    let color = item.id === selectedId ? "white" : "#696969";
    // if(item.typed === "action") {
    //     backgroundColor = "#EB2828";
    //     color = "white"
    // }
    return (
      <HomePageCategoryItem
        item={item}
        onPress={() => selectedType(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const popRenderItem = ({ item }) => {
    let backgroundColor = item.id === popSelectedId ? "#A218D2" : "transparent";
    let color = item.id === popSelectedId ? "white" : "#696969";
    if (item.typed.toLowerCase() === "popular") {
      backgroundColor = "#A218D2";
      color = "white";
    }
    return (
      <HomePageCategoryItem
        item={item}
        onPress={() => setPopSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  useEffect(() => {
    axios
      .get("/category")
      .then((result) => {
        if (result.data) {
          setCateData(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/chapter/chapters/novel")
      .then((result) => {
        if (result.data) {
          setData(result.data.data);
          setFilterData(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get("/novel").then((result) => {
      if(result.data){
        setNovelData(result.data.data);
      }
    }) 
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerImg}>
          <Image
            source={background3}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerHello}>Good morning</Text>
          <Text style={styles.headerName}>Dodobest</Text>
        </View>
      </View>
      <View>
        <View style={{ marginHorizontal: 10 }}>
          {/* <FlatList
            data={defaultCate}
            renderItem={popRenderItem}
            keyExtractor={(item) => item.id}
            extraData={popSelectedId}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: 'bold'}} >Novels</Text>
        </View>
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
        {/* <View>
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 16 }}>
            Recommend
          </Text>
          <View>
            <ImageBackground
              source={{ uri: `data:image/jpeg;base64,${data[0]?.image}` }}
              style={{
                height: 100,
                marginHorizontal: 10,
                position: "relative",
              }}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text style={[styles.chapter, styles.back]}>
                Chapter {data[0]?.numbers}
              </Text>
              <Text style={[styles.type, styles.back]}>{data[0]?.type}</Text>
            </ImageBackground>
          </View>
        </View> */}
      </View>
      <View>
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={cateData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10, marginHorizontal: 10, height: 350}}
        >
          {filterData.map((el, ind) => {
            return (
              <NoveItem
                key={ind}
                index={ind}
                navigation={navigation}
                data={el}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerImg: {
    backgroundColor: "#888",
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 50,
  },
  headerContent: {
    marginLeft: 10,
  },
  headerHello: {
    fontSize: 14,
    color: "#696969",
  },
  headerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#696969",
  },
  chapter: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  type: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  back: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 10,
    color: "#696969",
  },
});
