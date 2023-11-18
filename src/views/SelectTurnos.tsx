import { View, TouchableOpacity, FlatList } from 'react-native'
import clsx from 'clsx'
import { Texto } from '@/ui'
import { useProyeccionesContext } from '@/hooks'

const SelectTurnos = () => {

    const { selectedTurns, handleFilterTurn } = useProyeccionesContext()
    return (
        <>
            <Texto className="px-4 pb-2">Turno:</Texto>

            <View className=' items-center justify-center mb-5'>
                <FlatList
                    data={["Mañana", "Medio Día", "Tarde", "Noche"]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    ItemSeparatorComponent={() => (
                        <View className="w-2" />
                    )}
                    extraData={selectedTurns}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleFilterTurn(item)}>
                            <View className={
                                clsx([
                                    "rounded-full py-2 px-4 border-[.5px] border-primario",
                                    {
                                        "bg-primario dark:bg-secondary-dark text-white": selectedTurns.includes(item)
                                    }
                                ])
                            }>
                                <Texto className={
                                    clsx([
                                        "'text-black dark:text-white'",
                                        {
                                            "text-white": selectedTurns.includes(item)
                                        }
                                    ])
                                }>{item}</Texto>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    )
}

export default SelectTurnos