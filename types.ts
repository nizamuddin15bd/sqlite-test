export interface Course {
  id?: number;
  name: string;
  fees: number;
}

export interface Subject {
  id?: number;
  name: string;
  course_id: number;
}
