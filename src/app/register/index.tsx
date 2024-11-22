import React, { useState } from "react";
import { View } from "react-native";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import { FormInput } from "../../components/formInput";
import { BorderButton } from "../../components/borderButton";
import { styles } from "../index/styles";
import { passwordsMatch, validateEmail, validateFields, validatePasswordStrength } from "@/src/utils/validators";
import { userService } from "@/src/services/api/user";

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function handleCadastrar() {
    const passwordValidation = validatePasswordStrength(senha);
    
    if (validateFields({email, nome, apelido, senha, confirmarSenha}) && validateEmail(email) && 
        passwordValidation.isValid && passwordsMatch(senha, confirmarSenha)) {
      userService.register(email, nome, apelido, senha);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <YourselfTitle width={200} height={100} />
      <FormInput label="Email" placeholder="seu@email.com" value={email} onChangeText={setEmail}/>
      <FormInput label="Nome" placeholder="Nome completo" value={nome} onChangeText={setNome}/>
      <FormInput label="Nome de usuário" placeholder="Nome de usuário" value={apelido} onChangeText={setApelido}/>
      <FormInput label="Senha" placeholder="Senha" value={senha} onChangeText={setSenha} isPassword={true}/>
      <FormInput label="Confirme a senha" placeholder="Confirme a senha" value={confirmarSenha} onChangeText={setConfirmarSenha} isPassword={true}/>
      <BorderButton title='Cadastrar' color={2} action={handleCadastrar}/>

    </View>
    
  );
}


