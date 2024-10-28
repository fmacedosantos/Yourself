import { IPS } from "./Ips";

export enum Paths {
    SHOW_ACTIVITIES = 'atividade/mostrar'
}

export const ROUTES = (route: Paths) => {
    return `http://${IPS.SENAI}:3000/${route}`;
};