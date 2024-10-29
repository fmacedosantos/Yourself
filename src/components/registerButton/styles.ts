import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    registerButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    registerText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontFamily: 'Itim-Regular',
    }
});