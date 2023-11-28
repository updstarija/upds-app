import { View, TouchableOpacity, FlatList } from 'react-native'
import clsx from 'clsx'
import { Texto } from '@/ui'
import { useProyeccionesContext } from '@/hooks'

interface Props {
    selectedValues?: string[]
    handleFilterValue?: Function
}
const SelectTurnos: React.FC<Props> = ({ selectedValues, handleFilterValue }) => {
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

                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            if (selectedValues && handleFilterValue) {
                                handleFilterValue(item)
                            } else {
                                handleFilterTurn(item)
                            }
                        }}>
                            <View className={
                                clsx([
                                    "rounded-full py-2 px-4 border-[.5px] border-primario",
                                    {
                                        "bg-primario dark:bg-secondary-dark text-white": selectedValues?.includes(item) || selectedTurns.includes(item)
                                    }
                                ])
                            }>
                                <Texto className={
                                    clsx([
                                        "'text-black dark:text-white'",
                                        {
                                            "text-white": selectedValues?.includes(item) || selectedTurns.includes(item)
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