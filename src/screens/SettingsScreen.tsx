import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { FadeSlideView } from '../components/FadeSlideView';
import { PressScale } from '../components/PressScale';

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-circle-outline', label: 'Edit Profile', type: 'nav', color: '#6366f1' },
      { icon: 'key-outline', label: 'Change Password', type: 'nav', color: '#8b5cf6' },
      { icon: 'mail-outline', label: 'Email Preferences', type: 'nav', color: '#0ea5e9' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline', label: 'Notifications', type: 'toggle', key: 'notifs', color: '#f59e0b' },
      { icon: 'volume-medium-outline', label: 'Sound & Haptics', type: 'toggle', key: 'sound', color: '#10b981' },
      { icon: 'language-outline', label: 'Language', type: 'nav', value: 'English', color: '#6366f1' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { icon: 'lock-closed-outline', label: 'Privacy Settings', type: 'nav', color: '#f43f5e' },
      { icon: 'eye-off-outline', label: 'Profile Visibility', type: 'nav', value: 'Public', color: '#8b5cf6' },
      { icon: 'shield-checkmark-outline', label: 'Two-Factor Auth', type: 'toggle', key: '2fa', color: '#10b981' },
    ],
  },
  {
    title: 'About',
    items: [
      { icon: 'information-circle-outline', label: 'App Version', type: 'value', value: '1.0.0', color: '#6366f1' },
      { icon: 'document-text-outline', label: 'Terms of Service', type: 'nav', color: '#8b5cf6' },
      { icon: 'shield-outline', label: 'Privacy Policy', type: 'nav', color: '#0ea5e9' },
    ],
  },
];

export default function SettingsScreen({ navigation }: any) {
  const { theme, isDark, toggleTheme } = useTheme();
  const c = theme.colors;
  const [toggles, setToggles] = React.useState({ notifs: true, sound: false, '2fa': true });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.background} />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <FadeSlideView delay={0} duration={360}>
          <View style={styles.headerRow}>
            <PressScale scaleTo={0.9} onPress={() => navigation.goBack()}>
              <View style={[styles.backBtn, { backgroundColor: c.surface, borderColor: c.border }]}>
                <Ionicons name="arrow-back" size={20} color={c.text} />
              </View>
            </PressScale>
            <Text style={[styles.title, { color: c.text }]}>Settings</Text>
            <View style={{ width: 40 }} />
          </View>
        </FadeSlideView>

        {/* Theme toggle */}
        <FadeSlideView delay={60} duration={360}>
          <View style={[styles.themeCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View style={styles.themeLeft}>
              <View style={[styles.themeIcon, { backgroundColor: isDark ? '#1e1e3f' : '#eef2ff' }]}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={c.primary} />
              </View>
              <View>
                <Text style={[styles.themeLabel, { color: c.text }]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                <Text style={[styles.themeSub, { color: c.textTertiary }]}>{isDark ? 'Easy on the eyes' : 'Clean & bright'}</Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: c.border, true: c.primary }}
              thumbColor="#fff"
            />
          </View>
        </FadeSlideView>

        {/* Sections */}
        {SECTIONS.map((section, si) => (
          <FadeSlideView key={si} delay={120 + si * 70} duration={360}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: c.textTertiary }]}>{section.title}</Text>
              <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
                {section.items.map((item: any, ii, arr) => (
                  <View key={ii}>
                    <TouchableOpacity
                      style={styles.row}
                      activeOpacity={item.type === 'value' ? 1 : 0.7}
                    >
                      <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
                        <Ionicons name={item.icon as any} size={18} color={item.color} />
                      </View>
                      <Text style={[styles.rowLabel, { color: c.text }]}>{item.label}</Text>
                      <View style={styles.rowRight}>
                        {item.type === 'toggle' && (
                          <Switch
                            value={toggles[item.key as keyof typeof toggles]}
                            onValueChange={v => setToggles(prev => ({ ...prev, [item.key]: v }))}
                            trackColor={{ false: c.border, true: c.primary }}
                            thumbColor="#fff"
                            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                          />
                        )}
                        {item.type === 'value' && (
                          <Text style={[styles.rowValue, { color: c.textTertiary }]}>{item.value}</Text>
                        )}
                        {item.type === 'nav' && (
                          <>
                            {item.value && (
                              <Text style={[styles.rowValue, { color: c.textTertiary }]}>{item.value}</Text>
                            )}
                            <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                    {ii < arr.length - 1 && <View style={[styles.divider, { backgroundColor: c.borderLight }]} />}
                  </View>
                ))}
              </View>
            </View>
          </FadeSlideView>
        ))}

        {/* Sign out */}
        <FadeSlideView delay={420} duration={360}>
          <PressScale scaleTo={0.97}>
            <View style={[styles.signOutBtn, { borderColor: c.danger + '50', backgroundColor: c.danger + '0f' }]}>
              <Ionicons name="log-out-outline" size={18} color={c.danger} />
              <Text style={[styles.signOutText, { color: c.danger }]}>Sign Out</Text>
            </View>
          </PressScale>
        </FadeSlideView>

        <View style={{ height: 24 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 24,
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  themeCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 18, padding: 16, borderWidth: 1, marginBottom: 24,
  },
  themeLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  themeIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  themeLabel: { fontSize: 14.5, fontWeight: '600' },
  themeSub: { fontSize: 12, marginTop: 2 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 11, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: 10, marginLeft: 4,
  },
  card: { borderRadius: 18, overflow: 'hidden', borderWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16, gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '400' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowValue: { fontSize: 13 },
  divider: { height: 1, marginLeft: 64 },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1, marginTop: 4,
  },
  signOutText: { fontSize: 14.5, fontWeight: '600' },
});
