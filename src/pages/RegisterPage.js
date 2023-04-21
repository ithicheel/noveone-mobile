import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import login from "../images/login.png";
import lock from "../images/padlock.png";
import email from "../images/email.png";
import user from "../images/user.png";

const RegisterPage = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
          flex: 1,
          justifyContent: 'space-around' 
        }}>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              backgroundColor: "#f8f8f8",
            }}
          >
            <Image
              source={login}
              style={{ height: 250, width: 164, marginTop: 50 }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: "#111",
                textAlign: "center",
                marginVertical: 15,
              }}
            >
              NOVEONE
            </Text>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  marginBottom: 20,
                  width: 300,
                  paddingBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#696969",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={user}
                  style={{ height: 18, width: 18, marginRight: 10 }}
                />
                <TextInput
                  style={{ fontSize: 18, width: 240 }}
                  placeholder="Username"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: 300,
                  paddingBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#696969",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={email}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <TextInput
                  style={{ fontSize: 18, width: 240 }}
                  placeholder="Email"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: 300,
                  paddingBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#696969",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={lock}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <TextInput
                  secureTextEntry={true}
                  style={{ fontSize: 18, width: 240 }}
                  placeholder="Password"
                />
              </View>
              <View
                style={{
                  marginBottom: 5,
                  width: 300,
                  paddingBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#696969",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={lock}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <TextInput
                  secureTextEntry={true}
                  style={{ fontSize: 18, width: 240 }}
                  placeholder="Re-password"
                />
              </View>
              <Text
                style={{ marginBottom: 15, color: "#696969", marginLeft: 100 }}
              >
                Үйлчилгээний нөхцөл харах
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor: "#354052",
                    width: 300,
                    textAlign: "center",
                    paddingVertical: 10,
                    borderRadius: 50,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  REGISTER
                </Text>
              </TouchableOpacity>
              <Text
                style={{ marginVertical: 10, fontSize: 12, color: "#696969" }}
              >
                Нэвтрэхийг хүсвэл
                <Text style={{ color: "#111", fontWeight: "bold" }} onPress={() => props.navigation.navigate("Login") } >
                  {" "}
                  энд
                </Text>{" "}
                дарна уу?
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({});
