import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
  { label: 'Item 9', value: '9' },
  { label: 'Item 10', value: '10' },
  { label: 'Item 11', value: '11' },
  { label: 'Item 12', value: '12' },
];

const PickUpDropDown = () => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <MaterialIcons
            style={styles.icon}
            color="black"
            // name="Safety"
            size={20}
            // backgroundColor= "black"
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.containerStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      // renderLeftIcon={() => (
      //   <MaterialIcons style={styles.icon} color="black" name="Safety" size={20} />
      // )}
      renderItem={renderItem}
    />
  );
};

export default PickUpDropDown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    color: 'white',
    // backgroundColor: 'black',
    // color: 'brown',
    borderRadius: 12,
    padding: 12,
    borderWidth: 3,
    // shadowColor: 'brown',
    borderColor: 'brown'
  },
  containerStyle: {
      backgroundColor: '#52313c',
      borderRadius: 10,
      width: "80%",
      marginLeft: "4%",
      borderColor: 'brown',
  },

  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#52313c',
    color: 'white',
    borderBottomColor: 'white',
    borderWidth: 1
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'white'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white'

  },
  selectedTextStyle: {
    fontSize: 16,
    backgroundColor: 'white'
  },
  iconStyle: {
    width: 20,
    height: 21,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // backgroundColor: 'wheat',
    // padding: -3,
    // borderRadius: 5,
    // borderWidth: 1,
    borderColor: '#52313c',
    color: 'white'

  },
});





// import React, { useState } from 'react';
//   import { StyleSheet, Text, View } from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
//   // import AntDesign from '@expo/vector-icons/AntDesign';

//   const data = [
//     { label: 'Ai', value: 'airport' },
//     { label: 'R', value: 'railway' },
//   ];

//   const PickUpDropDown = () => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);

//     const renderLabel = () => {
//       if (value || isFocus) {
//         return (
//           <Text style={[styles.label, isFocus && { color: 'white' }]}>
//             Starting place
//           </Text>
//         );
//       }
//       return null;
//     };

//     return (
//       <View style={styles.container}>
//         {renderLabel()}
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: 'brown' }]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={data}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Starting place' : '...'}
//           searchPlaceholder="Search..."
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             setValue(item.value);
//             setIsFocus(false);
//           }}
//         />
//       </View>
//     );
//   };

//   export default PickUpDropDown;

//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: 'black',
//       padding: 10,
//     },
//     dropdown: {
//       height: 50,
//       borderColor: 'brown',
//       borderWidth: 3,
//       borderRadius: 8,
//       paddingHorizontal: 8,
//       color: 'white',
//       backgroundColor: 'black'
//     },
//     icon: {
//       marginRight: 5,
//     },
//     label: {
//       position: 'absolute',
//       backgroundColor: 'black',
//       left: 22,
//       top: 8,
//       zIndex: 999,
//       paddingHorizontal: 8,
//       fontSize: 14,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//       color: 'white'

//     },
//     selectedTextStyle: {
//       fontSize: 16,
//       color: 'white'
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//       backgroundColor: 'brown'
//     },
//   });