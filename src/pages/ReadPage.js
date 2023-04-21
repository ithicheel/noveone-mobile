import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

const ReadPage = ({ route }) => {
  const [novelId, setNovelId] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const changePageHandler = () => {
    setPageNumber(pageNumber + 1);
  };
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
    <View style={{ backgroundColor: "#fff" }}>
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
                <Text style={{ fontSize: 16, color: "#454545", marginBottom: 20 }}>
                  Chapter {index + 1}   - {element.name} -
                </Text>

                <Text>{element.content};</Text>
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
