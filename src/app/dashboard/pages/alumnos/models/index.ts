export interface Student{
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    token: string;
    role: "ADMINISTRADOR" | "USUARIO" | "ESTUDIANTE" | "";
}