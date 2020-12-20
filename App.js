import React from 'react';
import { StyleSheet, Button, View, TouchableOpacity, Image, Text, Alert, TextInput } from 'react-native';
import { Pedometer } from 'expo-sensors';

class App extends React.Component{
  state = {
    isPedometerAvailable: 'checking',
    buttonText : 'Start Counter',
    pastStepCount: 0,
    currentStepCount: 0,
    prevStepCount : 0
  };
  
  // componentDidMount() {
  //   this._subscribe();
  // }

  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );
pause = () =>{
  prevSTepCount = currentStepCount;
  this._unsubscribe();
};


function startStepsHandler () {
  console.log(`Stae :  ${buttonText}`);
  this.setState({ buttonText :"Stop Counter"});
  console.log(`Stae :  ${buttonText}`);
  this._subscribe();
};
stopStepCount = () =>{
  this._unsubscribe();
};
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

   render() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style = {[styles.ButtonsContainer]} onPress =  {this.startStepsHandler} >
      <View>
          <Text  style = {styles.ButtonText}> {this.state.buttonText} </Text>
      </View>
      
       </TouchableOpacity>
       <View style = {[styles.Innercont]}> 
      <Text> Current steps Count are : {this.currentStepCount}  </Text>
      </View>
       <TouchableOpacity style = {[styles.ButtonsContainer]} onPress =  {() =>{stopStepHandler()} } >
      <View>
          <Text  style = {styles.ButtonText}> Stop Counter </Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity style = {[styles.ButtonsContainer]}>
      <View>
          <Text  style = {styles.ButtonText}> Pause Counter </Text>
          </View>
       </TouchableOpacity>
       <Text>{this.state.currentStepCount}</Text>
      
  

    </View>
      
  );
}
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  ButtonsContainer:{
    backgroundColor:"#ee7213",
    //fontsize:16,,
    borderRadius:4,
    paddingVertical:12,
    marginTop:30,
    marginBottom:80,
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"rgba(255,22,84,0.24)",
    shadowOffset:{width:0,height:9},
    shadowOpacity:1,
    shadowRadius:20,
    flexDirection :"row",
    
  },
  ButtonText:{
     color: '#fff',
     fontSize:18,
     fontWeight:"700",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  Innercont:{
     marginTop: -25,
     marginBottom:10,

  },
});

export default App;