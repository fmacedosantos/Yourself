import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { MessageAlert } from '@/src/components/messageAlert';
import { atualizarUsuario, carregarResumoEstatisticas, carregarUsuario, logout } from '@/src/services/api/user';
import { passwordsMatch, validatePasswordStrength } from '@/src/utils/validators';
import { BackButton } from '@/src/components/backButton';
import { Title } from '@/src/components/title';
import { router } from 'expo-router';

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
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false); 

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const {success, message} = await carregarResumoEstatisticas(setResumoEstatisticas);
                if (!success) {
                setMessage(message);
                setVisible(true);
                return;
                }
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
                setVisible(true);
                carregarUsuario(setInformacoes);

                if (senha) {
                    setTimeout(() => {
                        setVisible(false);
                        setLogoutAlertVisible(true);
                    }, 2000); 
                }
            } else {
                setMessage(message);
                setVisible(true);
            }
        } catch {
            setMessage('Erro ao atualizar informações.');
            setVisible(true);
        }
    };

    async function handleLogout () {
        setLogoutAlertVisible(false);
        await logout();
    };

    function handleGoToEditTimer() {
        router.navigate('/(tabs)/editTimer');
    }

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <BackButton />
                <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
                <Title title="Configurações" containerStyle={{ position: 'absolute', top: 0 }} />
                <View style={styles.containerInputs}>
                    <FormInput value={nome} onChangeText={setNome} placeholder={informacoes.nome} label="Nome"/>
                    <FormInput value={apelido} onChangeText={setApelido} placeholder={informacoes.apelido} label="Apelido" />
                    <FormInput value={senha} onChangeText={setSenha} label="Nova senha" isPassword />
                    <FormInput value={confirmarSenha} onChangeText={setConfirmarSenha} label="Confirmar senha" isPassword />
                    <SolidButton title="Atualizar" action={handleUpdate} />
                </View>
                <Text onPress={handleGoToEditTimer} style={styles.editPomodoro}>Editar temporizador pomodoro</Text>
                <MessageAlert
                    type={1}
                    message={message}
                    visible={visible}
                    onCancel={() => setVisible(false)}
                />
                <MessageAlert
                    type={1}
                    message="Você precisará se logar novamente."
                    visible={logoutAlertVisible}
                    onCancel={handleLogout}
                />
            </ScrollView>
        </View>
    );
}
