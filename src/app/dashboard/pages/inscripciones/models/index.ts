import { Student } from "../../alumnos/models";
import { Course } from "../../courses/model";

export interface Inscripcion{
    id: number;
    studentId: number;
    courseId: number;
}

export interface InscripcionWithStudentAndCourse extends Inscripcion{
    student: Student;
    course: Course;
}

export interface CreateInscripcionPayload{
    studentId: number | null;
    courseId: number | null;
}