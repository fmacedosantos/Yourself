import React, { useState } from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/src/constants/Colors';
import { FormInput } from '../formInput';
import { validateEmail } from '@/src/utils/validators';

type EmailInputAlertProps = {
  visible: boolean;
  onSend: (email: string) => void;
  onCancel: () => void;
  title?: string;
};

export function EmailInputAlert({
  visible,
  onSend,
  onCancel,
  title = 'Digite seu email:'
}: EmailInputAlertProps) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSend = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage('O campo email é obrigatório.');
      return;
    }

    const emailValidation = validateEmail(trimmedEmail);
    if (!emailValidation.success) {
      setErrorMessage(emailValidation.message);
      return;
    }

    setErrorMessage('');
    onSend(trimmedEmail);
    setEmail('');
  };

  const handleCancel = () => {
    setEmail('');
    setErrorMessage('');
    onCancel();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.inputAlertContainer}>
            <FormInput
              label=""
              placeholder="exemplo@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage(''); 
              }}
              type="email"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.dualButton, { backgroundColor: COLORS.DARK_ORANGE }]}
              onPress={handleSend}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>
            <Pressable
              style={[styles.dualButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
