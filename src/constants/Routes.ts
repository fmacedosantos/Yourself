const IP = '192.168.0.229';

export enum PATHS {
    SHOW_ACTIVITIES = 'atividade/mostrar',
    SHOW_STATS = 'usuario/mostrar-estatisticas',
    SHOW_PREFERENCES = 'usuario/mostrar-preferencias',
    REGISTER_USER = 'usuario/cadastrar',
    REGISTER_ACTIVITY = 'atividade/cadastrar',
    SHOW_ITEMS = 'item/mostrar-todos'
}

export const ROUTES = (route: PATHS) => {
    return `http://${IP}:3000/${route}`;
};