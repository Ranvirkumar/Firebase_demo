import React from 'react';
import { View, TextInput, Image } from 'react-native';
import Label from "./Label";

type Props = {
  inputStyle: Object,
  label: string,
  name: string,
};

const INPUT_LABEL = (props: Props) => {
  const { wrapper, wrapperTxt, styleLabel, label, imageIcon, imageIconStyle, placeHolderText, inputStyle, onInputChange, name, keyboardType = 'default' } = props;
  return (
    <View style={wrapper}>
      {label && <Label text={label} styleLabel={{ fontSize: 18, color: 'gray', marginBottom: 10}} />}
      <View style={wrapperTxt}>
        <TextInput style={inputStyle}
          onChangeText={(text) => onInputChange(text, name)}
          keyboardType={keyboardType}
          placeholder={placeHolderText}
          autoCapitalize='none'
          required
        />
        <Image source={imageIcon} style={imageIconStyle} />
      </View>
    </View>
  )
};
export default INPUT_LABEL