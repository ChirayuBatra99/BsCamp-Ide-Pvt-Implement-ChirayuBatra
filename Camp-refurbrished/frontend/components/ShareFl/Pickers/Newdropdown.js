


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const simpleData = [
  { title: 'Option 1', icon: '😊' },
  { title: 'Option 2', icon: '👍' },
  { title: 'Option 3', icon: '🌟' },
];

const Newdropdown = () => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={simpleData}
        onSelect={(selectedItem, index) => {
          console.log(`Selected: ${selectedItem.title}, Index: ${index}`);
        }}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Text style={styles.dropdownButtonIconStyle}>
                {selectedItem.icon}
              </Text>
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Select an option'}
            </Text>
            <Text style={styles.dropdownButtonArrowStyle}>
              {isOpened ? '▲' : '▼'}
            </Text>
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: '#D2D9DF' }),
            }}
          >
            <Text style={styles.dropdownItemIconStyle}>{item.icon}</Text>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default Newdropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    color: '#151E26',
  },
  dropdownButtonIconStyle: {
    fontSize: 18,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 18,
    marginRight: 8,
  },
});
