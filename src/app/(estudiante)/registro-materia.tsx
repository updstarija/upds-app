import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useCarreraContext } from '@/hooks'
import { useRegistroMateria } from '@/hooks/useRegistroMateria'
import { Texto } from '@/ui'

const RegistroMateria = () => {
    const { carreras, valueCarrera } = useCarreraContext()

    const { materiaRequisitoQuery } = useRegistroMateria({
        inscripcionCarrera: carreras.find(x => x.id === valueCarrera)?.inscripcionCarreraId || carreras[0].inscripcionCarreraId,
        turno: 3
    })

    if (materiaRequisitoQuery.isLoading) return <Texto>ERROR</Texto>
    if (materiaRequisitoQuery.isError) return <Texto>ERROR</Texto>
    return (
        <View>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                data={materiaRequisitoQuery.data}
                renderItem={({ item }) => (
                    <View className='bg-white border p-2'>
                        <Texto>{item.materia}</Texto>
                        <Texto>{item.aula}</Texto>
                        <Texto>{item.cupo}</Texto>
                        <Texto>{item.docente}</Texto>
                        <Texto>{item.grupo}</Texto>
                        <Texto>{item.semestre}</Texto>
                        <Texto>{item.turno}</Texto>
                    </View>
                )}
                ItemSeparatorComponent={() => <View className='mb-1' />}

            />
        </View>
    )
}

export default RegistroMateria