import React from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";

const getData = async () => [
  {
    text: "hello",
  },
  {
    text: "goodbye",
  },
];

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getData();
        setData(res);
      } catch (error) {
        console.log("something went wrong", error);
      }
    };
    fetch();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
