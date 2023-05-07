import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Switch } from "@react-native-material/core";

const ToggleCONotifications = () => {
  const [checked, setChecked] = useState(true);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  useEffect(()=>{
    if (checked) {
      fetch(`http://192.168.0.100:8000/data/set/CO/${minValue}/${maxValue}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}})
        .then(()=>console.log("thresholds set successfully"))
        .catch((error) => console.error(error));
    }
  },[minValue,maxValue]);

  const handleSwitch  = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Recieve notifications for CO level</Text>
        <Switch value={checked} onValueChange={handleSwitch} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Min</Text>
        <TextInput
          style={[styles.input, checked ? null : styles.disabled]}
          value={minValue}
          onChangeText={setMinValue}
          editable={checked} keyboardType="numeric"
        />
        <Text style={styles.label}>Max</Text>
        <TextInput
          style={[styles.input, checked ? null : styles.disabled]}
          value={maxValue}
          onChangeText={setMaxValue}
          editable={checked} keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  label: {
    width: 40,
    textAlign: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  disabled: {
    backgroundColor: "#bcc",
    color: "#ccc",
  },
});

export default ToggleCONotifications;
