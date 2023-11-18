import { View, Alert, TouchableOpacity } from 'react-native'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AutocompleteDropdown, AutocompleteDropdownRef } from 'react-native-autocomplete-dropdown'
import { useCarreraContext, useMateriasProyeccion, useProyeccionesContext, useSearchMateria, useThemeColor } from '@/hooks'
import { COLORS } from '~/constants'
import Spinner from '@/components/Spinner'
import { Texto } from '@/ui'
import MateriaProyeccionesItem from './MateriaProyeccionesItem'
import SelectTurnos from '../SelectTurnos'
import { ScrollView } from 'react-native-gesture-handler'


interface Props {

}

const materiaSearchTutorial = 'Deontologia';

export const Busqueda: React.FC<Props> = () => {
    const dropwdownController = useRef<AutocompleteDropdownRef | null>(null)
    const isDarkMode = useThemeColor() === "dark"

    const { valueCarrera } = useCarreraContext()
    const { selectedTurns, tutorialEnCurso } = useProyeccionesContext()

    const { data, getData, isLoading } = useSearchMateria()
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    const [inputText, setInputText] = useState("")

    const sugerencias = useMemo(() => data.map((x) => ({ id: x.id + "", title: x.nombre })), [data])

    const onChangeText = (q: string) => {
        setInputText(q)
        if (q != "") {
            getData(q, valueCarrera || -1)
        }
    }

    const { materiasProyeccionQuery } = useMateriasProyeccion({
        carrera: valueCarrera || 0,
        modulo: 0,
        semestre: 0,
        buscarMateria: Number(selectedItem?.id || -1),
        enabled: true
    })


    const renderMaterias = () => {
        if (!selectedItem) return <></>
        if (materiasProyeccionQuery.isLoading) return <Spinner className='h-28' />
        if (materiasProyeccionQuery.isError) return <Texto>HUBO UN ERROR</Texto>

        const isPendienteOCurso = (id: number) => id == 0 || id == 1

        if (materiasProyeccionQuery.data.data.length === 0)
            return (
                <View className="p-4 items-center bg-white dark:bg-secondary-dark  border-[.5px] border-t-0">
                    <Texto className="dark:text-white text-center">NO HAY MATERIAS OFERTADAS</Texto>
                </View>
            );

        return <View className='mt-4'>
            <SelectTurnos />

            {!materiasProyeccionQuery.isLoading && !!!filterData.length && <View className="items-center bg-primario dark:bg-secondary-dark p-4 rounded-2xl m-4">
                <Texto className="text-white">
                    No hay datos que mostrar :(
                </Texto>
            </View>}

            <ScrollView style={{ maxHeight: 400 }} nestedScrollEnabled>
                {filterData.map(mat => (
                    <MateriaProyeccionesItem key={mat.id} materia={mat} withModulo />
                ))}
            </ScrollView>
        </View>
    }

    const [filterText, setFilterText] = useState("")

    const filterData = useMemo(() => {
        if (materiasProyeccionQuery.isLoading || materiasProyeccionQuery.isError) return []

        let filteredData = materiasProyeccionQuery.data.data
        if (selectedTurns.length) {
            filteredData = materiasProyeccionQuery.data.data.filter((item) => selectedTurns.includes(item.turno))
        }

        if (!filterText) return filteredData

        const normalizeString = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const filterTextNormalized = normalizeString(filterText);

        const filterTextArray = filterTextNormalized.split(" ");

        return filteredData.filter((item) => {
            return filterTextArray.every((word) => {
                const materiaNormalized = normalizeString(item.materia);
                const carreraNormalized = normalizeString(item.carrera);

                return (
                    materiaNormalized.includes(word) ||
                    carreraNormalized.includes(word)
                );
            });
        });
    }, [, selectedTurns, materiasProyeccionQuery.data])



    useEffect(() => {
        if (tutorialEnCurso && tutorialEnCurso.step === 4) {
            const intervalId = setInterval(() => {
                if (inputText.length < materiaSearchTutorial.length) {
                    setInputText((prevText) => {
                        //console.log(prevText, inputText, prevText.length)
                        if (prevText == materiaSearchTutorial) {
                            clearInterval(intervalId);
                            return prevText
                        };
                        dropwdownController.current?.setInputText(prevText + materiaSearchTutorial[prevText.length])
                        return prevText + materiaSearchTutorial[prevText.length]
                    });
                } else {
                    clearInterval(intervalId);
                }
            }, 300);

            return () => clearInterval(intervalId);

        } else {
            setInputText("")
            dropwdownController.current?.clear()
            dropwdownController.current?.close()
        }
    }, [tutorialEnCurso]);

    useEffect(() => {
        if (inputText == materiaSearchTutorial) {

            getData(inputText, valueCarrera || -1)
            dropwdownController.current?.open()

            setTimeout(() => {
                dropwdownController.current?.close()
            }, 5000);
        }
    }, [inputText])

    return (
        <View style={{ zIndex: -1 }}>
            <AutocompleteDropdown

                dataSet={sugerencias}
                closeOnBlur={true}
                useFilter={false}
                clearOnFocus={false}
                textInputProps={{
                    placeholder: 'Busca una materia....',
                    style: { color: isDarkMode ? "#FFF" : "#000" },

                }}
                controller={(controller) => {
                    dropwdownController.current = controller
                }}
                onSelectItem={setSelectedItem}
                loading={isLoading}
                onChangeText={onChangeText}
                suggestionsListTextStyle={{
                    color: isDarkMode ? '#FFF' : "#000",
                }}
                containerStyle={{ zIndex: -1 }}
                suggestionsListContainerStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF" }}
                onClear={() => setInputText("")}
                inputContainerStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF", borderColor: "#000", borderWidth: .5 }}
                debounce={600}
                EmptyResultComponent={<Texto className='text-black dark:text-white p-3 text-center'>{isLoading ? "Buscando Materia..." : inputText.length === 0 ? "Busca una materia para tu proyeccion" : "No se ha encontrado la materia o no esta disponible en tu plan de estudio"}</Texto>}
            />


            {renderMaterias()}
        </View>
    )
}
