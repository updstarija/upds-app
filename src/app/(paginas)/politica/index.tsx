import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import RenderHTML from 'react-native-render-html'
import { ScrollView } from 'react-native-gesture-handler'
import { useThemeColor } from '@/hooks'

const Politica = () => {
    const { width } = useWindowDimensions()
    const isDark = useThemeColor() === "dark"
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
            <View className='m-4'>
                <RenderHTML contentWidth={width} baseStyle={{ color: isDark ? "#fff" : "#000" }} source={{
                    html: `
                    <p><strong>Fecha de vigencia:</strong> ${new Date().getFullYear()}</p>


<h2>1. Introducción</h2>
<p>La Universidad Privada Domingo Savio ("nosotros", "nuestro" o "la Universidad") se compromete a proteger su privacidad y a mantener seguros los datos personales que recopilamos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que usted proporciona a través de la aplicación móvil de la Universidad Privada Domingo Savio ("la Aplicación"). Al utilizar la Aplicación, usted acepta esta Política de Privacidad.</p>

<h2>2. Información que Recopilamos</h2>
<p><strong>a. Datos de Registro:</strong> Al utilizar la Aplicación, podemos recopilar información de registro, que incluye su nombre, número de estudiante, dirección de correo electrónico y otros datos relacionados con su inscripción y actividades académicas.</p>
<p><strong>b. Información del Dispositivo:</strong> Podemos recopilar información sobre el dispositivo móvil que utiliza para acceder a la Aplicación, incluyendo el tipo de dispositivo, la versión del sistema operativo y la identificación del dispositivo.</p>

<h2>3. Uso de la Información</h2>
<p>a. Utilizamos la información recopilada para brindar servicios relacionados con su experiencia académica en la Universidad Privada Domingo Savio, como la programación de materias, la generación de la boleta de proyección y la visualización del registro histórico.</p>
<p>b. También utilizamos la información para enviar notificaciones relevantes relacionadas con sus actividades académicas y administrativas.</p>

<h2>4. Compartir Información</h2>
<p>No compartimos su información personal con terceros, excepto en las siguientes circunstancias:</p>
<p>a. Cuando sea necesario para cumplir con las obligaciones académicas y administrativas de la universidad.</p>
<p>b. Cuando sea requerido por la ley o las autoridades gubernamentales.</p>
<p>c. Con su consentimiento previo y expreso.</p>

<h2>5. Seguridad de Datos</h2>
<p>a. Implementamos medidas de seguridad razonables para proteger la información personal que recopilamos.</p>
<p>b. No obstante, tenga en cuenta que ninguna transmisión de datos por Internet o sistema de almacenamiento de datos es 100% seguro. No podemos garantizar la seguridad de la información transmitida a través de la Aplicación.</p>

<h2>6. Cambios en la Política de Privacidad</h2>
<p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio significativo será notificado a través de la Aplicación o por otros medios. Su uso continuado de la Aplicación después de la publicación de los cambios constituye su aceptación de los mismos.</p>

<h2>7. Contacto</h2>
<p>Si tiene alguna pregunta o inquietud relacionada con esta Política de Privacidad, puede ponerse en contacto con la Universidad Privada Domingo Savio a través de la información de contacto proporcionada en la Aplicación.</p>`}} />
            </View>
        </ScrollView>
    )
}

export default Politica