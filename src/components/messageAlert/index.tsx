import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/src/constants/Colors';
import { logout } from '@/src/services/api/user';

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
  const isUnauthenticatedMessage = message === 'Usuário não autenticado!';
  
  const finalType = isUnauthenticatedMessage ? 2 : type;
  const finalConfirmText = isUnauthenticatedMessage ? 'Sair' : confirmText;
  const finalMessage = isUnauthenticatedMessage 
    ? 'Sessão inexistente ou expirada! Faça login novamente.' 
    : message;
  const finalOnConfirm = isUnauthenticatedMessage 
    ? async () => {
        await logout();
      } 
    : onConfirm;

  const confirmButtonStyle =
    finalConfirmText === 'Excluir' ? styles.dualButton : [styles.dualButton, { backgroundColor: COLORS.DARK_ORANGE }];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{finalMessage}</Text>

          <View
            style={[
              styles.buttonContainer,
              finalType === 1 && styles.singleButtonContainer,
            ]}
          >
            {finalType === 1 ? (
              <Pressable style={styles.singleButton} onPress={onCancel}>
                <Text style={styles.buttonText}>{okText}</Text>
              </Pressable>
            ) : (
              <>
                <Pressable style={confirmButtonStyle} onPress={finalOnConfirm}>
                  <Text style={styles.buttonText}>{finalConfirmText}</Text>
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