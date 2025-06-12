import { Course } from '@/types';
import { db } from './connection';


export const insertCourse = async (course: Course) => {
  try {
    await db.runAsync(
      'INSERT INTO courses (name, fees) VALUES (?, ?);',
      [course.name, course.fees]
    );
    console.log("Course inserted");
  } catch (err) {
    console.error("Error inserting course:", err);
  }
};

export const getCourses = async (): Promise<Course[]> => {
  try {
    return await db.getAllAsync<Course>('SELECT * FROM courses');
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

export const deleteCourse = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM courses WHERE id = ?', [id]);
    console.log("Course deleted");
  } catch (err) {
    console.error("Error deleting course", err);
  }
};

export const searchCourses = async (query:string): Promise<Course[]> =>{
    try {
       return await db.getAllAsync<Course>(
        "SELECT * FROM courses WHERE name LIKE ?",
        [`${query}%`]
       ) 
    } catch (error) {
       console.error("Error searching courses:", error); 
       return [];
    }
}
