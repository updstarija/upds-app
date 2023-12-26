import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { Texto } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import { useThemeColor } from '@/hooks'

const Terminos = () => {
    const { width } = useWindowDimensions()
    const isDark = useThemeColor() === "dark"
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
            <View className='m-4'>
                <RenderHTML contentWidth={width} baseStyle={{ color: isDark ? "#fff" : "#000" }} source={{
                    html: `

                    <p><strong>Fecha de vigencia:</strong> ${new Date().getFullYear()}</p>
                    
                    <h2>1. Aceptación de los Términos de Uso</h2>
                    <p>Al acceder o utilizar esta aplicación móvil ("la Aplicación"), usted acepta estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, le recomendamos que no utilice la Aplicación.</p>
                    
                    <h2>2. Uso de la Aplicación</h2>
                    <p>a. La Aplicación está diseñada para uso exclusivo de los estudiantes de la Universidad Privada Domingo Savio para gestionar sus actividades académicas y administrativas.</p>
                    <p>b. Usted se compromete a utilizar la Aplicación de manera responsable y cumplir con todas las leyes y regulaciones locales, estatales y federales aplicables.</p>
                    
                    <h2>3. Privacidad</h2>
                    <p>a. El uso de la Aplicación está sujeto a nuestra Política de Privacidad, que describe cómo recopilamos, usamos y protegemos sus datos personales.</p>
                    <p>b. Usted acepta que la Universidad Privada Domingo Savio puede recopilar y utilizar cierta información personal, como su nombre, número de estudiante, dirección de correo electrónico y otra información relacionada con su inscripción y actividades académicas.</p>
                    
                    <h2>4. Notificaciones</h2>
                    <p>a. Al utilizar la Aplicación, usted puede recibir notificaciones relacionadas con su inscripción, actividades académicas y otros servicios relacionados con la universidad.</p>
                    <p>b. Usted puede optar por no recibir ciertas notificaciones a través de la configuración de la Aplicación.</p>
                    
                    <h2>5. Derechos de Propiedad</h2>
                    <p>a. Todos los derechos de propiedad intelectual de la Aplicación y su contenido son propiedad de la Universidad Privada Domingo Savio o sus licenciantes.</p>
                    <p>b. Usted no tiene permiso para copiar, modificar, distribuir, vender o sublicenciar ningún aspecto de la Aplicación sin la autorización previa por escrito de la universidad.</p>
                    
                    <h2>6. Actualizaciones y Cambios</h2>
                    <p>La Universidad Privada Domingo Savio se reserva el derecho de actualizar, modificar o cambiar la Aplicación y estos Términos de Uso en cualquier momento. Se le notificará de tales cambios a través de la Aplicación o por otros medios. Su uso continuado de la Aplicación después de la publicación de los cambios constituye su aceptación de los mismos.</p>
                    
                    <h2>7. Terminación</h2>
                    <p>La Universidad Privada Domingo Savio se reserva el derecho de terminar o suspender su acceso a la Aplicación en cualquier momento, sin previo aviso, si se determina que ha violado estos Términos de Uso.</p>
                    
                    <h2>8. Ley Aplicable</h2>
                    <p>Estos Términos de Uso se rigen por las leyes del país o estado en el que se encuentra la Universidad Privada Domingo Savio.</p>
                    
                    <h2>9. Contacto</h2>
                    <p>Si tiene alguna pregunta o inquietud relacionada con estos Términos de Uso, puede ponerse en contacto con la Universidad Privada Domingo Savio a través de la información de contacto proporcionada en la Aplicación.</p>`}}

                />
            </View>
        </ScrollView>
    )
}

export default Terminos