import React from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";

import { getData } from "./api";

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
      {data.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          testID="FlatList"
          data={data}
          keyExtractor={(item) => item.text}
          renderItem={({ item }) => (
            <View>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
