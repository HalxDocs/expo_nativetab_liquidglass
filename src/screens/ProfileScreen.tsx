import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { FadeSlideView } from '../components/FadeSlideView';
import { AnimatedListItem } from '../components/AnimatedListItem';
import { PressScale } from '../components/PressScale';

const SKILLS = [
  { label: 'React Native', level: 92, color: '#6366f1' },
  { label: 'TypeScript', level: 88, color: '#8b5cf6' },
  { label: 'UI/UX Design', level: 78, color: '#0ea5e9' },
  { label: 'Node.js', level: 70, color: '#10b981' },
];

const PORTFOLIO = [
  { name: 'NativeTabs', desc: 'Navigation template kit', icon: 'phone-portrait-outline', color: '#6366f1' },
  { name: 'SpotLight', desc: 'Social discovery app', icon: 'star-outline', color: '#f59e0b' },
  { name: 'EventYzze', desc: 'Event management app', icon: 'calendar-outline', color: '#10b981' },
];

const SOCIAL = [
  { icon: 'logo-github', label: 'GitHub', handle: 'maazdev', color: '#333' },
  { icon: 'logo-twitter', label: 'Twitter', handle: '@maaz_dev', color: '#1DA1F2' },
  { icon: 'globe-outline', label: 'Website', handle: 'maaz.dev', color: '#6366f1' },
];

