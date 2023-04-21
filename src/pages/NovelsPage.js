import { StyleSheet, ScrollView, View, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import search from "../images/search.png";
import arrowDown from "../images/arrowdown.png";
import SelectDropdown from "react-native-select-dropdown";
import NoveItem from "../components/NoveItem";
import axios from "../../axios";
const NovelsPage = ({ navigation }) => {
  const countries = ["Popular", "The Lastest", "New"];
  const [data, setData] = useState([]);
  const [cateData, setCateData] = useState(["Action", "Mystery", "Drame", "Ramonce"]);
  useEffect(() => {
    axios
      .get("/chapter/chapters/novel")
      .then((result) => {
        if (result.data) {
          setData(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", padding: 16 }}>
      <View>
        <View style={styles.search}>
          <Image source={search} style={styles.searchIcon} />
          <TextInput style={styles.searchText} placeholder="Type of Search" />
        </View>
        <View style={styles.selected}>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Image source={arrowDown} style={{ width: 10, height: 7 }} />
            )}
            getData={(data) =>{
              console.log(data)
            }}
            defaultButtonText={"All"}
            data={cateData}
            rowStyle={styles.selectButton}
            rowTextStyle={styles.selectTextButton}
            buttonStyle={[styles.selectButton, { marginLeft: 10 }]}
            buttonTextStyle={styles.selectTextButton}
          />
          <SelectDropdown
            renderDropdownIcon={() => (
              <Image source={arrowDown} style={{ width: 10, height: 7 }} />
            )}
            defaultButtonText={"Popular"}
            data={countries}
            rowStyle={styles.selectButton}
            rowTextStyle={styles.selectTextButton}
            buttonStyle={styles.selectButton}
            buttonTextStyle={styles.selectTextButton}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 70 }}
      >
        {data.map((el, ind) => {
          return (
            <NoveItem key={ind} index={ind} navigation={navigation} data={el} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NovelsPage;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: 11,
    left: 10,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  searchText: {
    backgroundColor: "#f3f3f3",
    paddingVertical: 5,
    borderRadius: 20,
    width: "100%",
    paddingLeft: 30,
    fontSize: 16,
  },
  selected: {
    marginVertical: 10,
    flexDirection: "row",
  },
  selectButton: {
    height: 30,
    width: 120,
    borderRadius: 5,
    backgroundColor: "#f3f3f3",
  },
  selectTextButton: {
    fontSize: 14,
    color: "#696969",
  },
});
