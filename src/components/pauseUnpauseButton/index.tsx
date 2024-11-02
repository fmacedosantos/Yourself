import { Pressable, StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';
import PlayIcon from '../../assets/images/play-icon.svg';
import PauseIcon from '../../assets/images/pause-icon.svg';

interface ButtonProps {
    isPaused: boolean;
    action: () => void;
    style?: StyleProp<TextStyle>;
}

export function PauseUnpauseButton({ isPaused, action, style }: ButtonProps) {
    return (
        <Pressable onPress={action} style={[styles.pauseUnpauseButton, style]}>
             {isPaused ? <PlayIcon width={30} height={30} /> : <PauseIcon width={30} height={30} />}
        </Pressable>
    );
}