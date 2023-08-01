import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialTopTabs } from '@/navigator/top-tabs';
import { COLORS } from '~/constants';
import { Layout as LayoutHome } from '@/layout/Layout';
import { Animated } from 'react-native';
import { useThemeColor } from '@/hooks';


const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const isDarkMode = useThemeColor() === 'dark';

  //console.log(segments, "0000000010230102319239129391239192312381");
  return (
    <>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.secondary : COLORS.light.background
        }
        style="light"
      />

      <LayoutHome>
        <MaterialTopTabs
          style={{ backgroundColor: 'red' }}
          screenListeners={{
            focus: () => {
              Animated.timing(av, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }).start();
            },
          }}
          tabBarPosition="bottom"
          screenOptions={{
            //   lazy: true,
            tabBarItemStyle: { padding: 6 },
            tabBarStyle: {
              backgroundColor: isDarkMode ? COLORS.dark.secondary : '#FFF',
            },
            tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },

            tabBarActiveTintColor: isDarkMode
              ? '#FFF'
              : COLORS.light.background,

            // API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
          }}>
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" color={color} size={20} />
              ),
            }}
          />
          {/* 
                <MaterialTopTabs.Screen
                    name="two"
                    options={{
                        title: 'Estudiante',
                        tabBarIcon: ({ color }) => <MaterialIcons name="school" color={color} size={20} />,
                    }}
                />

                <MaterialTopTabs.Screen
                    name="perfil"
                    options={{
                        title: 'Perfil',
                        tabBarIcon: ({ color }) => <FontAwesome name="user-circle" color={color} size={20} />,

                    }}
                />
 */}
          <MaterialTopTabs.Screen
            name="two"
            options={{
              title: 'Estudiante',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="school" color={color} size={20} />
              ),
            }}
          />

          <MaterialTopTabs.Screen
            name="perfil"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="verified-user" color={color} size={20} />
              ),
            }}
          />
        </MaterialTopTabs>
      </LayoutHome>
    </>
  );
}
