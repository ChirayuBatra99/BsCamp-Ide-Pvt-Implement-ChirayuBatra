import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [
  { label: 'Ai', value: 'airport' },
  { label: 'R', value: 'railway' },
];

const DestinationDropDown = ({ onDestination }) => {
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
      placeholder="Select Destination"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        onDestination(item.value);
      }}
      // renderLeftIcon={() => (
      //   <MaterialIcons style={styles.icon} color="black" name="Safety" size={20} />
      // )}
      renderItem={renderItem}
    />
  );
};

export default DestinationDropDown;

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
    backgroundColor: 'black',
    color: 'white'
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
    color: 'black'

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

//   const DestinationDropDown = () => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);

//     const renderLabel = () => {
//       if (value || isFocus) {
//         return (
//           <Text style={[styles.label, isFocus && { color: 'white' }]}>
//             Destination Place
//           </Text>
//         );
//       }
//       return null;
//     };

//     return (
//       <View style={styles.container}>
//         {renderLabel()}
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: 'yellow' }]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={data}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Destination Place' : '...'}
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

//   export default DestinationDropDown;

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
//       color: 'brown'
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
//     },
//   });