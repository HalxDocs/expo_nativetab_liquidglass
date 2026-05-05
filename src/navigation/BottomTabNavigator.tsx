import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { DrawerSceneWrapper } from '../components/DrawerSceneWrapper';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', component: HomeScreen, icon: 'home-outline', activeIcon: 'home' },
  { name: 'Explore', component: ExploreScreen, icon: 'compass-outline', activeIcon: 'compass' },
  { name: 'Notifications', component: NotificationsScreen, icon: 'notifications-outline', activeIcon: 'notifications', badge: true },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', activeIcon: 'person' },
];

function AnimatedTabIcon({
  focused,
  icon,
  activeIcon,
  badge,
  color,
  activeColor,
}: {
  focused: boolean;
  icon: string;
  activeIcon: string;
  badge?: boolean;
  color: string;
  activeColor: string;
}) {
  const scale = useSharedValue(1);
  const dotOpacity = useSharedValue(focused ? 1 : 0);
  const dotScale = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    const ease = { duration: 200, easing: Easing.out(Easing.cubic) };
    if (focused) {
      scale.value = withSequence(
        withTiming(1.15, { duration: 100, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 150, easing: Easing.out(Easing.cubic) }),
      );
      dotOpacity.value = withTiming(1, ease);
      dotScale.value = withTiming(1, ease);
    } else {
      scale.value = withTiming(1, { duration: 160, easing: Easing.out(Easing.cubic) });
      dotOpacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.quad) });
      dotScale.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.quad) });
    }
  }, [focused]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
    transform: [{ scale: dotScale.value }],
  }));

  return (
    <View style={styles.iconWrap}>
      <Animated.View style={iconStyle}>
        <Ionicons
          name={(focused ? activeIcon : icon) as any}
          size={22}
          color={color}
        />
      </Animated.View>
      <Animated.View style={[styles.activeDot, dotStyle, { backgroundColor: activeColor }]} />
      {badge && !focused && <View style={[styles.badgeDot, { borderColor: 'transparent' }]} />}
    </View>
  );
}

export default function BottomTabNavigator({ navigation }: any) {
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const tabBarBg = isDark ? 'rgba(11,11,19,0.98)' : 'rgba(255,255,255,0.98)';
  const tabBarBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  return (
    <DrawerSceneWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: tabBarBg,
            borderTopWidth: 0.5,
            borderTopColor: tabBarBorder,
            height: Platform.OS === 'ios' ? 84 : 66,
            paddingBottom: Platform.OS === 'ios' ? 24 : 8,
            paddingTop: 10,
            elevation: 0,
            shadowColor: isDark ? '#000' : '#6060aa',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: isDark ? 0.3 : 0.06,
            shadowRadius: 12,
          },
          tabBarActiveTintColor: c.tabBarActive,
          tabBarInactiveTintColor: c.tabBarInactive,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '400',
            marginTop: 0,
            letterSpacing: 0.1,
          },
          tabBarIcon: ({ focused, color }) => {
            const tab = TABS.find(t => t.name === route.name);
            if (!tab) return null;
            return (
              <AnimatedTabIcon
                focused={focused}
                icon={tab.icon}
                activeIcon={tab.activeIcon}
                badge={(tab as any).badge}
                color={color}
                activeColor={c.tabBarActive}
              />
            );
          },
        })}
      >
        {TABS.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{ title: tab.name }}
            listeners={{
              tabLongPress: () => navigation.openDrawer(),
            }}
          />
        ))}
      </Tab.Navigator>
    </DrawerSceneWrapper>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 44,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  badgeDot: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f43f5e',
    borderWidth: 1,
  },
});
