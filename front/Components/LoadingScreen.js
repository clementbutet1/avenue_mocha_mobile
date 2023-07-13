import React from "react";
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color="#d54133"
        size="small"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
