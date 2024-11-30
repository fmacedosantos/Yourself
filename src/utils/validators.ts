import { Alert, Platform } from "react-native";

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {success: false, message: 'O formato do email está incorreto.'};
  }
  return {success: true, message: 'O formato do email está correto.'};
}

export function validateFields(fields: { [key: string]: string | number | null }) {
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (fieldValue === "" || fieldValue === null || fieldValue === undefined) {
      return {success: false, message: `Por favor, preencha o campo ${fieldName}.`};
    }
  }
  return {success: true, message: `Todos os campos estão preenchidos.`};;
}

export function passwordsMatch(senha: string, confirmarSenha: string){
  if (senha !== confirmarSenha) {
    return {success: false, message: `As senhas não conferem!`};
  }
  return {success: true, message: 'As senhas conferem!'};
}

interface PasswordRequirement {
  regex: RegExp;
  message: string;
}

interface PasswordValidationResult {
  success: boolean;
  message: string;
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

  return {
    success: missingRequirements.length === 0,
    message: "Sua senha deve conter:\n\n" + missingRequirements.map(req => "• " + req).join("\n")
  };
}