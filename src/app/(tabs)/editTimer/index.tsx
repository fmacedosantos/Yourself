import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { MessageAlert } from '@/src/components/messageAlert';
import { carregarPreferencias, carregarResumoEstatisticas, updatePreferences } from '@/src/services/api/user';
import { BackButton } from '@/src/components/backButton';
import { Title } from '@/src/components/title';
import { useFocusEffect } from 'expo-router';
import { LoadFont } from '@/src/utils/loadFont';

export default function EditTimer() {
    const [resumoEstatisticas, setResumoEstatisticas] = useState({ ofensiva: 0, pontos: 0 });
    const [loading, setLoading] = useState(true);
    const [preferencias, setPreferencias] = useState({ preferenciaConcentracao: 0, preferenciaDescanso: 0 });
    const [concentração, setConcentracao] = useState('');
    const [descanso, setDescanso] = useState('');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const carregarDados = useCallback(async () => {
            try {
                setLoading(true);
                const {success, message} = await carregarResumoEstatisticas(setResumoEstatisticas);
                if (!success) {
                setMessage(message);
                setVisible(true);
                return;
                }
                await carregarPreferencias(setPreferencias)
            } catch {
                setMessage('Erro ao carregar informações.');
                setVisible(true);
            } finally {
                setLoading(false);
            }
        
    }, []);

    useFocusEffect(
        useCallback(() => {
          carregarDados();
        }, [carregarDados])
      );

    const validarDados = () => {
        if (!concentração.trim() && !descanso.trim()) {
            return 'Preencha, pelo menos, um campo!';
        }
    
        if (concentração) {
            if (concentração.trim() && isNaN(Number(concentração)) || Number(concentração) == 0) {
                return 'Tempo de concentração deve ser um número válido.';
            }
        }
    
        if (descanso) {
            if (descanso.trim() && isNaN(Number(descanso)) || Number(descanso) == 0) {
                return 'Tempo de descanso deve ser um número válido.';
            }
        }
    
        return null;
    };
    
    async function handleUpdate(){
        const mensagemErro = validarDados();
        if (mensagemErro) {
            setMessage(mensagemErro);
            setVisible(true);
            return;
        }
    
        const preferences = { 
            preferenciaConcentracao: concentração ? Number(concentração) : undefined, 
            preferenciaDescanso: descanso ? Number(descanso) : undefined 
        };
    
        try {
            setLoading(true);
            const { success, message } = await updatePreferences(preferences);
            if (success) {
                setLoading(false);
                setConcentracao('');
                setDescanso('');
                setMessage(message);
                setVisible(true);
                await carregarPreferencias(setPreferencias);
    
            } else {
                setLoading(false);
                setMessage(message);
                setVisible(true);
            }
        } catch {
            setLoading(false);
            setMessage('Erro ao atualizar as preferências.');
            setVisible(true);
        }
    }

    const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

    return (
        <View style={styles.container}>
            <BackButton />
            <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
            <Title title="Editar temporizador" containerStyle={{ position: 'absolute', top: 0 }} />
            <FormInput label='Tempo de concentração' placeholder={`${String(preferencias.preferenciaConcentracao)} minutos.`} value={concentração} onChangeText={setConcentracao} type='numeric'/>
            <FormInput label='Tempo de descanso' placeholder={`${String(preferencias.preferenciaDescanso)} minutos.`} value={descanso} onChangeText={setDescanso} type='numeric'/>
            <SolidButton title='Salvar' action={handleUpdate}/>
            <MessageAlert
                type={1}
                message={message}
                visible={visible}
                onCancel={() => setVisible(false)}
            />
        </View>
    );
}
