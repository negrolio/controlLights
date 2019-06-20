import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseUrl, accesories } from './config';
import ButtonsLayout from './components/ButtonsLayout';

export default class App extends React.Component {

  state = {
    accesories
  }

  async componentDidMount(){

    const response = accesories.map( async elem => {
      const res = await fetch(`${baseUrl}${elem.type}/${elem.pin}`)
      const status = await res.json()
      return {...elem, status}
    })
    Promise.all(response).then( newAccesories => this.setState({accesories: {...newAccesories}}))

  }

  handlePress = (accesorie, id) => {
    const { accesories } = this.state

    this.setState({
      accesories: {
        ...accesories,
        [id]: {
          ...accesorie,
          status: !accesorie.status
        }
      }
    }, () => {
      this.callLigth(accesorie)
    })
  }

  callLigth = (elem) => {
    const onOff = elem.status ? 0 : 1
    //fetch(`${baseUrl}${elem.type}/${elem.pin}/${onOff}`)
  }

  addAccesorie = () => {

  }

  renderButtons = () => {
    const { accesories } = this.state;
    let arrComponents = []
    for (const id in accesories) {
      const accesorie = accesories[id];
      arrComponents.push(
        <View key={id}>
          <Text style={styles.textButton}>{accesorie.name}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={()=>{this.handlePress(accesorie, id)}}
            style={styles.button} >
            <MaterialCommunityIcons
              name= {accesorie.status ? 'lightbulb-on' : "lightbulb"}
              size={32}
              color={accesorie.status ? "yellow" : "white"} />
          </TouchableOpacity>
        </View>
      )
    }
    return arrComponents
  }

  render () {
console.log(this.state);
    return (
      <View style={styles.container}>
        <ButtonsLayout data={this.state.accesories} handlePress={this.handlePress}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74797e',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
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
