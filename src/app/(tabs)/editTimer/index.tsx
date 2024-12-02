import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { MessageAlert } from '@/src/components/messageAlert';
import { carregarResumoEstatisticas } from '@/src/services/api/user';
import { BackButton } from '@/src/components/backButton/indes';
import { Title } from '@/src/components/title';

export default function EditTimer() {
    const [resumoEstatisticas, setResumoEstatisticas] = useState({ ofensiva: 0, pontos: 0 });
    const [loading, setLoading] = useState(true);
    const [concentração, setConcentracao] = useState('');
    const [descanso, setDescanso] = useState('');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await carregarResumoEstatisticas(setResumoEstatisticas);
            } catch {
                setMessage('Erro ao carregar informações.');
                setVisible(true);
            } finally {
                setLoading(false);
            }
        };
        carregarDados();
    }, []);

    function handleSave(){

    }

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <BackButton />
            <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
            <Title title="Editar temporizador" containerStyle={{ position: 'absolute', top: 0 }} />
            <FormInput label='Tempo de concentração' value={concentração} onChangeText={setConcentracao}/>
            <FormInput label='Tempo de descanso' value={descanso} onChangeText={setDescanso}/>
            <SolidButton title='Salvar' action={handleSave}/>
        </View>
    );
}
