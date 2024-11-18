import { Alert, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { passwordsMatch } from '@/src/utils/validators';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Informacoes {
    nome: string
    apelido: string
  }

export default function Settings() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [informacoes, setInformacoes] = useState<Informacoes>({
    nome: '',
    apelido: ''
  });

  useEffect(() => {
    async function carregarDados() {
      userService.carregarResumoEstatisticas(setResumoEstatisticas);
      userService.carregarUsuario(setInformacoes);
      setLoading(false)
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }

  function handleUpdate() {
    if (senha != null || confirmarSenha != null) {
      if (passwordsMatch(senha, confirmarSenha)) {
        userService.atualizarUsuario(nome, apelido, senha);
      }
    } else {
      userService.atualizarUsuario(nome, apelido, senha);
    }
    // por enquanto muda tudo
  }

 return (
  <View
  style={styles.container}
  >
    <SummaryStats 
      ofensiva={resumoEstatisticas.ofensiva} 
      pontos={resumoEstatisticas.pontos}
    />

    <FormInput value={nome} onChangeText={setNome} placeholder={informacoes.nome} label='Nome'/>
    <FormInput value={apelido} onChangeText={setApelido} placeholder={informacoes.apelido} label='Apelido'/>
    <FormInput value={senha} onChangeText={setSenha} label='Nova senha' isPassword={true}/>
    <FormInput value={confirmarSenha} onChangeText={setConfirmarSenha} label='Confirmar senha' isPassword={true}/>
    <SolidButton title='Atualizar' action={handleUpdate}/>
</View>
  );
}
