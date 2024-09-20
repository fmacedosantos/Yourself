import React from "react";

import {  Text, View, TextInput, Button } from 'react-native';

import { style } from "./LoginStyle";

import { useNavigation } from '@react-navigation/native';


export default function Login() {

    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.boxTop}>

                <Text style={style.text}>Y🔥ourself</Text>

            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>E-MAIL</Text>
                <View style={style.BoxInput}>
                    <TextInput
                        style={style.input}
                    />
                </View>

                <Text style={style.titleInput}>SENHA</Text>
                <View style={style.BoxInput}>
                    <TextInput
                        style={style.input}
                    />
                </View>

                <Button title="Entrar" onPress={() => navigation.navigate('Home')} />

                <button 
                style={style.buttonCadastrar}>Cadastrar
                </button>

                <Text style={style.esqueceu}>Esqueceu a <a href="button" style={style.senha}>senha</a>?</Text>

            </View>

        </View>
    )
}

