import React from 'react'
import { Alert, View } from 'react-native'
import { Text } from 'react-native-paper'
import HeaderImage from '../components/HeaderImage'
import { useNavigation } from '@react-navigation/native'
import { flowerHome, flowerHomeDark } from '../resources/images'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePaperColorScheme } from '../theme/theme'
import { List } from 'react-native-paper';
function ProductTransferScreen() {
    const navigation = useNavigation()
    const theme = usePaperColorScheme()
 const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
    const backPressed = () => {
        Alert.alert(
            "Want to Go Back?",
            "Please press UPDATE Button to update. Do you want to still go back?",
            [
                {
                    text: "NO",
                    onPress: () => null,
                    style: "cancel",
                },
                { text: "YES", onPress: () => navigation.goBack() },
            ],
        )
    }
    return (
        <SafeAreaView
            style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            {/* // <ScrollView keyboardShouldPersistTaps="handled"> */}
                <View style={{ alignItems: "center" }}>

                    <HeaderImage
                        isBackEnabled
                        isBackCustom={true}
                        backPressed={backPressed}
                        imgLight={flowerHome}
                        imgDark={flowerHomeDark}
                        borderRadius={30}
                        blur={10}>
                        Product Transfer
                    </HeaderImage>
                </View>
                <View>
                     <List.Section title="Accordions">
      <List.Accordion
        title="Unassigned products"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
                </View>
                </SafeAreaView>

    )
}

export default ProductTransferScreen