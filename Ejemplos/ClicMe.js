import React, { useState } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'

const ClicMe = (props) => {
const [count, setCount] =
    useState(props.count ? props.count : 0);
const onPress = () => {
    setCount(count + 1);
};
return (
    <View>
        <TouchableHighlight onPress={onPress}>
            <Text>Clic Me!</Text>
        </TouchableHighlight>
        <Text> {count} </Text>
    </View>
)
};
export default ClicMe;