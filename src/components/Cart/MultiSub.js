/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React from 'react';
const {width} = Dimensions.get('window');
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
const MultiSubCart = (props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
        {props.labelData.Multi_Sub_Plan}
      </Text>
      <View style={{flexDirection: 'column'}}>
        {props.mealList.week_package.map((e, i) => {
          return (
            <View
              key={i}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>
                {props.labelData.week} {e.week}
              </Text>
              <Text>{e.program_name}</Text>
              <Text>{e.plan_packages_name}</Text>
              <Text> {e.program_price} KD</Text>
            </View>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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

export default MultiSubCart;
const styles = StyleSheet.create({
  total: {color: '#f2A884', fontSize: 20, fontWeight: 'bold'},
  thiredSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 2,
  },
});
