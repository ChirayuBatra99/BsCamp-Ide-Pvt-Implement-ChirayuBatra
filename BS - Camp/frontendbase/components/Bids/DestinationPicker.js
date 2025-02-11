import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  // import AntDesign from '@expo/vector-icons/AntDesign';

  const data = [
    { label: 'Ai', value: 'Ai' },
    { label: 'R', value: 'R' },
  ];

  const DestinationDropDown = ({onDestinationChange}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Destination Place
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Destination Place' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            onDestinationChange(item.value);
          }}
        />
      </View>
    );
  };

  export default DestinationDropDown;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      padding: 10,
    },
    dropdown: {
      height: 50,
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 8,
      paddingHorizontal: 8,
      color: 'white'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'pink',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'white'

    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'white'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });