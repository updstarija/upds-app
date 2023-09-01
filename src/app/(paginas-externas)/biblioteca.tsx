import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const Biblioteca = () => {
    return (
        <WebView
            sharedCookiesEnabled
            source={{ uri: 'https://tarija.upds.edu.bo/RepositorioAcademico' }}
        />
    )
}

export default Biblioteca