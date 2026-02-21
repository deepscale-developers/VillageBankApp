import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

type Props = { visible: boolean; title?: string; message?: string; onConfirm?: () => void; onCancel?: () => void };

export default function ConfirmationModal({ visible, title = 'Confirm', message, onConfirm, onCancel }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.confirm]} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  card: { width: '85%', backgroundColor: theme.colors.card, padding: 20, borderRadius: 14 },
  title: { fontWeight: '800', fontSize: 18, color: theme.colors.text },
  message: { color: theme.colors.muted, marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, marginLeft: 8 },
  cancel: { backgroundColor: '#eee' },
  confirm: { backgroundColor: theme.colors.primary },
  cancelText: { color: theme.colors.text, fontWeight: '700' },
  confirmText: { color: theme.colors.card, fontWeight: '700' },
});
