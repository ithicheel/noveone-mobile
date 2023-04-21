import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import login from "../images/register.png";
import lock from "../images/padlock.png";
import emailImg from "../images/email.png";
import validator from "validator";
import axios from "../../axios";
import { storeToken } from "../Auth/AuthToken";
import UserContext from "../contexts/Context";
const LoginPage = (props) => {
  const [email, setEmail] = useState("admin@noveone.com");
  const [password, setPassword] = useState("qwe123!@#");
  const state = useContext(UserContext);
  const [alert, setAlert] = useState({
    isAlert: false,
    message: "",
  });
  const loginHandler = () => {
    if (validator.isEmail(email) && password.length >= 8) {
      axios
        .post("/user/login", { password, email })
        .then((result) => {
          if (result.data.data === null) {
            setAlert({
              isAlert: true,
              message: result.data.message,
            });
          } else {
            state.setUser(result.data.data);
            state.setIsLogged(true);
            state.setToken(result.data.token);
            const obj = JSON.stringify(result.data);
            storeToken(obj);
            props.navigation.navigate("Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlert({
        isAlert: true,
        message: "Нууц үг эсвэл Майл буруу байна.",
      });
    }
  };
  return (
    <View style={{ marginTop: 28, height: "100%" }}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Image
          source={login}
          style={{ height: 250, width: 270, marginTop: 50 }}
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
              source={emailImg}
              style={{ height: 20, width: 20, marginRight: 10 }}
            />
            <TextInput
              style={{ fontSize: 18, width: 240 }}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View
            style={{
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
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
          <Text
            style={{
              textAlign: "right",
              marginBottom: 15,
              fontSize: 12,
              color: "#696969",
              marginLeft: 180,
              marginTop: 5,
            }}
          >
            Forger Password?
          </Text>
          {alert.isAlert && (
            <Text
              style={{
                marginBottom: 15,
                fontSize: 12,
                color: "#FF0000",
                marginTop: 5,
              }}
            >
              {alert.message}
            </Text>
          )}
          <TouchableOpacity onPress={loginHandler}>
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
              LOGIN
            </Text>
          </TouchableOpacity>
          <Text style={{ marginVertical: 10, fontSize: 12, color: "#696969" }}>
            Бүртгүүлэхийг хүсвэл
            <Text
              style={{ color: "#111", fontWeight: "bold" }}
              onPress={() => props.navigation.navigate("Register")}
            >
              {" "}
              энд
            </Text>{" "}
            дарна уу?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
