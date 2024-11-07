import { Text, View } from 'react-native';
import { styles } from './styles';
import FireIcon from '../../assets/images/fire-icon.svg';
import XpIcon from '../../assets/images/xp-icon.svg';

interface BestStatsProps{
    melhorOfensiva: number;
    totalXp: number;
}

export function BestStats({melhorOfensiva, totalXp}: BestStatsProps) {
 return (
   <View style={styles.container}>
    <Text style={styles.text}>Estatísticas</Text>

    <View style={styles.statsContainer}>
      <View style={styles.ofensiveContainer}>
        <View style={styles.statContainer}>
          <FireIcon width={28} height={28} style={styles.icon}/>  
          <Text style={styles.textStat}>{melhorOfensiva} dias</Text>
        </View>
        <Text style={styles.subtitleStat}>melhor</Text>
      </View>

      <View style={styles.xpContainer}>
        <View style={styles.statContainer}>
          <XpIcon width={28} height={28} style={styles.icon}/>  
          <Text style={styles.textStat}>{totalXp} XP</Text>
        </View>
        <Text style={styles.subtitleStat}>total</Text>
      </View>
    </View>
   </View>
  );
}
