import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen() {
  const [user, setUser] = useState<any>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelType, setPanelType] = useState<'profile' | 'notifications' | null>(null);
  const [lockEnabled, setLockEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('system');

  const slideAnim = useState(new Animated.Value(width))[0];

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('currentUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  };

  const openPanel = (type: 'profile' | 'notifications') => {
    setPanelType(type);
    setPanelVisible(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setPanelVisible(false);
      setPanelType(null);
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    closePanel();
  };

  const firstLetter = user?.name?.charAt(0).toUpperCase() || '';

  return (
    <SafeAreaView style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.welcome}>
            Welcome, {user?.name?.split(' ')[0] || 'Admin'}
          </Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => openPanel('notifications')}>
            <Ionicons name="notifications-outline" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileCircle}
            onPress={() => openPanel('profile')}
          >
            <Text style={styles.profileLetter}>{firstLetter}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text>Admin Dashboard Content</Text>
      </View>

      {/* SIDE PANEL */}
      <Modal visible={panelVisible} transparent animationType="none">
        <View style={styles.overlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closePanel} />

          <Animated.View
            style={[
              styles.sidePanel,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <SafeAreaView style={{ flex: 1 }}>
              {panelType === 'profile' && (
                <ScrollView>
                  {/* HEADER */}
                  <View style={styles.panelHeader}>
                    <TouchableOpacity onPress={closePanel}>
                      <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.panelTitle}>My Profile</Text>
                  </View>

                  {/* PROFILE CARD */}
                  <TouchableOpacity style={styles.profileCard}>
                    <View style={styles.bigAvatar}>
                      <Text style={styles.bigAvatarText}>{firstLetter}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.profileName}>{user?.name}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={22} />
                  </TouchableOpacity>

                  {/* ACCOUNT SETTINGS */}
                  <Text style={styles.sectionTitle}>Account</Text>
                  <TouchableOpacity style={styles.rowItem}>
                    <Text>Notification Preferences</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>

                  {/* SECURITY */}
                  <Text style={styles.sectionTitle}>Security</Text>

                  <TouchableOpacity style={styles.rowItem}>
                    <Text>Change Password</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>

                  <View style={styles.rowItem}>
                    <Text>Lock Screen (PIN)</Text>
                    <Switch value={lockEnabled} onValueChange={setLockEnabled} />
                  </View>

                  <View style={styles.rowItem}>
                    <Text>Biometrics</Text>
                    <Switch value={biometricEnabled} onValueChange={setBiometricEnabled} />
                  </View>

                  {/* GROUPS */}
                  <Text style={styles.sectionTitle}>Groups</Text>
                  <TouchableOpacity style={styles.rowItem}>
                    <Text>Manage Roles & Rules</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rowItem}>
                    <Text>Create Group</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>

                  {/* APPEARANCE */}
                  <Text style={styles.sectionTitle}>Appearance</Text>
                  {['light', 'dark', 'system'].map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      style={styles.rowItem}
                      onPress={() => setAppearance(mode as any)}
                    >
                      <Text style={{ textTransform: 'capitalize' }}>{mode}</Text>
                      {appearance === mode && (
                        <Ionicons name="checkmark" size={20} color="#004527" />
                      )}
                    </TouchableOpacity>
                  ))}

                  {/* MORE */}
                  <Text style={styles.sectionTitle}>More</Text>
                  <TouchableOpacity style={styles.rowItem}>
                    <Text>Support</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rowItem}>
                    <Text>About</Text>
                    <Ionicons name="chevron-forward" size={20} />
                  </TouchableOpacity>

                  {/* LOGOUT */}
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                  >
                    <Text style={styles.logoutText}>Log Out</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}

              {panelType === 'notifications' && (
                <View style={{ flex: 1 }}>
                  {/* HEADER */}
                  <View style={styles.panelHeader}>
                    <TouchableOpacity onPress={closePanel}>
                      <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.panelTitle}>Notifications</Text>
                  </View>

                  {/* NO NOTIFICATIONS */}
                  <View style={styles.noNotifications}>
                    <Text style={{ color: '#888', fontSize: 16 }}>
                      No notifications
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: '700' },
  welcome: { fontSize: 14, color: '#666' },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#004527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLetter: { color: '#fff', fontWeight: '700' },

  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sidePanel: {
    width: width,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },

  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
  },
  panelTitle: { fontSize: 18, fontWeight: '600' },

  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  bigAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#004527',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bigAvatarText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  profileName: { fontSize: 16, fontWeight: '600' },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    color: '#888',
  },

  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  logoutButton: {
    margin: 20,
    backgroundColor: '#004527',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: '600' },

  noNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
