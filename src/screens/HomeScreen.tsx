import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { FadeSlideView } from '../components/FadeSlideView';
import { AnimatedListItem } from '../components/AnimatedListItem';
import { PressScale } from '../components/PressScale';

const { width } = Dimensions.get('window');

const STATS = [
  { label: 'Revenue', value: '$24.8k', change: '+12%', up: true, icon: 'trending-up-outline', color: '#6366f1' },
  { label: 'Users', value: '1,284', change: '+8%', up: true, icon: 'people-outline', color: '#8b5cf6' },
  { label: 'Orders', value: '342', change: '-3%', up: false, icon: 'cart-outline', color: '#f59e0b' },
  { label: 'Growth', value: '18.2%', change: '+2%', up: true, icon: 'stats-chart-outline', color: '#10b981' },
];

const RECENT_ACTIVITY = [
  { id: '1', title: 'New user registered', subtitle: 'alex.johnson@email.com', time: '2m ago', icon: 'person-add-outline', color: '#6366f1' },
  { id: '2', title: 'Order #1042 placed', subtitle: 'Pro subscription · $49/mo', time: '14m ago', icon: 'card-outline', color: '#10b981' },
  { id: '3', title: 'Server alert resolved', subtitle: 'API latency back to normal', time: '1h ago', icon: 'checkmark-circle-outline', color: '#f59e0b' },
  { id: '4', title: 'Design review done', subtitle: 'Mobile app v2.1 approved', time: '3h ago', icon: 'color-palette-outline', color: '#8b5cf6' },
  { id: '5', title: 'Deployment success', subtitle: 'Production · v2.0.4', time: '5h ago', icon: 'rocket-outline', color: '#0ea5e9' },
];

const QUICK_ACTIONS = [
  { label: 'Analytics', icon: 'bar-chart-outline', color: '#6366f1', bg: '#eef2ff' },
  { label: 'Messages', icon: 'chatbubble-ellipses-outline', color: '#8b5cf6', bg: '#f3f0ff' },
  { label: 'Calendar', icon: 'calendar-outline', color: '#0ea5e9', bg: '#e0f2fe' },
  { label: 'Tasks', icon: 'checkbox-outline', color: '#10b981', bg: '#d1fae5' },
];

const PROJECTS = [
  { name: 'NativeTabs UI Kit', progress: 82, color: '#6366f1', members: 4 },
  { name: 'Backend API v3', progress: 61, color: '#8b5cf6', members: 3 },
  { name: 'Marketing Site', progress: 95, color: '#10b981', members: 2 },
];

