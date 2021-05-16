/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const OneDayCart = (props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
        {props.labelData.one_day_plan}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          {props.mealList.meal_list.map((e, i) => {
            return (
              <Text key={i}>
                {e.name}
                {', '}
              </Text>
            );
          })}
        </View>
        <View>
          <View style={styles.thiredSection}>
            <Text style={{paddingRight: 10}}>{props.labelData.total}</Text>
            <Text>KD {props.mealList.total_amount}</Text>
          </View>

          <View style={styles.thiredSection}>
            <Text style={{paddingRight: 10}}>{props.labelData.delivery}</Text>
            <Text>KD {props.mealList.delivery_amount}</Text>
          </View>

          <View style={styles.thiredSection}>
            <Text style={[styles.total, {paddingRight: 10}]}>
              {props.labelData.total}
            </Text>
            <Text style={styles.total}>KD {props.mealList.sub_amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OneDayCart;

const styles = StyleSheet.create({
  total: {color: '#f2A884', fontSize: 20, fontWeight: 'bold'},
  thiredSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 2,
  },
});
