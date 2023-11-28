import { useState, useMemo } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useCarreraContext } from '@/hooks'
import { useRegistroMateria } from '@/hooks/useRegistroMateria'
import { CustomButton, Texto } from '@/ui'
import { FontAwesome } from '@expo/vector-icons'
import { SelectCarrera } from '@/views'
import SelectTurnos from '@/views/SelectTurnos'
import { Spacer } from '@/components'


const shadow = {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
}

const informacionDeRelleno = [
    {
        aula: 'A101',
        costo: '$200',
        cupo: '25',
        docente: 'Profesor López',
        grupo: 'G-101',
        materia: 'Matemáticas',
        semestre: '2',
        turno: 'Mañana',
    },
    {
        aula: 'B202',
        costo: '$180',
        cupo: '30',
        docente: 'Profesora García',
        grupo: 'G-202',
        materia: 'Historia',
        semestre: '4',
        turno: 'Tarde',
    },
    {
        aula: 'C303',
        costo: '$250',
        cupo: '20',
        docente: 'Profesor Martínez',
        grupo: 'G-303',
        materia: 'Física',
        semestre: '3',
        turno: 'Noche',
    },
    {
        aula: 'D404',
        costo: '$220',
        cupo: '28',
        docente: 'Profesora Rodríguez',
        grupo: 'G-404',
        materia: 'Química',
        semestre: '5',
        turno: 'Mañana',
    },
    {
        aula: 'E505',
        costo: '$190',
        cupo: '22',
        docente: 'Profesor Sánchez',
        grupo: 'G-505',
        materia: 'Literatura',
        semestre: '6',
        turno: 'Tarde',
    },
    {
        aula: 'F606',
        costo: '$270',
        cupo: '18',
        docente: 'Profesora Pérez',
        grupo: 'G-606',
        materia: 'Biología',
        semestre: '4',
        turno: 'Noche',
    },
    {
        aula: 'G707',
        costo: '$230',
        cupo: '25',
        docente: 'Profesor Gómez',
        grupo: 'G-707',
        materia: 'Inglés',
        semestre: '3',
        turno: 'Mañana',
    },
    {
        aula: 'H808',
        costo: '$200',
        cupo: '30',
        docente: 'Profesora Hernández',
        grupo: 'G-808',
        materia: 'Economía',
        semestre: '5',
        turno: 'Tarde',
    },
];

const RegistroMateria = () => {
    const { carreras, valueCarrera } = useCarreraContext()
    const [selectedTurns, setSelectedTurns] = useState<string[]>([])

    const { materiaRequisitoQuery: data } = useRegistroMateria({
        inscripcionCarrera: carreras.find(x => x.id === valueCarrera)?.inscripcionCarreraId || carreras[0].inscripcionCarreraId,
        turno: 3
    })

    const handleFilterTurn = async (turn: string) => {
        if (selectedTurns.includes(turn)) {
            setSelectedTurns(selectedTurns.filter(item => item != turn))
            return;
        }

        setSelectedTurns([...selectedTurns, turn])
    }

    console.log(carreras.map((carr) => carr.id));


    const filterData = useMemo(() => {
        if (data.isLoading || data.isError) return []
        if (!selectedTurns.length) return data.data

        return data.data.filter((item) => selectedTurns.includes(item.turno))
    }, [selectedTurns, data.data])

    if (data.isLoading) return <Texto>LOADIN</Texto>
    if (data.isError) return <Texto>ERROR</Texto>




    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                data={filterData}
                ListHeaderComponent={() => (
                    <>
                        <SelectCarrera />
                        <Spacer />
                        <SelectTurnos selectedValues={selectedTurns} handleFilterValue={handleFilterTurn} />
                        <Spacer />
                    </>
                )}
                renderItem={({ item }) => (
                    <View className='bg-white  p-4 rounded-lg' style={{
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 3.05,
                        elevation: 4
                    }}>
                        <Texto weight='Bold' className='text-lg mb-4 text-center'>{item.materia}</Texto>
                        <View className='space-y-2'>
                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Aula: </Texto>
                                <Texto>{item.aula} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Grupo: </Texto>
                                <Texto>{item.grupo} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Cupo: </Texto>
                                <Texto>{item.cupo} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Costo: </Texto>
                                <Texto>{item.costo} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Docente: </Texto>
                                <Texto>{item.docente} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Semestre: </Texto>
                                <Texto>{item.semestre} </Texto>
                            </View>

                            <View className='flex-row  justify-between'>
                                <Texto weight='Bold' className='uppercase'>Turno: </Texto>
                                <Texto>{item.turno} </Texto>
                            </View>

                            <View className='flex-row justify-between gap-2'>
                                <CustomButton variant='white' className='flex-1 ' style={[shadow]}>
                                    <View className='flex-row items-center justify-center gap-2'>
                                        <FontAwesome name='credit-card' size={20} />
                                        <Texto className='text-center' weight='Bold'>PAGAR</Texto>
                                    </View>
                                </CustomButton>

                                <CustomButton variant='primary' className='flex-1' style={[shadow]}>
                                    <View className='flex-row items-center justify-center gap-2'>
                                        <FontAwesome name='plus' size={20} color={"#FFF"} />
                                        <Texto className='text-center text-white' weight='Bold'>REGISTRAR</Texto>
                                    </View>
                                </CustomButton>
                            </View>
                        </View>



                        {/*       
                        <Texto>{item.docente}</Texto>
                        <Texto>{item.semestre}</Texto>
                        <Texto>{item.turno}</Texto> */}
                    </View>
                )}
                ItemSeparatorComponent={() => <View className='mb-1' />}

            />
        </View>
    )
}

export default RegistroMateria