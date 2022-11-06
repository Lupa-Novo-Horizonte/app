import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import sharedVariables from '../sharedVariable';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import { Container, LegendArea, LegendSubArea, FloatLegend, LegendBoxColor01, LegendBoxColor02, LegendBoxColor03, LegendBoxColor04, LegendBoxColor05, LegendBoxColor06, LegendBoxColor07 } from './styles';

export default () => {
       
  // Modal
  const [isModalVisible, setisModalVisible] = useState(false);
  const [message, setMessage] = useState('Empty');
  const changeModalVisible = (bool) => {
      setisModalVisible(bool);
  }

  //Map setup
  const [region, setRegion] = useState({
    coords:null
  });
  
  // My location
  const handleLocationFinder = async () => {
    let gps = await AsyncStorage.getItem('gps');

    if(gps == 'granted'){
        Geolocation.getCurrentPosition((info) =>{
          const region = {
            coords:{
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: sharedVariables.zoom,
                longitudeDelta: sharedVariables.zoom
            }
        };
        setRegion(region);
        },
        error => {
          console.log(error);
          Alert.alert("Aviso", "Ative o GPS para poder cadastrar!");
          navigation.reset({
              routes:[{ name:'MainTab'}]
          });
        },
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000
        })
    }
    else{
      Alert.alert("Aviso", "Ative o GPS para poder cadastrar!");
            navigation.reset({
                routes:[{ name:'MainTab'}]
            });
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
        let question5 = item.description.split('|')[4];

        let pinColor = 'red';
        switch (item.type){
          case 0:
            pinColor = sharedVariables.asphaltIconColor;
          break;
          case 1:
            pinColor = sharedVariables.collectIconColor;
          break;
          case 2:
            pinColor = sharedVariables.lightIconColor;
          break;
          case 3:
            pinColor = sharedVariables.publicServiceIconColor;
          break;
          case 4:
            pinColor = sharedVariables.sewerIconColor;
          break;
          case 5:
            pinColor = sharedVariables.trashIconColor;
          break;
          case 6:
            pinColor = sharedVariables.waterIconColor;
          break;
        }

        if(item.path == null)
        {
          return(
            <Marker
              key={index}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }} pinColor={pinColor}>
                <Callout>
                <View style={{height: 150, width: 240}}>
                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  <Text>{question1}</Text>
                  <Text>{question2}</Text>
                  <Text>{question3}</Text>
                  <Text>{question4}</Text>
                  <Text>{question5}</Text>
                </View>
                </Callout>
              </Marker>
          )
        }
        else
        {
          return(
            <Polyline key={index} coordinates={JSON.parse(item.path)} strokeWidth={4} strokeColor={pinColor} />
          )
        }
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
          minHeight: 250
        }}
        showsUserLocation={true}
        onMapLoaded={(e) => handleLocationFinder()}
      >      
      {     
         renderMarkers
      }
      </MapView>
      
      <FloatLegend>
        <LegendArea>
          <LegendSubArea>
            <LegendBoxColor01/>
            <Text>Iluminação Pública</Text>
          </LegendSubArea>
          <LegendSubArea>
            <LegendBoxColor02/>
            <Text>Água Portável</Text>
          </LegendSubArea>
        </LegendArea>
        
        <LegendArea>
          <LegendSubArea>
            <LegendBoxColor03/>
            <Text>Limpeza Urbana</Text>
          </LegendSubArea>
          <LegendSubArea>
            <LegendBoxColor04/>
            <Text>Tratamento de Esgoto</Text>
          </LegendSubArea>
        </LegendArea>
        
        <LegendArea>
          <LegendSubArea>
            <LegendBoxColor05/>
            <Text>Calçadas e Asfalto</Text>
          </LegendSubArea>
          <LegendSubArea>
            <LegendBoxColor06/>
            <Text>Coleta de Lixo</Text>
          </LegendSubArea>
        </LegendArea>
      </FloatLegend>

    </Container>
  );
}