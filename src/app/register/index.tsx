import React, { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, View, Alert } from "react-native";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import { COLORS } from "../../constants/Colors";
import { FormInput } from "../../components/formInput";
import { RegisterButton } from "../../components/registerButton";
import { styles } from "../index/styles";
import { Paths, ROUTES } from "@/src/constants/Routes";

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function handleCadastrar() {
    // verificando se todos os campos foram preenchidos
    if (!email || !nome || !apelido || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // validando formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "O formato do email está incorreto.");
      return;
    }

    // verificando as senhas
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem!');
      return;
    }

    try {
      const response = await fetch(ROUTES(Paths.REGISTER_USER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nome,
          apelido,
          senha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.replace('/(tabs)/screens/index'); 
      } else {
        Alert.alert('Erro', data.message || 'Ocorreu um erro no cadastro.');
      }

    } catch (error) {
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
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
      <RegisterButton title='Cadastrar' action={handleCadastrar}/>

    </View>
    
  );
}


