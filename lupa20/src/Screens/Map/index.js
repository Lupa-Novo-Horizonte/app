import React, {useState, useEffect} from 'react';
import { Platform, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import { Container } from './styles';
import styled from 'styled-components';

export default () => {
       
  const changeModalVisible = (bool) => {
      setisModalVisible(bool);
  }

  //Map setup
  const [region, setRegion] = useState({
    coords:null
  });
  
  // My location
  const handleLocationFinder = async () => {
    let result = await request(
      Platform.OS === 'ios' ?
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if(result == 'granted'){
        Geolocation.getCurrentPosition((info) =>{
          const region = {
            coords:{
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
        };
        setRegion(region);
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000
        })
    }
    else{
      console.log('Not granted: ' + result);
    }
  }

  // Markers
  const [markers, setMarkers] = useState([]);
    
  const getMarkers = async () => {
    let token = await AsyncStorage.getItem('token');
      let res = await Api.getMap(token);
      if(res != null){
          setMarkers(res.regions);
      } 
      else 
      {
          changeModalVisible(true);
          setMessage('Não foi carregar pontos. Tente novamente mais tarde.');
      }
  }

  useEffect(() => {
    getMarkers ();
  }, [])

  var renderMarkers = markers.map((item, index) => { 

        let question1 = item.description.split('|')[0];
        let question2 = item.description.split('|')[1];
        let question3 = item.description.split('|')[2];
        let question4 = item.description.split('|')[3];

        return(
          <Marker
            key={index}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
              <Callout>
              <View style={{height: 120, width: 210}}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <Text>- {question1}</Text>
                <Text>- {question2}</Text>
                <Text>- {question3}</Text>
                <Text>- {question4}</Text>
              </View>
              </Callout>
            </Marker>
        )
    });
  
    
  //==============================================================================


  return (
    <Container>
          
      <MapView
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor="#092654"
        region={region.coords}
        zoomEnabled={true}
        scrollEnabled={true}
        showsScale={true}
        style={{
          flex: 1,
          minHeight: 200
        }}
        showsUserLocation={true}
        onMapLoaded={(e) => handleLocationFinder()}
      >      
      {     
         renderMarkers
      }
      </MapView>
    </Container>
  );
}