import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/src/hooks/useTheme';
import DrawerContent from '@/src/components/DrawerContent';

export default function DrawerLayout() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 270,
          backgroundColor: c.drawerBackground,
        },
        overlayColor: 'rgba(0,0,0,0.6)',
        swipeEdgeWidth: 40,
      }}
    />
  );
}
