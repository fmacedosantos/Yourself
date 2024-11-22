import { Alert, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { passwordsMatch } from '@/src/utils/validators';
import { MessageAlert } from '@/src/components/messageAlert';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Informacoes {
  nome: string;
  apelido: string;
}

export default function Settings() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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
      await Promise.all([
        userService.carregarResumoEstatisticas(setResumoEstatisticas),
        userService.carregarUsuario(setInformacoes)
      ]);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  let message;

  async function handleUpdate() {
    if (senha || confirmarSenha) {
      if (!passwordsMatch(senha, confirmarSenha)) {
        message = "As senhas não coincidem!";
        setVisible(true);
        return;
      }
    }

    const userData = {
      nome: nome || undefined,
      apelido: apelido || undefined,
      novaSenha: senha || undefined
    };

    const success = await userService.atualizarUsuario(userData);
    if (success) {
      setSenha('');
      setConfirmarSenha('');
      setNome('');
      setApelido('');
      
      message = "Dados atualizados com sucesso!"
      setVisible(true);
      
      userService.carregarUsuario(setInformacoes);
    }
  }

  return (
    <View style={styles.container}>
      <SummaryStats
        ofensiva={resumoEstatisticas.ofensiva}
        pontos={resumoEstatisticas.pontos}
      />

      <FormInput
        value={nome}
        onChangeText={setNome}
        placeholder={informacoes.nome}
        label='Nome'
      />
      <FormInput
        value={apelido}
        onChangeText={setApelido}
        placeholder={informacoes.apelido}
        label='Apelido'
      />
      <MessageAlert
        type={1}
        title="Aviso:"
        message="Dados atualizados com sucesso!"
        visible={visible}
        onCancel={() => setVisible(false)}
      />
      <FormInput
        value={senha}
        onChangeText={setSenha}
        label='Nova senha'
        isPassword={true}
      />
      <FormInput
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        label='Confirmar senha'
        isPassword={true}
      />
      <SolidButton title='Atualizar' action={handleUpdate} />
    </View>
  );
}