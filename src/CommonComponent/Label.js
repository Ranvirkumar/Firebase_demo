import React from 'react';
import { Text, View } from 'react-native';

const Label = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text
        style={
          props.styleLabel && props.styleLabel
        }
      >
        {props.text}
      </Text>
      {props.ismandatory && <Text style={props.mandateTxtStyle}>*</Text>}
    </View>
  );
}

export default Label;