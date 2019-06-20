import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class ButtonsLayout extends Component {
  render() {

    let arrComponents = []
    for (const id in this.props.data) {
      const accesorie = this.props.data[id];
      arrComponents.push(
        <View key={id}>
          <Text style={styles.textButton}>{accesorie.name}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={()=>{this.props.handlePress(accesorie, id)}}
            style={styles.button} >
            <MaterialCommunityIcons
              name= {accesorie.status ? 'lightbulb-on' : "lightbulb"}
              size={32}
              color={accesorie.status ? "yellow" : "white"} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <>
        {arrComponents}
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2c75af',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textButton: {
    color: 'white'
  }
});

export default ButtonsLayout;
