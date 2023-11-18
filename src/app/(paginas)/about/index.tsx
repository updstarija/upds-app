import { View, useWindowDimensions, Linking } from 'react-native'
import React from 'react'
import { nativeApplicationVersion } from 'expo-application'
import { ScrollView } from 'react-native-gesture-handler'
import { Texto } from '@/ui'


const About = () => {
    const { width } = useWindowDimensions()


    const x = `

    <p><strong style="font-size: 16px;">Versión de la Aplicación:</strong> 1.0.0</p>

    <p style="font-size: 16px;">UniSavio Mobile es una aplicación oficial de la Universidad Privada Domingo Savio desarrollada por el Área de Sistemas. Esta aplicación está diseñada para simplificar la vida académica de los estudiantes, permitiendo programar materias, recibir notificaciones importantes, acceder a la boleta de proyección y consultar el registro histórico académico.
    </p>

    <h2 style="font-size: 20px;">Equipo de Desarrollo:</h2>
    <p style="font-size: 16px;"><strong>Desarrollador Principal:</strong> Dante Arias Tarifa</p>
    <p style="font-size: 16px;"><strong>Jefes del Área de Sistemas:</strong><br>
        Isac Aguilera<br>
        Gonzalo Tarifa
    </p>

    <h2 style="font-size: 20px; color: #333;">Soporte Técnico:</h2>
    <p style="font-size: 16px;">Para asistencia técnica o preguntas relacionadas con la aplicación, no dudes en contactar al Área de Sistemas de la Universidad Privada Domingo Savio.</p>
    <p style="font-size: 16px;"><strong>Correo Electrónico:</strong> <a href="mailto:sistemas@unisavio.edu.bo" style="color: #0073e6; text-decoration: none;">sistemas@unisavio.edu.bo</a></p>
    <p style="font-size: 16px;"><strong>Teléfono de Soporte:</strong> +1-800-123-4567</p>
`
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
            <View className="p-4">
                <Texto className="dark:text-white text-3xl mb-4" weight='Bold'>UPDS TARIJA</Texto>

                <Texto className="dark:text-white text-sm" >
                    Versión
                </Texto>

                <Texto className='mb-4 dark:text-white'>{nativeApplicationVersion}</Texto>
                <Texto className="dark:text-white text-sm">
                    Upds Tarija es una aplicación oficial de la Universidad Privada Domingo Savio Sede Tarija. Esta aplicación está diseñada para simplificar la vida académica de los estudiantes, permitiendo programar materias, recibir notificaciones importantes, acceder a la boleta de proyección y consultar el registro histórico académico.
                </Texto>

                <Texto className="dark:text-white text-xl mt-8 mb-2" weight='Bold'>Equipo de Desarrollo</Texto>
                <Texto className="dark:text-white text-sm">
                    El equipo de desarrollo está compuesto por miembros del Departamento de Sistemas de la UPDS.
                </Texto>


                <Texto className="dark:text-white text-lg mt-2" weight='Bold'>
                    Desarrollador
                </Texto>

                <View className='flex items-center p-2'>
                    <Texto className="dark:text-white text-lg" weight='Bold'>
                        Dante Emanuel Arias Tarifa
                    </Texto>
                    <Texto className="dark:text-white text-blue-500" onPress={() => Linking.openURL('mailto:danteariastarifa@gmail.com')}>danteariastarifa@gmail.com</Texto>
                    <Texto className="dark:text-white text-sm">
                        Auxiliar de Sistemas
                    </Texto>
                </View>


                <Texto className="dark:text-white text-lg mt-2" weight='Bold'>
                    Supervisores
                </Texto>

                <View className='flex-row justify-evenly'>
                    <View className='flex items-center p-2'>
                        <Texto className="dark:text-white text-lg" weight='Bold'>
                            Departamento de Sistemas
                        </Texto>

                    </View>
                </View>

                <Texto className="dark:text-white text-lg mt-2" weight='Bold'>
                    Colaborador
                </Texto>

                <View className='flex items-center p-2'>
                    <Texto className="dark:text-white text-lg" weight='Bold'>
                        Charles Darwin
                    </Texto>
                </View>


                <Texto className="dark:text-white text-sm mt-8">
                    Para asistencia técnica o preguntas relacionadas con la aplicación, no dudes en contactar al Departamento de Sistemas de la Universidad Privada Domingo Savio.
                </Texto>
                <Texto className="dark:text-white text-sm mt-2">
                    Correo Electrónico: <Texto className="dark:text-white text-blue-500" onPress={() => Linking.openURL('mailto:soporte.tarija@upds.edu.do')}>soporte.tarija@upds.edu.bo</Texto>
                </Texto>
                <Texto className="dark:text-white text-sm mt-2">
                    Teléfono: (591)(4) 665-8303 Int.: 131
                </Texto>
            </View>
        </ScrollView>
    )
}

export default About