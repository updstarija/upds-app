import { MaterialTopTabs } from '@/navigator/top-tabs';
import { COLORS } from '~/constants';
import { Animated } from 'react-native';
import { useProyeccionesContext, useThemeColor } from '@/hooks';
import { ProyeccionesProvider } from '@/context/ProyeccionesContext';
import { useTourGuideController } from 'rn-tourguide';
import { useEffect } from 'react';
import { verTutorial } from '@/helpers';
import { Stack, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

const av = new Animated.Value(0);
av.addListener(() => {
    return;
});


export const unstable_settings = {
    initialRouteName: "boleta"
}

export default function Layout() {
    const isDarkMode = useThemeColor() === 'dark';

    const { canStart, start, tourKey, stop } = useTourGuideController("t-boleta")

    const { tutorialBoletaReady, tutorialEnCurso, setTutorialEnCurso } = useProyeccionesContext();

    const startTutorial = async () => {
        if (!Object.values(tutorialBoletaReady).includes(false)) {
            const activarTutorial = await verTutorial(tourKey)

            if (!activarTutorial) {
                setTutorialEnCurso((prev: any) => ({ ...prev, inCourse: false }))
                return;
            }
            if (canStart && activarTutorial) {
                setTutorialEnCurso((prev: any) => ({ ...prev, inCourse: true }))

                setTimeout(() => {
                    start();
                }, 1000);
            }
        }
    }


    return (

        <MaterialTopTabs
            screenListeners={{
                focus: () => {
                    Animated.timing(av, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                },
                blur: () => {
                    if (tutorialEnCurso.inCourse) {
                        router.push("/proyecciones/boleta")
                    }
                }
            }}


            screenOptions={{

                lazy: true,
                //tabBarItemStyle: { padding: 6 },

                tabBarStyle: {
                    backgroundColor: isDarkMode ? COLORS.dark.secondary : COLORS.light.background,

                },
                tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },

                tabBarActiveTintColor: isDarkMode
                    ? '#FFF'
                    : '#FFF',

                // API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
            }}>


            <Drawer.Screen
                name="malla-curricular"

                //@ts-ignore
                options={{

                    drawerItemStyle: {
                        display: "none"
                    },

                }}
                listeners={() => ({
                    focus: () => {
                        if (tutorialEnCurso.inCourse) {
                            router.push("/proyecciones/boleta")

                        }

                    },


                })}
            />


            <MaterialTopTabs.Screen
                name="boleta"
                listeners={() => ({
                    blur: () => {
                        if (tutorialEnCurso.inCourse) {
                            router.push("/proyecciones/boleta")

                        }
                    },
                    focus: () => {
                        startTutorial()
                    }

                })}
            />
        </MaterialTopTabs>



    );
}
