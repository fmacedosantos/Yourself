const IP = '192.168.0.229';

export enum PATHS {
    SHOW_ACTIVITIES = 'atividade/mostrar',
    SHOW_STATS = 'usuario/mostrar-estatisticas',
    REGISTER_USER = 'usuario/cadastrar'
}

export const ROUTES = (route: PATHS) => {
    return `http://${IP}:3000/${route}`;
};