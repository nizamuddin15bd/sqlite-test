import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('studentapp.db');

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

export const initDB = async () => {
  try {
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        fees INTEGER
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        course_id INTEGER,
        FOREIGN KEY(course_id) REFERENCES courses(id)
      );
    `);

    console.log("Tables created");
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
};

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
    const res = await db.getAllAsync<Course>('SELECT * FROM courses');
    return res;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

export const insertSubject = async (subject: Subject) => {
  try {
    await db.runAsync(
      'INSERT INTO subjects (name, course_id) VALUES (?, ?);',
      [subject.name, subject.course_id]
    );
    console.log("Subject inserted");
  } catch (err) {
    console.error("Error inserting subject:", err);
  }
};

export const getSubjectsByCourseId = async (courseId: number): Promise<Subject[]> => {
  try {
    const res = await db.getAllAsync<Subject>(
      'SELECT * FROM subjects WHERE course_id = ?;',
      [courseId]
    );
    return res;
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};

export const deleteCourse = async (id: number) =>{
    try {
        await db.runAsync("DELETE FROM courses WHERE id = ?", [id])
        console.log("course Delete")
    } catch (error) {
        console.error("Error deleting course", error )
    }
}
