import React, { PropsWithChildren } from "react"
import { StyleSheet, ImageProps } from "react-native"
import { Text, IconButton, TouchableRipple } from "react-native-paper"
import FastImage from 'react-native-fast-image'
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"
import { BASE_URL, BASE_URL_CATEGORY_IMG } from "../config/config"
import { Image } from 'react-native';
type ReportButtonProps = {
  text: string
  onPress?: () => void
  icon?: IconSource
  color?: string
  textColor?: string
  withImage?: boolean
  imageSource?: string
  imageSourceObject?: ImageProps
}

export default function ReportButton({
  text,
  icon,
  color,
  textColor,
  withImage,
  imageSource,
  imageSourceObject,
  onPress,
}: PropsWithChildren<ReportButtonProps>) {
  console.log("RRRRRRRRRRRRRRRRRRRRRRRRR", `${BASE_URL_CATEGORY_IMG}${imageSource}`)
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        width: 102,
        height: 102,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: color,
      }}>
      <>
        {
          imageSource
            ? 
            <FastImage
              source={{
                uri: `${BASE_URL_CATEGORY_IMG}${imageSource}`,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable
              }}
              style={{ width: 50, height: 50  }}
            />

            : <IconButton icon={icon} iconColor={textColor} />
        }
        <Text style={{ textAlign: "center", color: textColor }}>{text}</Text>
      </>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
  },
});
