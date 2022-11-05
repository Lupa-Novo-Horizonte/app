import React, {useState} from 'react';
import sharedStyles from '../sharedStyles'
import sharedVariables from '../sharedVariable'
import SelectDropdown from 'react-native-select-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

import TopBar from '../../Components/CustomTopBarWithBack';
import HorizontalBar from '../../Components/HorizontalBar';
import AlertModal from '../../Components/AlertModal';
import Api from '../../Api';

export default () => {

    // Data injection
    const backTo = 'Home';
    const yesNo = ["Sim", "Não"];
    const [ddl01, setDdl01] = useState();
    const [ddl02, setDdl02] = useState();
    const [ddl03, setDdl03] = useState();
    const [ddl04, setDdl04] = useState(0);
    var radio_props = [
        {label: 'Ponto  ', value: 0 },
        {label: 'Trajeto', value: 1 }
      ];

    // Save
    const saveData = async () =>{
        if ((ddl01 == null || ddl02 == null || ddl03 == null) && ddl04 == 0 )
        {
            changeModalVisible(true);
            setMessage('Preencha todos os campos.');
        }
        else if(ddl04 == 1 && (captureStatus01 != sharedVariables.captureResultStatus.capturado || captureStatus02 != sharedVariables.captureResultStatus.capturado)){
            changeModalVisible(true);
            setMessage('Faça a captura do trajeto para prosseguir.');
        }
        else
        {
            if(markerRegion.coords == null)
            {
                Alert.alert("Aviso", "Ative o GPS para poder cadastrar!");
                navigation.reset({
                    routes:[{ name:'MainTab'}]
                });
            }
            else
            {
                let token = await AsyncStorage.getItem('token');
                if(ddl04 == 0)
                    var res = await Api.postAsphalt(markerRegion.coords.latitude.toString(), markerRegion.coords.longitude.toString(),null, ddl01, ddl02, ddl03, token);
                else
                    var res = await Api.postAsphalt(null, null, JSON.stringify(capturePoint.routeCoordinates), ddl01, ddl02, ddl03, token);
                
                if(res){
                    Alert.alert("Confirmação", "Salvo com sucesso!");
                    navigation.reset({
                        routes:[{ name:'MainTab'}]
                    });
                } 
                else 
                {
                    changeModalVisible(true);
                    setMessage('Não foi possível salvar a ocorrência. Tente novamente mais tarde.');
                }
            }
        }
    }

    // Capture
    const [capturePoint, setCapturePoint] = useState({
        routeCoordinates: [],
        prevLatLng: {"latitude": 37.4220936, "longitude": -122.083922} // comment content. Leave only {}
    });
    const [watchId, setWatchId] = useState();
    const [captureStatus01, setCaptureStatus01] = useState();
    const [captureStatus02, setCaptureStatus02] = useState();
    const [captureButtonStatus, setCaptureButtonStatus] = useState();

    const radionPress = async (value) => {
        handleLocationFinder();
        if(value == 1){
            setDdl04((value));
            setCaptureButtonStatus(sharedVariables.captureButtonStatus.iniciar);
            setCaptureStatus01(sharedVariables.captureResultStatus.aguardando);
            setCaptureStatus02(sharedVariables.captureResultStatus.aguardando);
        }
        else{
            setDdl04((value));
            setCaptureButtonStatus(null);
            setCaptureStatus01(null);
            setCaptureStatus02(null);
            setCapturePoint({routeCoordinates: [], prevLatLng: capturePoint.prevLatLng});// {}
            console.log('Finaliza monitoramento');
            Geolocation.clearWatch(watchId);
            Geolocation.stopObserving();
            setWatchId(null);
        }
    }

    const componentDidMount = async () => {
        console.log(capturePoint);

        var watchId = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude: latitude,
                    longitude: longitude,
                };      
                              
                if(newCoordinate.latitude != capturePoint.prevLatLng.latitude)
                {
                    setCapturePoint(prevState => ({
                        routeCoordinates: [...prevState.routeCoordinates, newCoordinate],
                        prevLatLng: capturePoint.prevLatLng
                      }))

                      setMarketRegion({ coords: { latitude: newCoordinate.latitude, longitude: newCoordinate.longitude, longitudeDelta: sharedVariables.zoom, latitudeDelta: sharedVariables.zoom}})
                      mapRef.current.animateToRegion({ latitude: newCoordinate.latitude, longitude: newCoordinate.longitude, longitudeDelta: sharedVariables.zoom, latitudeDelta: sharedVariables.zoom})
                }
            },
            error => {
                console.log(error);
            },
            { 
                enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 
            },
        );
        return watchId;
    }

    const captureData = async () => {
        if(watchId == null)
        {
            setWatchId(componentDidMount());
            console.log('Inicia monitoramento');
            setCaptureButtonStatus(sharedVariables.captureButtonStatus.finalizar);
            setCaptureStatus01(sharedVariables.captureResultStatus.capturado);
            setCaptureStatus02(sharedVariables.captureResultStatus.aguardando);
        }
        else
        {
            Geolocation.clearWatch(watchId);
            Geolocation.stopObserving();
            setWatchId(null);
            console.log('Finaliza monitoramento');
            setCaptureButtonStatus(sharedVariables.captureButtonStatus.iniciar);
            setCaptureStatus02(sharedVariables.captureResultStatus.capturado);
        }
    }

    // Modal
    const [isModalVisible, setisModalVisible] = useState(false);
    const [message, setMessage] = useState('Empty');
        
    const changeModalVisible = (bool) => {
        setisModalVisible(bool);
    }

    // Map config    
    const navigation = useNavigation();
        
    const [markerRegion, setMarketRegion] = useState({
        coords:null //maybe start to use {}
    });

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
                console.log(info);
                setMarketRegion(region);
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
                timeout: 15000,
                maximumAge: 10000
            })
        }
        else{
            Alert.alert("Aviso", "Ative o GPS para poder cadastrar!");
                navigation.reset({
                    routes:[{ name:'MainTab'}]
            });
        }
    }   

    return (
        <SafeAreaView style={sharedStyles.container}>
            <TopBar backTo={backTo}/>

            <ScrollView style={sharedStyles.scroller}>             
                
                <View style={sharedStyles.area}>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        loadingEnabled={true}
                        loadingIndicatorColor="#092654"
                        region={markerRegion.coords}
                        style={{
                        flex: 1,
                        minHeight: 200
                        }}
                        showsUserLocation={true}
                        onPress={(e) => {
                            if(ddl04 == 0){
                                setMarketRegion({ coords: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, longitudeDelta: sharedVariables.zoom, latitudeDelta: sharedVariables.zoom}})}
                            }
                        }
                        onMapLoaded={(e) => handleLocationFinder()}
                        zoomEnabled={false}
                    >
                        {   
                           (markerRegion.coords != null) &&    
                           <Marker coordinate={markerRegion.coords} pinColor={sharedVariables.asphaltIconColor} />
                        }                        
                        {
                            (ddl04 == 1) &&
                            <Polyline coordinates={capturePoint.routeCoordinates} strokeWidth={4} strokeColor={sharedVariables.asphaltIconColor} />
                        }                        
                        
                    </MapView>
                </View>
                
                { markerRegion.coords != null &&  
                <Text style={sharedStyles.warningText}>Caso necessário, ajuste o mapa para a localização exata da ocorrência.</Text>
                }

                <Text style={sharedStyles.headerSubTitle}>Calçadas e Asfalto</Text>

                <View style={sharedStyles.area}>
                    <Text style={sharedStyles.headerSubTitleSmaller}>Em relação a esta rua:</Text>
                </View>

                <View style={sharedStyles.area}>
                    <View style={sharedStyles.subArea01}>
                        <View style={sharedStyles.subSubArea01}>
                            <Text style={sharedStyles.titleText}>Você está cadastrando:</Text>
                        </View>
                    </View>
                    <View style={sharedStyles.subArea02}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            buttonSize={10}
                            buttonOuterSize={20}
                            formHorizontal={true}
                            onPress={(value) => { radionPress(value) }}
                        />
                    </View>
                </View>
                <View style={sharedStyles.areaRadio} >
                            <HorizontalBar />
                </View>

                { ddl04 == 0 &&

                <View>
                    <View style={sharedStyles.area}>
                        <View style={sharedStyles.subArea01}>
                            <View style={sharedStyles.subSubArea01}>
                                <Text style={sharedStyles.titleText}>A via é asfaltada?</Text>
                            </View>
                            <View style={sharedStyles.subSubArea02}>
                                <HorizontalBar />
                            </View>
                        </View>
                        <View style={sharedStyles.subArea02}>
                            <SelectDropdown
                                defaultButtonText='Selecione'
                                key={'ddl01Key'}
                                data={yesNo} 
                                onSelect={(selectedItem, index) => { setDdl01((selectedItem=='Sim'? true : false))} }
                                buttonStyle={sharedStyles.ddlButton}
                                buttonTextStyle={sharedStyles.ddlButtonText}
                                dropdownStyle={sharedStyles.ddlStyle}
                                rowStyle={ sharedStyles.ddlRow}
                                rowTextStyle={ sharedStyles.ddlRowText}
                                />
                        </View>
                    </View>

                    <View style={sharedStyles.area}>
                        <View style={sharedStyles.subArea01}>
                            <View style={sharedStyles.subSubArea01}>
                                <Text style={sharedStyles.titleText}>A via possui buracos ou crateras?</Text>
                            </View>
                            <View style={sharedStyles.subSubArea02}>
                                <HorizontalBar />
                            </View>
                        </View>
                        <View style={sharedStyles.subArea02}>
                            <SelectDropdown
                                defaultButtonText='Selecione'
                                key={'ddl02Key'}
                                data={yesNo} 
                                onSelect={(selectedItem, index) => { setDdl02((selectedItem=='Sim'? true : false))}}
                                buttonStyle={sharedStyles.ddlButton}
                                buttonTextStyle={sharedStyles.ddlButtonText}
                                dropdownStyle={sharedStyles.ddlStyle}
                                rowStyle={ sharedStyles.ddlRow}
                                rowTextStyle={ sharedStyles.ddlRowText}
                                />
                        </View>
                    </View>
                
                    <View style={sharedStyles.area}>
                        <View style={sharedStyles.subArea01}>   
                            <View style={sharedStyles.subSubArea01TwoLine}>
                                <Text style={sharedStyles.titleText}>Há calçadas pavimentadas de acordo com os requisitos municipais?</Text>
                            </View>
                            <View style={sharedStyles.subSubArea02}>
                                <HorizontalBar />
                            </View>
                        </View>
                        <View style={sharedStyles.subArea02}>
                            <SelectDropdown
                                defaultButtonText='Selecione'
                                key={'ddl03Key'}
                                data={yesNo} 
                                onSelect={(selectedItem, index) => { setDdl03((selectedItem=='Sim'? true : false))}}
                                buttonStyle={sharedStyles.ddlButton}
                                buttonTextStyle={sharedStyles.ddlButtonText}
                                dropdownStyle={sharedStyles.ddlStyle}
                                rowStyle={ sharedStyles.ddlRow}
                                rowTextStyle={ sharedStyles.ddlRowText}
                                />
                        </View>
                    </View>
                </View>
                }

                {ddl04 == 1 &&
                    <View style={sharedStyles.saveArea}>
                        <TouchableOpacity style={sharedStyles.captureButton} onPress={captureData}>
                            <Text style={sharedStyles.saveButtonText}>{captureButtonStatus}</Text>
                        </TouchableOpacity>
                        <Text style={sharedStyles.captureText}>Ponto inicial:  {captureStatus01} | Ponto final: {captureStatus02}</Text>
                        <View style={sharedStyles.areaRadio} >
                            <HorizontalBar />
                        </View>
                    </View> 
                }

                <View style={sharedStyles.saveArea}>
                    <TouchableOpacity style={sharedStyles.saveButton} onPress={saveData}>
                        <Text style={sharedStyles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <View style={sharedStyles.areaFree}></View>

            </ScrollView>

            <Modal 
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisible(false)}
                >
                <AlertModal changeModalVisible={changeModalVisible} msg={message} />
            </Modal>
        </SafeAreaView>
    );
}