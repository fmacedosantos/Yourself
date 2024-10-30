import { Alert } from "react-native";

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Erro", "O formato do email está incorreto.");
    return false;
  }
  return true;
}

export function validateFields(fields: { [key: string]: string }): boolean {
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (!fieldValue) {
      Alert.alert("Erro", `Por favor, preencha o campo ${fieldName}.`);
      return false;
    }
  }
  return true;
}

export function passwordsMatch(senha: string, confirmarSenha: string): boolean{
  if (senha !== confirmarSenha) {
    Alert.alert('Erro', 'As senhas não conferem!');
    return false;
  }
  return true;
}