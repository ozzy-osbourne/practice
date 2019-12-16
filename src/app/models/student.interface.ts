import { ISubject } from './subject.interface';

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
    password: string;
    group: string;
    role: string;
    subjects: ISubject[];
}
