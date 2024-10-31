import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    enterButton: {
        backgroundColor: COLORS.ORANGE,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    enterText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontFamily: 'Itim-Regular',
    }
});