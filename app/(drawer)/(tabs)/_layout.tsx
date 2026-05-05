import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { type ColorValue, type ImageSourcePropType } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

type MCIFamily = {
  getImageSource: (
    name: string,
    size: number,
    color: ColorValue
  ) => Promise<ImageSourcePropType | null>;
};
const MCI = MaterialCommunityIcons as unknown as MCIFamily;
const mci = (name: string) => <VectorIcon family={MCI} name={name} />;

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  const tintColor = theme.colors.primary;
  const inactiveColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)';
  const tabBarBackground = isDark ? 'rgba(19,19,31,0.98)' : 'rgba(255,255,255,0.98)';

  return (
    <NativeTabs
      backgroundColor={tabBarBackground}
      badgeBackgroundColor="#EF4444"
      labelStyle={{ color: inactiveColor, fontSize: 10, fontWeight: '400' }}
      iconColor={inactiveColor}
      tintColor={tintColor}
      labelVisibilityMode="labeled"
      indicatorColor="transparent"
      minimizeBehavior="never"
      disableTransparentOnScrollEdge
      blurEffect="none"
      shadowColor={theme.colors.tabBarBorder}
    >
      <NativeTabs.Trigger name="index">
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={mci('home-outline')}
          selectedColor={tintColor}
        />
        <Label selectedStyle={{ color: tintColor, fontSize: 10, fontWeight: '600' }}>
          Home
        </Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <Icon
          sf={{ default: 'safari', selected: 'safari.fill' }}
          androidSrc={mci('compass-outline')}
          selectedColor={tintColor}
        />
        <Label selectedStyle={{ color: tintColor, fontSize: 10, fontWeight: '600' }}>
          Explore
        </Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notifications">
        <Icon
          sf={{ default: 'bell', selected: 'bell.fill' }}
          androidSrc={mci('bell-outline')}
          selectedColor={tintColor}
        />
        <Label selectedStyle={{ color: tintColor, fontSize: 10, fontWeight: '600' }}>
          Alerts
        </Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" disablePopToTop disableScrollToTop>
        <Icon
          sf={{ default: 'person.circle', selected: 'person.circle.fill' }}
          androidSrc={mci('account-circle-outline')}
          selectedColor={tintColor}
        />
        <Label selectedStyle={{ color: tintColor, fontSize: 10, fontWeight: '600' }}>
          Profile
        </Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
