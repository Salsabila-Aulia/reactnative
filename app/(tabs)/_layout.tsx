import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mahasiswa"
        options={{
          title: 'Item',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list-alt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mapwebview"
        options={{
          title: 'map',
          tabBarIcon: ({ color }) => <IconSymbol
            size={28}
            name="map"
            color={color}
          />,
        }}
      />
      <Tabs.Screen
        name="gmap"
        options={{
          title: 'GMAP',
          tabBarIcon: ({ color }) => <IconSymbol
            size={28}
            name="fmd-good"
            color={color}
          />,
          
        }}
      />

      <Tabs.Screen
        name="lokasi"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list" color={color} />,
        }}
      />

    </Tabs>


  );
}
