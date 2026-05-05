import React, { useState } from 'react';
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
import { useTheme } from '../hooks/useTheme';
import { FadeSlideView } from '../components/FadeSlideView';
import { AnimatedListItem } from '../components/AnimatedListItem';

const NOTIFS = [
  { id: '1', title: 'New follower', body: 'Sarah Chen started following you', time: '2m ago', icon: 'person-add-outline', color: '#6366f1', read: false },
  { id: '2', title: 'Order shipped', body: 'Your order #1042 is on its way', time: '18m ago', icon: 'cube-outline', color: '#10b981', read: false },
  { id: '3', title: 'Comment on your post', body: 'alex.j: "Great work on the UI!"', time: '1h ago', icon: 'chatbubble-outline', color: '#8b5cf6', read: false },
  { id: '4', title: 'Payment received', body: '$149.00 via Stripe · Invoice #1029', time: '3h ago', icon: 'wallet-outline', color: '#f59e0b', read: true },
  { id: '5', title: 'Project milestone', body: 'NativeTabs reached 80% completion', time: 'Yesterday', icon: 'flag-outline', color: '#0ea5e9', read: true },
  { id: '6', title: 'Security alert', body: 'New login from Safari on MacBook', time: 'Yesterday', icon: 'shield-outline', color: '#f43f5e', read: true },
  { id: '7', title: 'Weekly digest', body: 'Your stats are up 12% this week', time: '2 days ago', icon: 'stats-chart-outline', color: '#6366f1', read: true },
];

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [notifs, setNotifs] = useState(NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const todayNotifs = notifs.filter((_, i) => i < 3);
  const earlierNotifs = notifs.filter((_, i) => i >= 3);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.background} />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <FadeSlideView delay={0} duration={380}>
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.title, { color: c.text }]}>Notifications</Text>
              {unread > 0 && (
                <Text style={[styles.subtitle, { color: c.textSecondary }]}>{unread} unread</Text>
              )}
            </View>
            {unread > 0 && (
              <TouchableOpacity onPress={markAllRead} style={[styles.markBtn, { backgroundColor: c.primaryLight }]}>
                <Text style={[styles.markText, { color: c.primary }]}>Mark all read</Text>
              </TouchableOpacity>
            )}
          </View>
        </FadeSlideView>

        <FadeSlideView delay={60} duration={340}>
          <Text style={[styles.groupLabel, { color: c.textTertiary }]}>Today</Text>
        </FadeSlideView>

        <View style={[styles.group, { backgroundColor: c.surface, borderColor: c.border }]}>
          {todayNotifs.map((n, i, arr) => (
            <AnimatedListItem key={n.id} index={i} baseDelay={80}>
              <TouchableOpacity
                style={[styles.row, !n.read && { backgroundColor: c.primaryLight + '44' }]}
                onPress={() => markRead(n.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: n.color + '18' }]}>
                  <Ionicons name={n.icon as any} size={18} color={n.color} />
                </View>
                <View style={styles.body}>
                  <View style={styles.bodyTop}>
                    <Text style={[styles.notifTitle, { color: c.text }]}>{n.title}</Text>
                    {!n.read && <View style={[styles.dot, { backgroundColor: c.primary }]} />}
                  </View>
                  <Text style={[styles.notifBody, { color: c.textSecondary }]}>{n.body}</Text>
                  <Text style={[styles.notifTime, { color: c.textTertiary }]}>{n.time}</Text>
                </View>
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={[styles.divider, { backgroundColor: c.borderLight }]} />}
            </AnimatedListItem>
          ))}
        </View>

        <FadeSlideView delay={280} duration={340}>
          <Text style={[styles.groupLabel, { color: c.textTertiary }]}>Earlier</Text>
        </FadeSlideView>

        <View style={[styles.group, { backgroundColor: c.surface, borderColor: c.border }]}>
          {earlierNotifs.map((n, i, arr) => (
            <AnimatedListItem key={n.id} index={i} baseDelay={300}>
              <TouchableOpacity style={styles.row} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: n.color + '18' }]}>
                  <Ionicons name={n.icon as any} size={18} color={n.color} />
                </View>
                <View style={styles.body}>
                  <Text style={[styles.notifTitle, { color: c.textSecondary }]}>{n.title}</Text>
                  <Text style={[styles.notifBody, { color: c.textTertiary }]}>{n.body}</Text>
                  <Text style={[styles.notifTime, { color: c.textTertiary }]}>{n.time}</Text>
                </View>
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
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  headerRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, marginTop: 3 },
  markBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, marginTop: 4 },
  markText: { fontSize: 12.5, fontWeight: '600' },
  groupLabel: {
    fontSize: 11, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: 10, marginLeft: 4,
  },
  group: { borderRadius: 18, overflow: 'hidden', borderWidth: 1, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, gap: 12 },
  iconBox: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  body: { flex: 1 },
  bodyTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  notifTitle: { fontSize: 13.5, fontWeight: '600' },
  notifBody: { fontSize: 12.5, lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 11 },
  divider: { height: 1, marginLeft: 64 },
});
