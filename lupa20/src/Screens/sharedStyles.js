import { StyleSheet, Dimensions, PickerIOSComponent } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

// Main stack
  banner: {
    width: 280,
    height:80,
    resizeMode:'stretch', 
    backgroundColor: '#092654'
 },
 
 viewTop:{
  flex: 1.2,
  backgroundColor: '#092654',
  alignItems:'center',
  justifyContent:'center'
 },
 
 viewMiddle:{
  flex: 7,
  height: 600,
  backgroundColor: '#FFF'
 },

 viewBottom:{
  flex: 0.8, 
  backgroundColor: '#092654', 
  alignItems:'center', 
  justifyContent:'center'
 },
 
ddlButton:{
  backgroundColor: '#fff',
  width:90,
  borderRadius:5,
  borderColor: '#707070',
  borderWidth:1, 
  height: 30
},


// Forms
ddlButtonText:{
  fontSize: 12,
  color: '#707070'
},

ddlStyle:{
  backgroundColor: '#fff',
  width:90,
  borderRadius:5,
  borderColor: '#707070',
  borderWidth:1
},

ddlRow:{
  backgroundColor: '#fff',
  borderBottomColor: '#707070',
  height: 30,
  width:90
},

ddlRowText:{
  fontSize: 12,
  color: '#707070'
},

container:{
  flex: 1,
  backgroundColor: '#fff'
},

scroller:{
  flexDirection: 'column',
  padding: 15
},

titleText: {
    fontSize: 13,   
    color: '#092654',
    marginBottom: -10
},

captureText: {
  fontSize: 13,   
  color: '#092654',
  marginTop: 10,
  marginBottom:25
},

areaFree:{
  flexDirection: 'row',
  marginLeft:5,
  marginRight:5,
  height:50
},

area:{
    flexDirection: 'row',
    marginLeft:5,
    marginRight:5,
    marginBottom:20
},

areaRadio:{
  flexDirection: 'row',
  marginLeft:5,
  marginRight:5,
  marginTop:-15,
  marginBottom:20
},

subArea02:{
    flex: 2.5,
    alignItems: 'flex-end'
},

subArea01:{
    flex: 6.5,
    justifyContent: 'center',
    flexDirection: 'column'
},

subSubArea01:{
    flex:9,
    justifyContent: 'flex-start'
},

subSubArea01TwoLine:{
  flex:9,
  minHeight: 40,
  justifyContent: 'flex-start',
},

subSubArea02:{
    justifyContent: 'flex-end'
},

saveArea:{
    justifyContent: 'center',
    alignItems: 'center'
},

saveButton:{
    height: 60,
    backgroundColor: '#00a5fe',
    borderRadius: 15,
    width:100,
    justifyContent: 'center',
    alignItems: 'center'
},

saveButtonText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
},

captureButton:{
  height: 100,
  backgroundColor: '#00a5fe',
  borderRadius: 100,
  width:100,
  justifyContent: 'center',
  alignItems: 'center'
},

headerSubTitle:{
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#092654',
    textAlign: 'center'
},

headerSubTitleSmaller:{
  fontSize: 16,
  fontWeight: 'bold',
  color: '#092654',
  textAlign: 'center'
},

warningText:{
    fontSize: 10,
    color: '#707070',
    marginTop: -15,
    marginBottom: 15,
    marginLeft:5,
    marginRight:5
},

modal:{
  //modal
}

});

export default styles;