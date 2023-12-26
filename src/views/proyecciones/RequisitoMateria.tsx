import { useState } from 'react'
import { View, Alert, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { useCarreraContext, useMateriaRequisito, useThemeColor } from '@/hooks'
import { Spinner } from '@/components'
import { MateriaProyeccion, MateriaRequisito } from '@/types'
import { CustomSkeleton, Texto } from '@/ui'

interface Props {
    materia: MateriaProyeccion
}

const alertPrerequisito = () => {
    Alert.alert("Informacion", "Pre-requisito es una materia previa que se debe aprobar antes de inscribirse en una materia más avanzada o especializada.")
}
const alertPostRerequisito = () => {
    Alert.alert("Informacion", "Co-requisito es una materia que puede ser cursada solo después de haber aprobado una materia previa relacionada.")
}

export const RequisitoMateria: React.FC<Props> = ({ materia }) => {
    const { valueCarrera } = useCarreraContext()
    const isDarkMode = useThemeColor() === "dark"

    const [materiasHistory, setMateriasHistory] = useState([materia.materiaAdmId])
    const [materiasNombreHistory, setMateriasNombreHistory] = useState([materia.materia])
    const [selectedMateria, setSelectedMateria] = useState(0)

    const { materiaRequisitoQuery: data } = useMateriaRequisito({
        carrera: valueCarrera || -1,
        materia: materiasHistory[selectedMateria],
    })



    const addNewMateriaHistory = (materia: MateriaRequisito) => {
        const existe = materiasHistory.includes(materia.id)

        if (!existe) {
            setMateriasHistory([...materiasHistory, materia.id])
            setMateriasNombreHistory([...materiasNombreHistory, materia.nombre])
        }

        if (!existe) {
            setSelectedMateria(selectedMateria + 1)
            return
        }

        const posicionExistente = materiasHistory.findIndex((mat) => mat === materia.id)

        setSelectedMateria(posicionExistente)
    }

    const prevMateria = () => {
        setSelectedMateria(selectedMateria - 1)
    }

    const nextMateria = () => {
        setSelectedMateria(selectedMateria + 1)
    }

    const renderPrerequisito = () => (<></>)

    /*     if (data.isLoading) return <Spinner size={30} /> */
    if (data.isError) return <Texto>ERROR</Texto>



    return (
        <View className='m-2'>
            <View className='flex-row justify-between items-start'>
                {selectedMateria > 0 ? <TouchableOpacity onPress={prevMateria}><AntDesign name='leftcircleo' size={20} color={isDarkMode ? "#FFF" : "#000"} /></TouchableOpacity> : <View />}

                <View style={{ maxWidth: 300 }}>
                    {data.isLoading
                        ?
                        <CustomSkeleton width={200} height={20} />
                        :
                        <Texto weight='Bold' className='text-center text-xl mb-4 dark:text-white'>{materiasNombreHistory[selectedMateria]}</Texto>
                    }
                </View>

                {selectedMateria < materiasHistory.length - 1 ? <TouchableOpacity onPress={nextMateria}><AntDesign name='rightcircleo' size={20} color={isDarkMode ? "#FFF" : "#000"} /></TouchableOpacity> : <View />}

            </View>

            <View className='flex-row items-center'>
                <Texto>Pre-requisito: </Texto>

                <TouchableOpacity activeOpacity={0.5} onPress={alertPrerequisito} style={{ padding: 10 }}>
                    <AntDesign name="questioncircleo" color={isDarkMode ? "#FFF" : "#000"} />
                </TouchableOpacity>
            </View>

            {/*      <Texto>{JSON.stringify(data.data.data)}</Texto>
 */}
            <View className='items-center'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <View className='flex-row gap-3 p-4 items-center'>
                        {
                            data.isLoading
                                ?
                                <CustomSkeleton width={200} radius={50} />
                                :
                                <>
                                    {data.data.data.prerequisito.length === 0 && <View className='rounded-full p-2 border-[.5px] border-primario'>
                                        <Texto className='text-black dark:text-white'>SIN PRE-REQUISITO</Texto>
                                    </View>}

                                    {data.data.data.prerequisito.map(pre => (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => addNewMateriaHistory(pre)} key={pre.id}>
                                            <View className='bg-primario block rounded-full p-2 border-[.5px]' >
                                                <Texto className='text-white'>{pre.nombre}</Texto>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </>
                        }

                    </View>
                </ScrollView>
            </View>

            <View className='flex-row items-center'>
                <Texto>Co-requisito: </Texto>

                <TouchableOpacity activeOpacity={0.5} onPress={alertPostRerequisito} style={{ padding: 10 }}>
                    <AntDesign name="questioncircleo" color={isDarkMode ? "#FFF" : "#000"} />
                </TouchableOpacity>
            </View>

            <View className='items-center'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <View className='flex-row gap-3 p-4 items-center'>
                        {
                            data.isLoading
                                ?
                                <CustomSkeleton width={200} radius={50} />
                                :
                                <>
                                    {data.data.data.corequisito.length === 0 && <View className='rounded-full p-2 border-[.5px] border-primario'>
                                        <Texto className='text-black dark:text-white'>SIN CO-REQUISITO</Texto>
                                    </View>}

                                    {data.data.data.corequisito.map(co => (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => addNewMateriaHistory(co)} key={co.id}>
                                            <View className='bg-primario block rounded-full p-2 border-[.5px]' style={{ maxWidth: 200 }}>
                                                <Texto className='text-white text-center'>{co.nombre}</Texto>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </>
                        }


                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
