import { MaterialTopTabs } from '@/navigator/top-tabs';
import { COLORS } from '~/constants';
import { Animated } from 'react-native';
import { useThemeColor } from '@/hooks';


const av = new Animated.Value(0);
av.addListener(() => {
    return;
});


export default function Layout() {
    const isDarkMode = useThemeColor() === 'dark';


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
            <MaterialTopTabs.Screen
                name="index"
                options={{
                    title: 'MALLA CURRICULAR',
                    /*
                 
                  tabBarIcon: ({ color }) => (
                         <MaterialIcons name="home" color={color} size={20} />
                     ),*/

                }}
            />
            <MaterialTopTabs.Screen
                name="boleta"

            />
        </MaterialTopTabs>
    );
}
