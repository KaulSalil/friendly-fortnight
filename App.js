import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(`json res:${JSON.stringify(json.results)}`);
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("https://randomuser.me/api/?results=20");
  }, []);

  return (
    <ScrollView>
      {data &&
        data.map((item, idx) => {
          return (
            <View key={idx}>
              <Image
                source={{ uri: item.picture.large }}
                style={styles.image}
              />
              <View>
                <Text style={styles.textName}>
                  {item.name.first} {item.name.last}
                </Text>
                <Text style={styles.textEmail}>{item.login.username}</Text>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textFriends: {
    fontSize: 20,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
});
