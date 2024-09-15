import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (name:string, email: string, password: string): Promise<any> => {
    const { data } = await $host.post('user/register', {name, email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email: string, password: string): Promise<any> => {
    const { data } = await $host.post('user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async (): Promise<any> => {
    const { data } = await $authHost.get('user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const logout = (): void => {
    localStorage.removeItem('token');
};

// Обновление пользовательстих данных
export const updateNewUserDate = async (name: string, email: string, about: string, lastName: string, id:any): Promise<any> => {
    const { data } = await $host.patch(`user/${id}`, {name, email, about, lastName});
    return data;
};