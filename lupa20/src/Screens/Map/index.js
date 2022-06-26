import React, {useState, useEffect} from 'react';
import { Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import { Container } from './styles';

export default () => {
       
  const changeModalVisible = (bool) => {
      setisModalVisible(bool);
  }

  //Map setup
  const [region, setRegion] = useState({
    initial:{
    latitude: 0.095870,
    longitude: -51.042781,
    latitudeDelta: 10.01,
    longitudeDelta: 10.01
    }
  });
  
  // My location
  const getMyLocation = async () => {
    let result = await request(
      Platform.OS === 'ios' ?
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if(result == 'granted'){
      Geolocation.getCurrentPosition((info) =>{
        setRegion({initial:{ latitude:info.coords.latitude, longitude:info.coords.longitude, latitudeDelta:0.01, longitudeDelta: 0.01}});
      },
      error => console.log(error),
      {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 3600000
      }
      )
    }
    else{
      console.log(result);
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
        return(
          <Marker
            key={index}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.title}
            description={item.description}
          />
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
        initialRegion={region.initial}
        style={{
          flex: 1,
          minHeight: 200
        }}
        showsUserLocation={true}
        //onMapReady={(e) => getMarkers()}
        onMapLoaded={(e) => getMyLocation()}
      >      
      {     
         renderMarkers
      }
      </MapView>
    </Container>
  );
}