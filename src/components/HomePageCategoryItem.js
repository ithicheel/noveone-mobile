import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const HomePageCategoryItem = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.typed}</Text>
    </TouchableOpacity>
  );

export default HomePageCategoryItem

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderRadius: 20,
        marginTop:20,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
    },
})