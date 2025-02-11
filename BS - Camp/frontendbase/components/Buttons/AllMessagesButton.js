import { StyleSheet, Text, ViewComponent, Button } from 'react-native'
import React from 'react'

const AllMessagesButton = () => {
  return (
        <Button
            color="blue"
            title="Messages"
            style={styles.button}
        />
  )
}

export default AllMessagesButton

const styles = StyleSheet.create({
    button: {
        marginRight: 100,
        color: 'black',
        height: 100
    }

})