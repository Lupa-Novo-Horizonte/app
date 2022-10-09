import React, {useState} from 'react';
import sharedStyles from '../sharedStyles'
import sharedVariables from '../sharedVariable'
import SelectDropdown from 'react-native-select-dropdown';
import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import TopBar from '../../Components/CustomTopBarWithBack';
import HorizontalBar from '../../Components/HorizontalBar';
import AlertModal from '../../Components/AlertModal';
import Api from '../../Api';

export default () => {

    // Data injection
    const backTo = 'Home';

    const yesNo = ["Sim", "Não"];
    const numbers = [1,2,3,4,5,6,7];
    const [ddl01, setDdl01] = useState();
    const [ddl02, setDdl02] = useState();
    const [ddl03, setDdl03] = useState();
    
    // Save
    const saveData = async () =>{
        if (ddl01 == null || ddl02 == null || ddl03 == null )
        {
            changeModalVisible(true);
            setMessage('Preencha todos os campos.');
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
                let res = await Api.postAsphalt(markerRegion.coords.latitude.toString(), markerRegion.coords.longitude.toString(), ddl01, ddl02, ddl03, token);
                
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

    // Modal
    const [isModalVisible, setisModalVisible] = useState(false);
    const [message, setMessage] = useState('Empty');
        
    const changeModalVisible = (bool) => {
        setisModalVisible(bool);
    }

    // Map config    
    const navigation = useNavigation();
        
    const [markerRegion, setMarketRegion] = useState({
        coords:null
    });

    const handleLocationFinder = async () => {
        let gps = await AsyncStorage.getItem('gps');

        if(gps == 'granted'){
            Geolocation.getCurrentPosition((info) =>{
                const region = {
                    coords:{
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        latitudeDelta: 0.00045,
                        longitudeDelta: 0.00045
                    }
                };
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
                        onPress={(e) => setMarketRegion({ coords: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, longitudeDelta: 0.00045, latitudeDelta: 0.00045}})}
                        onMapLoaded={(e) => handleLocationFinder()}
                    >
                        {   
                            markerRegion.coords != null &&    
                            <Marker coordinate={markerRegion.coords} pinColor={sharedVariables.asphaltIconColor} />
                        }
                    </MapView>
                </View>
                
                {   
                markerRegion.coords != null &&  
                <Text style={sharedStyles.warningText}>Caso necessário, ajuste o mapa para a localização exata da ocorrência.</Text>
                //<Text style={sharedStyles.warningText}>Latitude: {markerRegion.coords.latitude} / Longitude: {markerRegion.coords.longitude}</Text>
                }

                <Text style={sharedStyles.headerSubTitle}>Calçadas e Asfalto</Text>

                <View style={sharedStyles.area}>
                    <Text style={sharedStyles.headerSubTitleSmaller}>Em relação a esta rua:</Text>
                </View>

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
                
                <View style={sharedStyles.saveArea}>
                    <TouchableOpacity style={sharedStyles.saveButton} onPress={saveData}>
                        <Text style={sharedStyles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>

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