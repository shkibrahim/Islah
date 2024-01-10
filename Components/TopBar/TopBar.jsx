import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon, IconButton, Button, Menu, Divider, PaperProvider } from 'react-native-paper'
import { myTheme } from '../../theme'



const TopBar= (props) => {
    const [visible, setVisible] = React.useState(false);


    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={
                () => { props.navigation.openDrawer() }
            } >
                <View style={styles.left_container}>
                   <View style={styles.img_container}>
                   <Image style={{
                        width: 32,
                        height: 32
                    }} source={require('../../assets/images/logo.png')} />
                   </View>
                    <Text style={styles.brand_name}>
                        Islah Committee
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.right_container}>
                <Menu
                    anchorPosition='bottom'
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon="bell" iconColor='#fff' size={22} onPress={openMenu} />}>
                    <Menu.Item style={{
                        backgroundColor: "#f0f0f0",
                    }} onPress={() => { }} title="No Notication" />
                </Menu>
                <IconButton icon="android-messages" iconColor='#fff' size={22} onPress={() => props.navigation.navigate('chat')} />
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: myTheme.colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    left_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        letterSpacing: 1,
        marginLeft: 12,

    },
    brand_name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#fff'

    },
    right_container: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    img_container:{
        // width: 34,
        // height: 36,
        // borderRadius: 24,
        // backgroundColor: '#fff',
        // justifyContent: "center",
        // alignItems: "center",
    }
})