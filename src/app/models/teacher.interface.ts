export interface ITeacher {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
    password: string;
    groups: string[];
    role: string;
    subjects: string[];
}