export default function ProfileScreen() {
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    let parent = navigation.getParent();

    while (parent && parent.getState().type !== 'drawer') {
      parent = parent.getParent();
    }

    parent?.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  useEffect(() => {
    const tabNavigation = navigation as any;

    return tabNavigation.addListener('tabPress', (event: any) => {
      if (!tabNavigation.isFocused()) {
        return;
      }

      event.preventDefault();
      openDrawer();
    });
  }, [navigation, openDrawer]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.background} />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <FadeSlideView delay={0} duration={320}>
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.headerEyebrow, { color: c.textSecondary }]}>Account</Text>
              <Text style={[styles.headerTitle, { color: c.text }]}>Profile</Text>
            </View>
            <PressScale onPress={openDrawer} scaleTo={0.92}>
              <View style={[styles.menuButton, { backgroundColor: c.surface, borderColor: c.border }]}>
                <Ionicons name="menu-outline" size={22} color={c.textSecondary} />
              </View>
            </PressScale>
          </View>
        </FadeSlideView>

        {/* Cover */}
        <FadeSlideView delay={40} duration={400} fromY={0}>
          <LinearGradient
            colors={isDark ? ['#1e2050', '#251a45'] : [c.gradientStart, c.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cover}
          >
            <TouchableOpacity style={[styles.editBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Ionicons name="pencil-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </FadeSlideView>

        {/* Avatar + Name */}
        <FadeSlideView delay={60} duration={400}>
          <View style={styles.avatarSection}>
            <LinearGradient colors={[c.gradientStart, c.gradientEnd]} style={styles.avatarRing}>
              <View style={[styles.avatar, { backgroundColor: c.surface }]}>
                <Text style={[styles.avatarLetter, { color: c.primary }]}>M</Text>
              </View>
            </LinearGradient>
            <View style={[styles.badgePill, { backgroundColor: c.primary }]}>
              <Ionicons name="checkmark" size={10} color="#fff" />
            </View>
          </View>

          <View style={styles.nameSection}>
            <Text style={[styles.name, { color: c.text }]}>Maaz</Text>
            <Text style={[styles.bio, { color: c.textSecondary }]}>
              Mobile developer & UI enthusiast. Building beautiful apps with React Native.
            </Text>
            <View style={styles.tagRow}>
              {['React Native', 'Expo', 'TypeScript'].map(tag => (
                <View key={tag} style={[styles.tag, { backgroundColor: c.primaryLight }]}>
                  <Text style={[styles.tagText, { color: c.primary }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeSlideView>

        {/* Stats */}
        <FadeSlideView delay={130} duration={380}>
          <View style={[styles.statsCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            {[
              { label: 'Projects', value: '24' },
              { label: 'Followers', value: '4.2k' },
              { label: 'Following', value: '186' },
              { label: 'Stars', value: '1.8k' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <View style={styles.stat}>
                  <Text style={[styles.statVal, { color: c.text }]}>{s.value}</Text>
                  <Text style={[styles.statLbl, { color: c.textTertiary }]}>{s.label}</Text>
                </View>
                {i < arr.length - 1 && <View style={[styles.vDivider, { backgroundColor: c.border }]} />}
              </React.Fragment>
            ))}
          </View>
        </FadeSlideView>

        {/* Skills */}
        <FadeSlideView delay={200} duration={380}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Skills</Text>
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            {SKILLS.map((skill, i) => (
              <View key={i} style={[styles.skillRow, i < SKILLS.length - 1 && { marginBottom: 16 }]}>
                <View style={styles.skillHeader}>
                  <Text style={[styles.skillName, { color: c.text }]}>{skill.label}</Text>
                  <Text style={[styles.skillPct, { color: skill.color }]}>{skill.level}%</Text>
                </View>
                <View style={[styles.progressBg, { backgroundColor: c.surfaceAlt }]}>
                  <View style={[styles.progressFill, { width: `${skill.level}%`, backgroundColor: skill.color }]} />
                </View>
              </View>
            ))}
          </View>
        </FadeSlideView>

        {/* Portfolio */}
        <FadeSlideView delay={270} duration={380}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Portfolio</Text>
          <View style={styles.portfolioRow}>
            {PORTFOLIO.map((item, i) => (
              <PressScale key={i} scaleTo={0.95} style={[styles.portfolioCard, { backgroundColor: c.surface, borderColor: c.border }]}>
                <View style={[styles.portfolioIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={[styles.portfolioName, { color: c.text }]}>{item.name}</Text>
                <Text style={[styles.portfolioDesc, { color: c.textTertiary }]}>{item.desc}</Text>
              </PressScale>
            ))}
          </View>
        </FadeSlideView>

        {/* Social */}
        <FadeSlideView delay={330} duration={360}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Connect</Text>
        </FadeSlideView>
        <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
          {SOCIAL.map((s, i, arr) => (
            <AnimatedListItem key={i} index={i} baseDelay={350}>
              <TouchableOpacity style={styles.socialRow} activeOpacity={0.7}>
                <View style={[styles.socialIcon, { backgroundColor: s.color + '18' }]}>
                  <Ionicons name={s.icon as any} size={18} color={s.color} />
                </View>
                <View style={styles.socialBody}>
                  <Text style={[styles.socialLabel, { color: c.text }]}>{s.label}</Text>
                  <Text style={[styles.socialHandle, { color: c.textTertiary }]}>{s.handle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={[styles.divider, { backgroundColor: c.borderLight }]} />}
            </AnimatedListItem>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 20 },
  headerRow: {
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerEyebrow: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: { height: 130, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 16 },
  editBtn: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  avatarSection: { marginTop: -44, marginLeft: 24, marginBottom: 12, alignSelf: 'flex-start', position: 'relative' },
  avatarRing: { width: 88, height: 88, borderRadius: 28, padding: 3 },
  avatar: { flex: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { fontSize: 36, fontWeight: '700' },
  badgePill: {
    position: 'absolute', bottom: 2, right: 2,
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  nameSection: { paddingHorizontal: 24, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5, marginBottom: 6 },
  bio: { fontSize: 13.5, lineHeight: 20, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '500' },
  statsCard: {
    marginHorizontal: 20, borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginBottom: 28,
  },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', letterSpacing: -0.5 },
  statLbl: { fontSize: 11, marginTop: 2 },
  vDivider: { width: 1, height: 32 },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: 14, marginHorizontal: 20,
  },
  card: { marginHorizontal: 20, borderRadius: 18, padding: 16, borderWidth: 1, marginBottom: 28 },
  skillRow: {},
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { fontSize: 13.5, fontWeight: '500' },
  skillPct: { fontSize: 13, fontWeight: '600' },
  progressBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  portfolioRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 28 },
  portfolioCard: { flex: 1, borderRadius: 16, padding: 14, borderWidth: 1, alignItems: 'center', gap: 8 },
  portfolioIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  portfolioName: { fontSize: 12.5, fontWeight: '600', textAlign: 'center' },
  portfolioDesc: { fontSize: 11, textAlign: 'center', lineHeight: 15 },
  socialRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  socialIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  socialBody: { flex: 1 },
  socialLabel: { fontSize: 13.5, fontWeight: '500' },
  socialHandle: { fontSize: 12, marginTop: 1 },
  divider: { height: 1, marginLeft: 48 },
});
