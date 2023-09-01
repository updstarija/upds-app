import { Texto } from '../../../components';
import { LayoutScreen } from '@/layout/LayoutScreen';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '~/constants';


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const MacCard: React.FC<{ title: string; detail: string }> = ({
    title,
    detail,
}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.windowContainer} className='bg-white dark:bg-secondary-dark border'>
                <View style={styles.titleBar} className='bg-primario'>
                    <View style={styles.titleBarButton} />
                    <View style={styles.titleBarButton} />
                    <View style={styles.titleBarButton} />
                </View>
                <View style={styles.content}>
                    <Texto className='text-black dark:text-white text-lg mb-2' weight='Bold'>{title}</Texto>
                    <Texto style={styles.cardText} className='text-black dark:text-white'>{detail}</Texto>
                </View>
            </View>
        </View>
    );
};

const Faq = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tiel, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const lista = [
        {
            title: '¿Hasta qué fecha puedo programar mi materia?',
            detail:
                'EL tiempo máximo para programar materia es hasta cuatro días desde que inicia el módulo.',
        },
        {
            title: '¿Cómo puedo programar mi materia?',
            detail:
                'Debe visitar el sitio: portal.upds.edu.bo/updsnet luego deberá ingresar a nuestra plataforma con el usuario de Microsoft office 365.',
        },
        {
            title: 'Soy estudiante de la UPDS y deseo reincorporarme',
            detail:
                'El primer paso es consultar con el are de Bienestar Estudiantil, si tuviste algún tipo de beca, posteriormente con tu jefe de Carrera para que te ayude a hacer la proyección de materias que llevaras durante el semestre.',
        },
        {
            title: '¿Cómo puedo congelar mi materia?',
            detail:
                'Debes comunicarte con Registro para presentar un justificativo que avale tu solicitud, por ejemplo: bole de viaje, certificado de baja médica, certificado de viaje de trabajo, etc. Posteriormente debes presentare con del Decano de tu Facultad.',
        },
        {
            title: 'Para realizar traspaso de Sede',
            detail:
                'Debes enviar una carta al are de Archivos de la Universidad Privada Domingo Savio sede Tarija solicitando el traspaso de la sede Tarija a otra sede del país.',
        },
        {
            title:
                'Para realizar convalidación externa (Cuando el estudiante viene de otra universidad)',
            detail: `•	Carta de solicitud dirigida a la Universidad Privada Domingo Savio.\n•	Fotocopia simple del carnet de identidad y título de bachiller.\n•	2 ejemplares de certificados de notas originales legalizados.\n•	Programas analíticos legalizados y foliados (fotocopia).\n•	Historial académico legalizado o ficha académica legalizada (fotocopia).\n•	Plan de estudios de la carrera con la carga horaria semestral legalizada.\n•	1 folder amarillo con fastenner y un sobre manila tamaño oficio.\n•	Resolución ministerial de la carrera de la universidad de origen (solo en caso de universidades privadas).`,
        },
        {
            title: '¿Cómo me uno al grupo de WhatsApp de mi materia?',
            detail:
                'El enlace a tu grupo de WhatsApp esta disponible en el curso de tu materia en la plataforma Moodle (virtual.upds.edu.bo)',
        },
        {
            title: '¿Cómo puedo ver mis notas en la plataforma?',
            detail:
                'Debes ingresar en la pestaña de Calificaciones ubicada en la parte izquierda de la plataforma Moodle',
        },
    ];

    const ShowContent = (t: string, c: string) => {
        setTitle(t);
        setContent(c);
    };

    return (
        <LayoutScreen title="Preguntas Frecuentes">
            <ScrollView showsVerticalScrollIndicator={false} className='mx-1'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Button title="Open Modal" onPress={handleOpenModal} /> */}
                    {/*  <FaqModal
            title="Este sera un titulo"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur convallis aliquet. Nullam facilisis sem id purus interdum, id iaculis odio fermentum. Phasellus ut neque nec ex bibendum aliquam. Integer sollicitudin ligula at mauris egestas, vitae gravida velit fringilla."
            visible={modalVisible}
            onClose={handleCloseModal}
          /> */}
                </View>
                <View style={styles.container}>
                    {lista.map((item, index) => (
                        <TouchableOpacity key={item.title}>
                            <MacCard key={index} title={item.title} detail={item.detail} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </LayoutScreen >
    );
};

export default Faq
const styles = StyleSheet.create({
    titleFaq: {
        color: COLORS.light.background,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,

    },
    cardContainer: {
        marginVertical: 10,
    },
    windowContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    titleBar: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleBarButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
        marginLeft: 5,
    },
    content: {
        padding: 20,
    },
    cardTitle: {
        marginBottom: 10,
    },
    cardTextContainer: {
        maxHeight: 80,
    },
    cardText: {
        fontSize: 12,
    },
});

// import React, { useState,Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
// import { StyleSheet } from 'react-native/Libraries/StyleSheet/StyleSheet';

// export const FaqScreen = () => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const [open, setopen] = useState(false);

//     const SECTIONS = [
//         {
//           title: 'First',
//           content: 'Lorem ipsum...',
//         },
//         {
//           title: 'Second',
//           content: 'Lorem ipsum...',
//         },
//       ];

//     return (
//         <View>
//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 0"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 1"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 2"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>
//         </View>
//     );
// };
