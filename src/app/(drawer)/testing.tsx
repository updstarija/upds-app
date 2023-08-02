import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Texto } from '../../components'


const Busqueda = () => {

    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    return (

        <Texto>TESTING</Texto>

    )
}

export default Busqueda