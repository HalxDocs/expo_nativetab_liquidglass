import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

const MAIN_ITEMS = [
  { label: 'Home',          icon: 'home-outline',          activeIcon: 'home',          href: '/'              },
  { label: 'Explore',       icon: 'compass-outline',       activeIcon: 'compass',       href: '/explore'       },
  { label: 'Notifications', icon: 'notifications-outline', activeIcon: 'notifications', href: '/notifications' },
  { label: 'Profile',       icon: 'person-outline',        activeIcon: 'person',        href: '/profile'       },
] as const;

const FOOTER_ITEMS = [
  { label: 'Settings', icon: 'settings-outline', href: '/settings' },
  { label: 'Help',     icon: 'help-circle-outline', href: '/'      },
] as const;

export default function DrawerContent(props: any) {
  const { theme, isDark, toggleTheme } = useTheme();
  const c = theme.colors;
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const navigate = (href: string) => {
    props.navigation.closeDrawer();
    router.push(href as any);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: c.drawerBackground, paddingTop: insets.top + 20 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile */}
      <View style={styles.profile}>
        <View style={[styles.avatar, { backgroundColor: c.primary + '18' }]}>
          <Text style={[styles.avatarInitial, { color: c.primary }]}>M</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={[styles.profileName, { color: c.text }]}>Maaz</Text>
          <Text style={[styles.profileHandle, { color: c.textSecondary }]}>@maaz.dev</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: c.border }]} />

      {/* Main nav */}
      <View style={styles.section}>
        {MAIN_ITEMS.map(item => {
          const isActive =
            item.href === '/'
              ? pathname === '/' || pathname === ''
              : pathname.startsWith(item.href);
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.item, isActive && { backgroundColor: c.primary + '10' }]}
              onPress={() => navigate(item.href)}
              activeOpacity={0.65}
            >
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={17}
                color={isActive ? c.primary : c.drawerInactiveText}
              />
              <Text
                style={[
                  styles.itemLabel,
                  { color: isActive ? c.primary : c.drawerInactiveText },
                  isActive && styles.itemLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.divider, { backgroundColor: c.border }]} />

      {/* Footer nav */}
      <View style={styles.section}>
        {FOOTER_ITEMS.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            onPress={() => navigate(item.href)}
            activeOpacity={0.65}
          >
            <Ionicons name={item.icon as any} size={17} color={c.drawerInactiveText} />
            <Text style={[styles.itemLabel, { color: c.drawerInactiveText }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Theme toggle */}
      <TouchableOpacity
        style={[styles.themeRow, { borderTopColor: c.border }]}
        onPress={toggleTheme}
        activeOpacity={0.65}
      >
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={15}
          color={c.textTertiary}
        />
        <Text style={[styles.themeLabel, { color: c.textTertiary }]}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: c.textTertiary }]}>v1.0</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 18,
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  profileHandle: {
    fontSize: 11.5,
    fontWeight: '400',
    marginTop: 1,
  },
  divider: {
    height: 0.5,
    marginHorizontal: 18,
    marginBottom: 6,
  },
  section: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 1,
  },
  itemLabel: {
    fontSize: 13.5,
    fontWeight: '400',
  },
  itemLabelActive: {
    fontWeight: '500',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 0.5,
    marginTop: 8,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  version: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 10,
    letterSpacing: 0.3,
  },
});
