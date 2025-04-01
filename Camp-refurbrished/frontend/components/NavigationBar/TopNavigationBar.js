import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import  AccountIcon  from '../../svgs/AccountIcon';


const TopNavigationBar = () => {
    return (
        <View>
            <Text>App name</Text>
            <Button
                // onPress={onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            /> 
            <AccountIcon />
        </View>
    )
}

export default TopNavigationBar

const styles = StyleSheet.create({})