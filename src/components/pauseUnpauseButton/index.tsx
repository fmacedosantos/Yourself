import { Pressable } from 'react-native';
import { styles } from './styles';
import PlayIcon from '../../assets/images/play-icon.svg';
import PauseIcon from '../../assets/images/pause-icon.svg';
import { COLORS } from '@/src/constants/Colors';

interface ButtonProps {
    isPaused: boolean;
    action: () => void;
}

export function PauseUnpauseButton({ isPaused, action }: ButtonProps) {
    return (
        <Pressable onPress={action} style={[styles.pauseUnpauseButton, {}]}>
             {isPaused ? <PlayIcon width={30} height={30} /> : <PauseIcon width={30} height={30} />}
        </Pressable>
    );
}