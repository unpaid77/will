import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {filterActions} from '../actions/filterData';
import Header from '../components/Header/Header';
import {homeActions} from '../actions/home';
import {MEAL_SEARCH} from '../util/api';
import {HOME_FILTER, HOME_SEARCH, CROSS} from '../_helpers/ImageProvide';
import {GET_API, FILTER_API} from '../util/api';
let styleCss = require('../GlobalStyle');
const filterComponent = ({navigation, ...props}) => {
    const [isLoadingApply, setIsLoadingApply] = useState(false) 
    const [isLoadingClear, setIsLoadingClear] = useState(false) 
  const [filterData, setFilterData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([])
  
  useEffect(() => {
    GET_API('filter/weeks/list').
    then((data) => {
        setFilterData(data.data);
      });
  }, [])

  const selectFilters = (item) => {
    let filterArray = [...selectedFilters]
    if ( filterArray.includes(item.id) ) {
        let index = filterArray.findIndex(x => x === item.id)
        filterArray.splice(index, 1);
        setSelectedFilters(filterArray)
    }
    else {
    setSelectedFilters([...filterArray, item.id])
  } 
  }

  const applyFilters = () => {
      if(selectedFilters.length === 0) {
        Toast.showWithGravity(
            'No filters selected',
            Toast.SHORT,
            Toast.BOTTOM,
          )
          return
      }
    setIsLoadingApply(true)
    var formData = new FormData();
    selectedFilters.map( x => formData.append('week', x))
    setTimeout(() => {
        FILTER_API(formData, 'filter')
        .then(responseJson => {
             setIsLoadingApply(false)
             responseJson.data.length > 0 ? Toast.showWithGravity(
              'Filters successfully applied',
              Toast.SHORT,
              Toast.BOTTOM,
        ) : Toast.showWithGravity(
          'No results found',
          Toast.SHORT,
          Toast.BOTTOM,
    )      
            props.filterAction(responseJson)
        })
    }, 1000);
    setTimeout(() => {
        navigation.navigate('Home')
    }, 1600);
  }

  const clearFilters = () => {
    setIsLoadingClear(true)
    setSelectedFilters([])
    var formData = new FormData();
    formData.append('week', 0)
  setTimeout(() => {
      FILTER_API(formData, 'filter')
  .then(responseJson => {
    setIsLoadingClear(false)
    Toast.showWithGravity(
        'Filters successfully cleared',
        Toast.SHORT,
        Toast.BOTTOM,
        )
        props.filterAction({data:null})
      }
  )
  }, 1000);
  
}

  const renderItem = (item, i) => {
    return (
      <TouchableOpacity
        // style={{flex:1, height:'100%', width:'100%'}}
        key={{i}}
        onPress={() => selectFilters(item)} >
    <View style={{margin: 5, backgroundColor: selectedFilters.includes(item.id) ? '#F2A884':'#E0E0E0', 
    paddingVertical:12, paddingHorizontal:16 ,borderRadius:8}}>
          <Text style={{...styles.searchResultText, color:selectedFilters.includes(item.id) ? 'white' : '#1a1824'}}>{item.name}</Text>
    </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Header />
      <TouchableOpacity
              style={{marginTop: 20, marginRight:20 ,alignSelf:'flex-end'}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image style={{height: 15, width: 15}} source={CROSS} />
            </TouchableOpacity>
      <ScrollView contentContainerStyle={{flexDirection:'column', justifyContent:'center',}}>
        <View style={styleCss.mainContainer}>
          <View>
            <Text style={styles.heading}>
              {`Filter your search`}
            </Text>
          </View>
          <View style={styles.searchBar}>
          <Text style={styles.subHeading}>
              {`Categories`}
            </Text>
          </View>
          <View>
            <ScrollView contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}} >
              {filterData.map((item, i) => {
                return <View key={i}>{renderItem(item)}</View>;
              })}
            </ScrollView>
          </View>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:'50%'}}>
              <View style={{width:'90%',height:40, backgroundColor:'#F2A884', borderRadius:8}}>
              <TouchableOpacity style={{height:'100%', width:'100%',justifyContent:'center', alignItems:'center'}}
                onPress={() => applyFilters()}>
                    {isLoadingApply === true ? <ActivityIndicator size={10} color={'white'}/> : <Text style={styles.applyFilters}>{`Apply Filters`}</Text>}
                  
              </TouchableOpacity>
              </View>
              <View style={{width:'30%',height:40, borderRadius:8, marginTop:16}}>
              <TouchableOpacity style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center'}}
              onPress={() => clearFilters()}>
                  {isLoadingClear === true ? <ActivityIndicator size={10} color={'black'}/> :  <Text>{`Clear Filters`}</Text>}
              </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderColor: '#1a1824',
    marginTop: 10,
    paddingBottom: 8,
  },
  iconWidth: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    color: '#1a1824',
    fontWeight: 'bold',
    marginTop: 40,
  },
  subHeading: {
    fontSize: 26,
    color: '#1a1824',
    fontWeight: 'bold',
    marginTop: 20,
  },
  searchResultText: {
    fontSize: 14,
    color: '#1a1824',
  },
  applyFilters: {
      color: 'white',
      fontSize:16,
      fontWeight:'400'
  }
});
const actionCreators = {
    filterAction: filterActions.filterAction,
    homeAction: homeActions.homeAction,
};
export default connect(null, actionCreators)(filterComponent);
