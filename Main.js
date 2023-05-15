import * as React from "react";
import { TouchableOpacity, Image, Text, View, BackHandler } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/pages/HomePage";
import menuImg from "./src/images/menu.png";
import NovelsPage from "./src/pages/NovelsPage";
import IntroPage from "./src/pages/IntroPage";
import ReadPage from "./src/pages/ReadPage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import background from "./src/images/background2.jpg";
import UserContext from "./src/contexts/Context";
import { getToken, removeToken, storeToken } from "./src/Auth/AuthToken";
import ProfilePage from "./src/pages/ProfilePage";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Main = () => {
  const state = React.useContext(UserContext);

  const logoutHandler = () => {
    if (removeToken()) {
      state.setToken(null);
      state.setUser(null);
      state.setIsLogged(false);
    }
    // BackHandler.exitApp();
  };
  React.useEffect(() => {
    getToken()
      .then((result) => {
        if (result !== null || result !== "none") {
          const obj = JSON.parse(result);
          state.setUser(obj.data);
          state.setIsLogged(true);
          state.setToken(obj.token);
        } else {
          state.setIsLogged(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.token]);

  const CustomDrawer = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#1e3faa",
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
        >
          <Image
            style={{ width: 55, height: 55, borderRadius: 55 }}
            source={background}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#1e3faa",
              marginLeft: 10,
            }}
          >
            NOVEONE
          </Text>
        </View>
        <DrawerItemList {...props} />
        {state.isLogged && (
          <TouchableOpacity onPress={logoutHandler} style={{ padding: 20 }}>
            <Text style={{ color: "#696969" }}>Exit</Text>
          </TouchableOpacity>
        )}
      </DrawerContentScrollView>
    );
  };

  const HomeNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          // headerRight: (props) => (
          //   <TouchableOpacity
          //     style={{ margin: 20, marginTop: 0 }}
          //     onPress={navigation.toggleDrawer}
          //   >
          //     <Image style={{ width: 40, height: 40 }} source={menuImg} />
          //   </TouchableOpacity>
          // ),
          // headerLeft: (props) => <Text></Text>,
        })}
        initialRouteName="Read"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          options={{ headerTransparent: true, headerTitle: "" }}
          name="Home"
          component={HomePage}
        />
        <Drawer.Screen
          options={{
            headerTitle: "Novels",
            // headerTitleStyle: { marginTop: 10, color: "#696969" },
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
          name="Novels"
          component={NovelsPage}
        />
        {state.isLogged &&
          <Drawer.Screen
            options={{
              headerTitle: "Profile",
              // headerTitleStyle: { marginTop: 10, color: "#696969" },
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
            name="Profile"
            component={ProfilePage}
          />
        }
        {!state.isLogged && (
          <>
            <Drawer.Screen
              options={{
                headerTitle: "",
                headerTransparent: true,
                headerTitleStyle: { marginTop: 10, color: "#696969" },
              }}
              name="Login"
              component={LoginPage} //login
            />
            <Drawer.Screen
              options={{
                headerTitle: "",
                headerTransparent: true,
                headerTitleStyle: { marginTop: 10, color: "#696969" },
              }}
              name="Register"
              component={RegisterPage}
            />
          </>
        )}
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerShown: false,
            headerTitleStyle: { marginTop: 10, color: "#696969" },
          }}
          name="HomeNavigator"
          component={HomeNavigator}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerTitle: "Intro",
            // headerTransparent: true,
            headerTitleStyle: { marginTop: 10, color: "#696969" },
          })}
          name="Intro"
          component={IntroPage}
        />
        <Stack.Screen
          options={{ headerTitle: "Read", headerBackTitle: "Intro" }}
          name="Read"
          component={ReadPage}
        />
        {/* <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTitleStyle: { marginTop: 10, color: "#696969" },
        }}
        name="Login"
        component={LoginPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTitleStyle: { marginTop: 10, color: "#696969" },
        }}
        name="Register"
        component={RegisterPage}
      /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
