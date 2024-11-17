export interface RegisterData extends User {
    contrasenia: string,
}

export interface User{
    nombre: string,
    apellido: string,
    email: string
}

export interface LoginData {
    email: string,
    contrasenia: string
}