const IP = '192.168.1.13';

export enum PATHS {
    SHOW_ACTIVITIES = 'atividade/mostrar', // feito
    SHOW_STATS = 'usuario/mostrar-estatisticas', // feito
    SHOW_PREFERENCES = 'usuario/mostrar-preferencias', // feito
    REGISTER_USER = 'usuario/cadastrar', // feito
    REGISTER_ACTIVITY = 'atividade/cadastrar', // feito
    SHOW_ITEMS = 'item/mostrar-todos',
    SHOW_ITEMS_USER = 'item/mostrar',
    SHOW_USER = 'usuario/mostrar', // feito
    UPDATE_USER = 'usuario/atualizar', // feito
    UPDATE_PREFERENCES = 'usuario/atualizar-preferencias',
    AUTHENTICATE = 'usuario/autenticar', // feito
    REAUTHENTICATE = 'usuario/reautenticar', // feito
    AUTHENTICATE_JWT = 'usuario/autenticar-jwt', // feito
    BUY_ITEM = 'item/comprar',
    DELETE_ACTIVITY = 'atividade/deletar' // feito
}

export const ROUTES = (route: PATHS) => {
    return `http://${IP}:3000/${route}`;
};