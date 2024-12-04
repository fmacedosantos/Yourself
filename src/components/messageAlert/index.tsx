import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/src/constants/Colors';

type MessageAlertProps = {
  type: 1 | 2;
  message: string;
  visible: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  okText?: string;
  title?: string
};

export function MessageAlert({
  type,
  message,
  visible,
  onConfirm,
  onCancel,
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  okText = 'OK',
  title = 'Comunicado:'
}: MessageAlertProps) {
  const confirmButtonStyle =
    confirmText === 'Excluir' ? styles.dualButton : [styles.dualButton, { backgroundColor: COLORS.DARK_ORANGE }];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title }</Text>
          <Text style={styles.message}>{message}</Text>

          <View
            style={[
              styles.buttonContainer,
              type === 1 && styles.singleButtonContainer,
            ]}
          >
            {type === 1 ? (
              <Pressable style={styles.singleButton} onPress={onCancel}>
                <Text style={styles.buttonText}>{okText}</Text>
              </Pressable>
            ) : (
              <>
                <Pressable style={confirmButtonStyle} onPress={onConfirm}>
                  <Text style={styles.buttonText}>{confirmText}</Text>
                </Pressable>
                <Pressable style={[styles.dualButton, styles.cancelButton]} onPress={onCancel}>
                  <Text style={styles.buttonText}>{cancelText}</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