export default function HomeScreen() {
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    let parent = navigation.getParent();

    while (parent && parent.getState().type !== 'drawer') {
      parent = parent.getParent();
    }

    parent?.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.background} />

      <Animated.View
        style={[styles.stickyHeader, { backgroundColor: c.surface, borderBottomColor: c.border, opacity: headerOpacity }]}
        pointerEvents="none"
      >
        <Text style={[styles.stickyTitle, { color: c.text }]}>Dashboard</Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <FadeSlideView delay={0} duration={400}>
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.greeting, { color: c.textSecondary }]}>Good morning ☀️</Text>
              <Text style={[styles.userName, { color: c.text }]}>Maaz</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: c.surface, borderColor: c.border }]}
                onPress={() => router.push('/notifications')}
              >
                <Ionicons name="notifications-outline" size={20} color={c.textSecondary} />
                <View style={[styles.notifDot, { backgroundColor: c.danger }]} />
              </TouchableOpacity>
              <PressScale onPress={openDrawer} scaleTo={0.92}>
                <View style={[styles.avatar, { backgroundColor: c.primary }]}>
                  <Text style={styles.avatarText}>M</Text>
                </View>
              </PressScale>
            </View>
          </View>
        </FadeSlideView>

        {/* Hero Banner */}
        <FadeSlideView delay={80} duration={420}>
          <PressScale scaleTo={0.98}>
            <LinearGradient
              colors={isDark ? ['#1e2050', '#251a45'] : [c.gradientStart, c.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroBanner}
            >
              <View style={styles.heroLeft}>
                <Text style={styles.heroLabel}>Weekly Summary</Text>
                <Text style={styles.heroValue}>$24,820</Text>
                <View style={styles.heroRow}>
                  <Ionicons name="arrow-up-outline" size={14} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.heroChange}>12.4% vs last week</Text>
                </View>
              </View>
              <View style={styles.heroRight}>
                <View style={styles.heroOrb1} />
                <View style={styles.heroOrb2} />
                <Ionicons name="trending-up" size={52} color="rgba(255,255,255,0.18)" />
              </View>
            </LinearGradient>
          </PressScale>
        </FadeSlideView>

        {/* Stats Grid */}
        <FadeSlideView delay={160} duration={400}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Overview</Text>
          <View style={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <PressScale key={i} scaleTo={0.96} style={[styles.statCard, { backgroundColor: c.surface, borderColor: c.border, shadowColor: c.shadowDark }]}>
                <View style={[styles.statIconBox, { backgroundColor: stat.color + '18' }]}>
                  <Ionicons name={stat.icon as any} size={18} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: c.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: c.textTertiary }]}>{stat.label}</Text>
                <View style={styles.statBadge}>
                  <Ionicons
                    name={stat.up ? 'arrow-up-outline' : 'arrow-down-outline'}
                    size={10}
                    color={stat.up ? c.success : c.danger}
                  />
                  <Text style={[styles.statChange, { color: stat.up ? c.success : c.danger }]}>{stat.change}</Text>
                </View>
              </PressScale>
            ))}
          </View>
        </FadeSlideView>

        {/* Quick Actions */}
        <FadeSlideView delay={240} duration={400}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Quick Actions</Text>
          <View style={styles.quickRow}>
            {QUICK_ACTIONS.map((action, i) => (
              <PressScale key={i} scaleTo={0.94} style={[styles.quickItem, { backgroundColor: c.surface, borderColor: c.border }]}>
                <View style={[styles.quickIcon, { backgroundColor: isDark ? action.color + '22' : action.bg }]}>
                  <Ionicons name={action.icon as any} size={22} color={action.color} />
                </View>
                <Text style={[styles.quickLabel, { color: c.textSecondary }]}>{action.label}</Text>
              </PressScale>
            ))}
          </View>
        </FadeSlideView>

        {/* Projects */}
        <FadeSlideView delay={300} duration={400}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.textSecondary, marginBottom: 0 }]}>Active Projects</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: c.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.projectsWrap}>
            {PROJECTS.map((proj, i) => (
              <PressScale key={i} scaleTo={0.98} style={[styles.projectCard, { backgroundColor: c.surface, borderColor: c.border }]}>
                <View style={styles.projectHeader}>
                  <View style={[styles.projectDot, { backgroundColor: proj.color }]} />
                  <Text style={[styles.projectName, { color: c.text }]}>{proj.name}</Text>
                  <Text style={[styles.projectPct, { color: proj.color }]}>{proj.progress}%</Text>
                </View>
                <View style={[styles.progressBg, { backgroundColor: c.surfaceAlt }]}>
                  <View style={[styles.progressFill, { width: `${proj.progress}%`, backgroundColor: proj.color }]} />
                </View>
                <View style={styles.projectFooter}>
                  <View style={styles.membersRow}>
                    {Array.from({ length: proj.members }).map((_, mi) => (
                      <View
                        key={mi}
                        style={[
                          styles.memberBubble,
                          { backgroundColor: proj.color, marginLeft: mi === 0 ? 0 : -8, zIndex: proj.members - mi },
                        ]}
                      >
                        <Text style={styles.memberInitial}>{String.fromCharCode(65 + mi)}</Text>
                      </View>
                    ))}
                    <Text style={[styles.memberCount, { color: c.textTertiary }]}>{proj.members} members</Text>
                  </View>
                  <Text style={[styles.projectStatus, { color: c.textTertiary }]}>In progress</Text>
                </View>
              </PressScale>
            ))}
          </View>
        </FadeSlideView>

        {/* Recent Activity */}
        <FadeSlideView delay={360} duration={400}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.textSecondary, marginBottom: 0 }]}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: c.primary }]}>View all</Text>
            </TouchableOpacity>
          </View>
        </FadeSlideView>

        <View style={[styles.activityCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          {RECENT_ACTIVITY.map((item, i) => (
            <AnimatedListItem key={item.id} index={i} baseDelay={380}>
              <TouchableOpacity style={styles.activityRow} activeOpacity={0.7}>
                <View style={[styles.activityIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <View style={styles.activityBody}>
                  <Text style={[styles.activityTitle, { color: c.text }]}>{item.title}</Text>
                  <Text style={[styles.activitySub, { color: c.textTertiary }]}>{item.subtitle}</Text>
                </View>
                <Text style={[styles.activityTime, { color: c.textTertiary }]}>{item.time}</Text>
              </TouchableOpacity>
              {i < RECENT_ACTIVITY.length - 1 && (
                <View style={[styles.divider, { backgroundColor: c.borderLight }]} />
              )}
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
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 52,
    paddingBottom: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  stickyTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  greeting: { fontSize: 13, fontWeight: '400', marginBottom: 2 },
  userName: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 7, height: 7, borderRadius: 3.5, borderWidth: 1.5, borderColor: '#fff',
  },
  avatar: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  heroBanner: {
    borderRadius: 20, padding: 24, marginBottom: 28,
    flexDirection: 'row', alignItems: 'center', overflow: 'hidden',
  },
  heroLeft: { flex: 1 },
  heroLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 6, letterSpacing: 0.5 },
  heroValue: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -1 },
  heroRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  heroChange: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  heroRight: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  heroOrb1: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.06)' },
  heroOrb2: { position: 'absolute', width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.1)' },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14, marginTop: 8,
  },
  seeAll: { fontSize: 13, fontWeight: '500' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  statCard: {
    width: (width - 52) / 2, borderRadius: 16, padding: 16, borderWidth: 1,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 2,
  },
  statIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statValue: { fontSize: 20, fontWeight: '700', letterSpacing: -0.5, marginBottom: 2 },
  statLabel: { fontSize: 12, marginBottom: 8 },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  statChange: { fontSize: 11, fontWeight: '500' },
  quickRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  quickItem: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, gap: 8 },
  quickIcon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 11, fontWeight: '500' },
  projectsWrap: { gap: 10, marginBottom: 28 },
  projectCard: { borderRadius: 16, padding: 16, borderWidth: 1 },
  projectHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  projectDot: { width: 8, height: 8, borderRadius: 4 },
  projectName: { flex: 1, fontSize: 14, fontWeight: '500' },
  projectPct: { fontSize: 13, fontWeight: '600' },
  progressBg: { height: 5, borderRadius: 3, marginBottom: 12, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  projectFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  membersRow: { flexDirection: 'row', alignItems: 'center' },
  memberBubble: {
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#fff',
  },
  memberInitial: { fontSize: 9, fontWeight: '700', color: '#fff' },
  memberCount: { fontSize: 11, marginLeft: 10 },
  projectStatus: { fontSize: 11 },
  activityCard: { borderRadius: 18, overflow: 'hidden', borderWidth: 1 },
  activityRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  activityIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  activityBody: { flex: 1 },
  activityTitle: { fontSize: 13.5, fontWeight: '500', marginBottom: 2 },
  activitySub: { fontSize: 12 },
  activityTime: { fontSize: 11, flexShrink: 0 },
  divider: { height: 1, marginLeft: 64 },
});
