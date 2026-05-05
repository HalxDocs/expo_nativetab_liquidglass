import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { FadeSlideView } from '../components/FadeSlideView';
import { AnimatedListItem } from '../components/AnimatedListItem';
import { PressScale } from '../components/PressScale';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { label: 'All', icon: 'grid-outline' },
  { label: 'Design', icon: 'color-palette-outline' },
  { label: 'Dev', icon: 'code-slash-outline' },
  { label: 'Business', icon: 'briefcase-outline' },
  { label: 'Art', icon: 'brush-outline' },
];

const FEATURED = [
  { title: 'Mobile UI Kit', subtitle: '120+ components', icon: 'phone-portrait-outline', grad: ['#6366f1', '#8b5cf6'] },
  { title: 'Dashboard Pro', subtitle: 'Admin templates', icon: 'analytics-outline', grad: ['#0ea5e9', '#6366f1'] },
  { title: 'Brand Kit', subtitle: 'Logos & assets', icon: 'star-outline', grad: ['#f59e0b', '#f43f5e'] },
];

const CARDS = [
  { title: 'React Native Starter', tag: 'Template', icon: 'logo-react', color: '#6366f1', likes: 284, views: '1.2k' },
  { title: 'Expo Navigation', tag: 'Component', icon: 'navigate-outline', color: '#8b5cf6', likes: 97, views: '640' },
  { title: 'Dark UI System', tag: 'Design', icon: 'moon-outline', color: '#0ea5e9', likes: 431, views: '3.1k' },
  { title: 'Auth Flow Kit', tag: 'Template', icon: 'shield-checkmark-outline', color: '#10b981', likes: 156, views: '890' },
  { title: 'Card Components', tag: 'UI Kit', icon: 'layers-outline', color: '#f59e0b', likes: 208, views: '1.4k' },
  { title: 'Onboarding Flow', tag: 'Template', icon: 'arrow-forward-circle-outline', color: '#f43f5e', likes: 312, views: '2.2k' },
];

export default function ExploreScreen() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.background} />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <FadeSlideView delay={0} duration={380}>
          <Text style={[styles.title, { color: c.text }]}>Explore</Text>
          <Text style={[styles.subtitle, { color: c.textSecondary }]}>Discover templates & resources</Text>
        </FadeSlideView>

        <FadeSlideView delay={60} duration={360}>
          <View style={[styles.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Ionicons name="search-outline" size={18} color={c.textTertiary} />
            <TextInput
              style={[styles.searchInput, { color: c.text }]}
              placeholder="Search resources..."
              placeholderTextColor={c.textTertiary}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={c.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </FadeSlideView>

        <FadeSlideView delay={100} duration={360}>
          <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow} contentContainerStyle={styles.tabsContent}>
            {CATEGORIES.map((cat, i) => (
              <PressScale key={i} scaleTo={0.93} onPress={() => setActiveTab(i)}>
                <View style={[
                  styles.tab,
                  { backgroundColor: i === activeTab ? c.primary : c.surface, borderColor: c.border },
                ]}>
                  <Ionicons name={cat.icon as any} size={14} color={i === activeTab ? '#fff' : c.textSecondary} />
                  <Text style={[styles.tabText, { color: i === activeTab ? '#fff' : c.textSecondary }]}>{cat.label}</Text>
                </View>
              </PressScale>
            ))}
          </Animated.ScrollView>
        </FadeSlideView>

        <FadeSlideView delay={160} duration={380}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Featured</Text>
          <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredRow} contentContainerStyle={{ gap: 14 }}>
            {FEATURED.map((f, i) => (
              <PressScale key={i} scaleTo={0.96}>
                <LinearGradient
                  colors={f.grad as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featuredCard}
                >
                  <Ionicons name={f.icon as any} size={28} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.featuredTitle}>{f.title}</Text>
                  <Text style={styles.featuredSub}>{f.subtitle}</Text>
                </LinearGradient>
              </PressScale>
            ))}
          </Animated.ScrollView>
        </FadeSlideView>

        <FadeSlideView delay={220} duration={360}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Popular</Text>
        </FadeSlideView>

        <View style={styles.grid}>
          {CARDS.map((card, i) => (
            <AnimatedListItem key={i} index={i} baseDelay={240}>
              <PressScale scaleTo={0.96} style={[styles.gridCard, { backgroundColor: c.surface, borderColor: c.border }]}>
                <View style={[styles.gridIcon, { backgroundColor: card.color + '18' }]}>
                  <Ionicons name={card.icon as any} size={22} color={card.color} />
                </View>
                <Text style={[styles.gridTitle, { color: c.text }]} numberOfLines={2}>{card.title}</Text>
                <View style={[styles.gridTag, { backgroundColor: card.color + '18' }]}>
                  <Text style={[styles.gridTagText, { color: card.color }]}>{card.tag}</Text>
                </View>
                <View style={styles.gridFooter}>
                  <Ionicons name="heart-outline" size={12} color={c.textTertiary} />
                  <Text style={[styles.gridMeta, { color: c.textTertiary }]}>{card.likes}</Text>
                  <Ionicons name="eye-outline" size={12} color={c.textTertiary} style={{ marginLeft: 8 }} />
                  <Text style={[styles.gridMeta, { color: c.textTertiary }]}>{card.views}</Text>
                </View>
              </PressScale>
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
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 4, marginBottom: 20 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12,
    borderRadius: 14, borderWidth: 1, gap: 10, marginBottom: 18,
  },
  searchInput: { flex: 1, fontSize: 14, padding: 0 },
  tabsRow: { marginBottom: 24 },
  tabsContent: { gap: 8, paddingRight: 4 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  tabText: { fontSize: 13, fontWeight: '500' },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: 14,
  },
  featuredRow: { marginBottom: 28 },
  featuredCard: { width: 160, borderRadius: 18, padding: 18, gap: 8 },
  featuredTitle: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 4 },
  featuredSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridCard: {
    width: (width - 52) / 2, borderRadius: 16, padding: 14, borderWidth: 1, gap: 8,
  },
  gridIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  gridTitle: { fontSize: 13.5, fontWeight: '500', lineHeight: 18 },
  gridTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  gridTagText: { fontSize: 11, fontWeight: '500' },
  gridFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  gridMeta: { fontSize: 11, marginLeft: 4 },
});
