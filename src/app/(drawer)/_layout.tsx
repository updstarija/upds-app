import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawer } from '@/components';
import { COLORS } from '~/constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const LayoutDrawer = () => {
  return (
    <Drawer screenOptions={{
      swipeEnabled: false,
      drawerType: "slide",
      drawerActiveBackgroundColor: COLORS.light.background,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#ccc',
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
        options={{
          title: 'Ajustes',
          drawerIcon: ({ color }) => (
            <Ionicons name='settings-outline' size={20} color={color} />
          )
        }}
      />
    </Drawer>
  );
};

export default LayoutDrawer;
