import { View, Text, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Texto } from '../../components'
import { firebase } from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import WebView from 'react-native-webview';

const Busqueda = () => {

    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    const [codigo, setCodigo] = useState("")


    const getToken = async () => {
        try {
            const device = await firebase.messaging().getToken();
            setCodigo(device)
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: JSON.stringify(e.message)
            })
        }
    }

    const topicSuscribe = async () => {
        messaging()
            .subscribeToTopic('upds')
            .then(() => {
                Alert.alert("SUSCRITO")
            })
            .catch((e) => {
                Alert.alert(JSON.stringify(e.message))
            })
    }

    return (
        <>
            <WebView

                scalesPageToFit
                source={{
                    html: `
                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@upds_tarija" data-unique-id="upds_tarija" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href="https://www.tiktok.com/@upds_tarija?refer=creator_embed">@upds_tarija</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                ` }}
            />
            {/*  <View className='bg-white flex-1'>
            <Button title='OBTENER TOKEN' onPress={getToken} />
            <Button title='SUSCRIBIRSE' onPress={topicSuscribe} />


            <View className='border'>
                <TextInput value={codigo} multiline />
            </View>
        </View> */}
        </>

    )
}

export default Busqueda