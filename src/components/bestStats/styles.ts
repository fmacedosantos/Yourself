import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',  
        marginTop: 20,  
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 22,  
        marginBottom: 12,
        color: COLORS.WHITE,
        fontFamily: 'Itim-Regular', 
    },
    textStat: {
        fontSize: 18,  
        color: COLORS.WHITE,
        fontFamily: 'Itim-Regular', 
    },
    subtitleStat: {
        color: COLORS.WHITE,
        fontSize: 14,  
        fontFamily: 'Itim-Regular',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignContent: 'center',
        marginTop: 8,
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    ofensiveContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.GRAY,
        borderWidth: 5,
        borderColor: COLORS.DARK_ORANGE,
        borderRadius: 10,  
        padding: 18,
        width: '45%',  
    },
    xpContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.GRAY,
        borderWidth: 5,
        borderColor: COLORS.DARK_BLUE,
        borderRadius: 10,  
        padding: 18,
        width: '45%',  
    },
    icon: {
        marginRight: 6,
    }
});
