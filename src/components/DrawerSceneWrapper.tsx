import React from 'react';
import { StyleSheet, View } from 'react-native';

export function DrawerSceneWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.wrap}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
