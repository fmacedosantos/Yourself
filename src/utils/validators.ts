import { Alert, Platform } from "react-native";

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (Platform.OS === 'web') {
      window.alert('O formato do email está incorreto.');
    } else {
      Alert.alert("Erro", "O formato do email está incorreto.");
    }
    return false;
  }
  return true;
}

export function validateFields(fields: { [key: string]: string | number | null }): boolean {
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (fieldValue === "" || fieldValue === null || fieldValue === undefined) {
      if (Platform.OS === 'web') {
        window.alert(`Por favor, preencha o campo ${fieldName}.`);
      } else {
        Alert.alert("Erro", `Por favor, preencha o campo ${fieldName}.`);
      }
      return false;
    }
  }
  return true;
}

export function passwordsMatch(senha: string, confirmarSenha: string): boolean{
  if (senha !== confirmarSenha) {
    if (Platform.OS === 'web') {
      window.alert('As senhas não conferem!');
    }  else {
      Alert.alert('Erro', 'As senhas não conferem!');
    }
    return false;
  }
  return true;
}

interface PasswordRequirement {
  regex: RegExp;
  message: string;
}

interface PasswordValidationResult {
  isValid: boolean;
  missingRequirements: string[];
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    regex: /.{8,}/,
    message: "pelo menos 8 caracteres"
  },
  {
    regex: /[A-Z]/,
    message: "pelo menos uma letra maiúscula"
  },
  {
    regex: /[a-z]/,
    message: "pelo menos uma letra minúscula"
  },
  {
    regex: /[0-9]/,
    message: "pelo menos um número"
  },
  {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    message: "pelo menos um caractere especial (!@#$%^&*(),.?\":{}|<>)"
  }
];

export function validatePasswordStrength(password: string): PasswordValidationResult {
  const missingRequirements: string[] = [];

  for (const requirement of PASSWORD_REQUIREMENTS) {
    if (!requirement.regex.test(password)) {
      missingRequirements.push(requirement.message);
    }
  }

  if (missingRequirements.length > 0) {
    if (Platform.OS === 'web') {
      window.alert("Sua senha deve conter:\n\n" + missingRequirements.map(req => "• " + req).join("\n"));
    } else {
      Alert.alert(
        "Senha fraca",
        "Sua senha deve conter:\n\n" + missingRequirements.map(req => "• " + req).join("\n")
      );
    }
  }

  return {
    isValid: missingRequirements.length === 0,
    missingRequirements
  };
}