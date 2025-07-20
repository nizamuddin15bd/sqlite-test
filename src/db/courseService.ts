import { Course } from "@/types";
import { updateData } from "../components/RUComponents/updateData";
import { db } from "./connection";
import { insertData } from "./dbGlobalFn/insertData";
import { searchByColumn } from "./dbGlobalFn/searchByColumn";
import { buildSqlFilters } from "./dbGlobalFn/sqlBuilder";

// export const insertCourse = async (course: Course) => {
//   try {
//     await db.runAsync(
//       'INSERT INTO courses (name, fees) VALUES (?, ?);',
//       [course.name, course.fees]
//     );
//     console.log("Course inserted");
//   } catch (err) {
//     console.error("Error inserting course:", err);
//   }
// };
export const insertCourse = async (course: Course) => {
  return await insertData({
    table: "courses",
    data: {
      name: course.name,
      fees: course.fees,
    },
  });
};

// export const getCourses = async (): Promise<Course[]> => {
//   try {
//     return await db.getAllAsync<Course>('SELECT * FROM courses');
//   } catch (err) {
//     console.error("Error fetching courses:", err);
//     return [];
//   }
// };
// export const getCourses = async ({
//   limit,
//   offset,
//   searchQuery = "",
//   sortByOrder = "desc",
// }: {
//   limit: number;
//   offset: number;
//   searchQuery?: string;
//   sortByOrder?: "asc" | "desc";
// }): Promise<Course[]> => {
//   try {
//     let query = 'SELECT * FROM courses';
//     const params: any[] = [];

//     if (searchQuery) {
//       query += ' WHERE name LIKE ?';
//       params.push(`%${searchQuery}%`);
//     }

//     query += ` ORDER BY id ${sortByOrder.toUpperCase()} LIMIT ? OFFSET ?`;
//     params.push(limit, offset);

//     return await db.getAllAsync<Course>(query, params);
//   } catch (err) {
//     console.error("Error fetching courses:", err);
//     return [];
//   }
// };

export const getCourses = async ({
  limit,
  offset,
  searchQuery = "",
  sortByOrder = "desc",
}: {
  limit: number;
  offset: number;
  searchQuery?: string;
  sortByOrder?: "asc" | "desc";
}): Promise<Course[]> => {
  try {
    const baseQuery = "SELECT * FROM courses";
    const { fullClause, params } = buildSqlFilters({
      searchQuery,
      sortByOrder,
      limit,
      offset,
      searchFields: ["name"], // search in multiple fields
    });

    const finalQuery = `${baseQuery} ${fullClause}`;
    return await db.getAllAsync<Course>(finalQuery, params);
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};
export const updateCourse = async (course: {
  id: number;
  name: string;
  fees: number;
}) => {
  return await updateData({
    table: "courses",
    data: {
      name: course.name,
      fees: course.fees,
    },
    whereColumn: "id",
    whereValue: course.id,
  });
};
export const searchCourses = async (query: string) => {
  return await searchByColumn<Course>("courses", "name", query);
};
// export const searchCourses = async (query: string): Promise<Course[]> => {
//   try {
//     return await db.getAllAsync<Course>(
//       "SELECT * FROM courses WHERE name LIKE ?",
//       [`${query}%`]
//     );
//   } catch (error) {
//     console.error("Error searching courses:", error);
//     return [];
//   }
// };

// export const deleteCourse = async (id: number) => {
//   try {
//     await db.runAsync('DELETE FROM courses WHERE id = ?', [id]);
//     console.log("Course deleted");
//   } catch (err) {
//     console.error("Error deleting course", err);
//   }
// };
