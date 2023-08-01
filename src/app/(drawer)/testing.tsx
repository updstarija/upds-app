import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Texto } from '../../components'


const Busqueda = () => {

    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    return (

        <AutocompleteDropdown

            clearOnFocus={false}
            closeOnBlur={true}
            initialValue={{ id: '2' }} // or just '2'
            onSelectItem={setSelectedItem}
            dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
            ]}
        />

    )
}

export default Busqueda