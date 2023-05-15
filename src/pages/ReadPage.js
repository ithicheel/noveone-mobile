import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import settings from "../images/setting.png";
import addChapter from "../images/add-file.png";
import colorPicker from "../images/color-picker.png";
import fontSize from "../images/font-size.png";
import fontSize2 from "../images/font-size2.png";
import { ColorPicker } from 'react-native-color-picker';
const ReadPage = ({ route }) => {
  const [novelId, setNovelId] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [snow, setSnow] = useState(false);
  const [size, setSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const changePageHandler = () => {
    setPageNumber(pageNumber + 1);
  };
  const settingsHandler = () => {
    console.log("first")
    if (showSettings) setShowSettings(false);
    else setShowSettings(true);
  };
  const chapterHandler = () => {
    
  }
  const colorHandler = () => {
    setSnow(true);
  }
  const fontSizeHandler = () => {
    let fontsize = size + 1;
    setSize(fontsize);
  }
  const fontSize2Handler = () => {
    let fontsize = size -1;
    setSize(fontsize);
  }
  useEffect(() => {
    const id = route.params?.novelId;
    axios
      .get(`/chapter/page/${id}/${pageNumber}`)
      .then((result) => {
        if (result.data) {
          const newData = [...data];
          newData.push(result.data.data);
          setData(newData);
        }
      })
      .catch((error) => console.log(error));
    axios
      .get(`/chapter/count/${id}`)
      .then((result) => {
        if (result.data) {
          setPageCount(result.data.data[0].count);
        }
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);
  return (
    <View style={{ backgroundColor: "#fff", zIndex:1 }}>
      <View
        style={{
          backgroundColor: "#d9d9d9",
          borderBottomLeftRadius: 20,
          borderTopLeftRadius: 20,
          width: 50,
          position: "absolute",
          right: 0,
          top: 500,
          paddingTop: 10,
          paddingLeft: 10,
          zIndex: 10
        }}
      >
          <TouchableOpacity onPress={settingsHandler} >
            <Image  style={{ width: 24, height: 24, marginBottom: 10 }} source={settings} />
          </TouchableOpacity>
          {showSettings && 
            <>
              <TouchableOpacity onPress={settingsHandler} >
                <Image style={{ width: 30, height: 30, marginBottom: 10 }} source={addChapter} />
              </TouchableOpacity>
              <TouchableOpacity onPress={colorHandler} >
                <Image  style={{ width: 26, height: 26, marginBottom: 10, marginLeft: 4 }} source={colorPicker} />
              </TouchableOpacity>
              <TouchableOpacity onPress={fontSizeHandler} >
                <Image style={{ width: 30, height: 30, marginBottom: 10 }} source={fontSize} />
              </TouchableOpacity>
              <TouchableOpacity onPress={fontSize2Handler} >
                <Image style={{ width: 30, height: 30, marginBottom: 10 }} source={fontSize2} />
              </TouchableOpacity>
            </>
          }
      </View>
      <SafeAreaView
        style={{
          marginBottom: 15,
          marginHorizontal: 10,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 15 }}
        >
          {data.map((element, index) => {
            return (
              <View
                key={index}
                style={
                  index > 0
                    ? {
                        marginTop: 30,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderColor: "#696969",
                      }
                    : {}
                }
              >
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold' , color: "#454545", marginBottom: 20 }}
                >
                  Chapter {index + 1} - {element.name} -
                </Text>

                <Text style={{fontSize: size}} >{element.content};</Text>
              </View>
            );
          })}

          <View style={{ justifyContent: "center", marginTop: 10 }}>
            {pageNumber + 1 === pageCount ? (
              <></>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  paddingHorizontal: 50,
                  paddingVertical: 13,
                }}
                onPress={changePageHandler}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#696969",
                    }}
                  >
                    CLICK HERE TO CONTINUE
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReadPage;

const styles = StyleSheet.create({});
