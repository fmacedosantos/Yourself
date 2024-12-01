import { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { MessageAlert } from '@/src/components/messageAlert';
import { atualizarUsuario, carregarResumoEstatisticas, carregarUsuario } from '@/src/services/api/user';
import { passwordsMatch, validatePasswordStrength } from '@/src/utils/validators';
import { BackButton } from '@/src/components/backButton/indes';

export default function Settings() {
    const [resumoEstatisticas, setResumoEstatisticas] = useState({ ofensiva: 0, pontos: 0 });
    const [loading, setLoading] = useState(true);
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [informacoes, setInformacoes] = useState({ nome: '', apelido: '' });
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await carregarResumoEstatisticas(setResumoEstatisticas);
                await carregarUsuario(setInformacoes);
            } catch {
                setMessage('Erro ao carregar informações.');
                setVisible(true);
            } finally {
                setLoading(false);
            }
        };
        carregarDados();
    }, []);

    const validarDados = () => {
        if (senha || confirmarSenha) {
            const passwordMatch = passwordsMatch(senha, confirmarSenha);
            if (!passwordMatch.success) return passwordMatch.message;

            const passwordStrength = validatePasswordStrength(senha);
            if (!passwordStrength.success) return passwordStrength.message;
        }

        if (!nome.trim() && !apelido.trim() && !senha.trim()) {
            return 'Preencha, pelo menos, um campo!';
        }

        return null;
    };

    const handleUpdate = async () => {
        const mensagemErro = validarDados();
        if (mensagemErro) {
            setMessage(mensagemErro);
            setVisible(true);
            return;
        }

        const userData = { nome: nome || undefined, apelido: apelido || undefined, novaSenha: senha || undefined };

        try {
            const { success, message } = await atualizarUsuario(userData);
            if (success) {
                setSenha('');
                setConfirmarSenha('');
                setNome('');
                setApelido('');
                setMessage('Dados atualizados com sucesso!');
                carregarUsuario(setInformacoes);
            } else {
                setMessage(message);
            }
        } catch {
            setMessage('Erro ao atualizar informações.');
        } finally {
            setVisible(true);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <BackButton/>
            <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
            <FormInput value={nome} onChangeText={setNome} placeholder={informacoes.nome} label="Nome" />
            <FormInput value={apelido} onChangeText={setApelido} placeholder={informacoes.apelido} label="Apelido" />
            <MessageAlert type={1} message={message} visible={visible} onCancel={() => setVisible(false)} />
            <FormInput value={senha} onChangeText={setSenha} label="Nova senha" isPassword />
            <FormInput value={confirmarSenha} onChangeText={setConfirmarSenha} label="Confirmar senha" isPassword />
            <SolidButton title="Atualizar" action={handleUpdate} />
        </View>
    );
}