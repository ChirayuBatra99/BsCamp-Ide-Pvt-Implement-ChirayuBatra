import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';

import { AppContext } from '../../context/AppContext';

const currentMonth = new Date().getMonth(); // 0-based index for months
const currentYear = new Date().getFullYear();
const months = Array.from({ length: 3 }, (_, i) => {
    const month = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    return { label: `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`, value: `${year}-${String(month + 1).padStart(2, '0')}` };
});

const data = [
    { label: `${months[0].label}`, value: `${months[0].value}` },
    { label: `${months[1].label}`, value: `${months[1].value}`},
    { label: `${months[2].label}`, value: `${months[2].value}`},
];

const MonthPickerDropDown = () => {
    const [value, setValue] = useState(`${months[0].value.slice(-2)}`);
    const [isFocus, setIsFocus] = useState(false);
    const { selectedMonth, setSelectedMonth } = useContext(AppContext);

    useEffect(() => {
        setSelectedMonth(value.slice(-2));
    }, [value]);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Travellers in:
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
                placeholder={!isFocus ? `${months[0].label}` : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default MonthPickerDropDown;

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
        backgroundColor: 'black',
        left: 22,
        top: 1,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'white'

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