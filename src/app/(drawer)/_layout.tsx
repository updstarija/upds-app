import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawer } from '@/components';
import { COLORS } from '~/constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { configStack } from '@/helpers';
import { useThemeColor } from '@/hooks';

const LayoutDrawer = () => {
  const isDark = useThemeColor() === "dark"
  return (
    <Drawer screenOptions={{
      swipeEnabled: false,
      drawerType: "slide",
      drawerActiveBackgroundColor: COLORS.light.background,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#9e9d9d',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'LatoRegular',
        fontSize: 15,
      },
    }} drawerContent={(x) => <CustomDrawer {...x} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Inicio',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name='home-outline' size={20} color={color} />
          )
        }}
      />

      {/* <Drawer.Screen
        name="perfil"

        options={{

          title: 'Perfil',
          headerStyle: { backgroundColor: "red" },
          drawerIcon: ({ color }) => (
            <Ionicons name='person-outline' size={20} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="ajustes"
        //@ts-ignore
        options={{
          title: "Ajustes",
          headerShown: true,
          headerStyle: {
            backgroundColor: isDark
              ? COLORS.dark.secondary
              : COLORS.light.background,

          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textTransform: "uppercase",
          },

          drawerIcon: ({ color }) => (
            <Ionicons name='settings-outline' size={20} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="testing"
        //@ts-ignore
        options={{
          ...configStack("Testing"),
          drawerItemStyle: {
            // display: "none"
          },
          drawerIcon: ({ color }) => (
            <Ionicons name='shield' size={20} color={color} />
          )
        }}
      />

      {/*  <Drawer.Screen
        name="carrera/[id]"
        options={{
          title: 'Carrera',
          drawerItemStyle: { display: "none" },
          drawerIcon: ({ color }) => (
            <Ionicons name='settings-outline' size={20} color={color} />
          )
        }}
      />
 */}

    </Drawer>
  );
};

export default LayoutDrawer;
