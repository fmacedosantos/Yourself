import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    finishActivityButton: {
        backgroundColor: COLORS.ORANGE,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        marginVertical: 10,
    },
    finishActivityText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontFamily: 'Itim-Regular',
    }
});