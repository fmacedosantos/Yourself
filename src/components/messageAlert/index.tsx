import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type MessageAlertProps = {
  type: 1 | 2; 
  message: string;
  visible: boolean;
  onConfirm?: () => void; 
  onCancel?: () => void; 
};

export function MessageAlert({
  type,
  message,
  visible,
  onConfirm,
  onCancel,
}: MessageAlertProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>Comunicado:</Text>
          <Text style={styles.message}>{message}</Text>

          <View
            style={[
              styles.buttonContainer,
              type === 1 && styles.singleButtonContainer, 
            ]}
          >
            {type === 1 ? (
              <TouchableOpacity style={styles.singleButton} onPress={onCancel}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.dualButton} onPress={onConfirm}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.dualButton, styles.cancelButton]} onPress={onCancel}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
