import {
  deleteById,
  getAllData,
  getById,
  getSingleRecordByColumn,
  getSumByColumn,
  insertData,
  updateData,
} from "./baseOperations";

export const insertCourse = async (course: { name: string; fees: number }) => {
  return await insertData({
    table: "courses",
    data: {
      name: course.name.trim(),
      fees: course.fees,
    },
  });
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

export const deleteCourse = async (id: number) => {
  return await deleteById({ table: "courses", id });
};

export const getAllCourses = async () => {
  return await getAllData("courses");
};

export const getCourseById = async (id: number) => {
  return await getById("courses", id);
};

export const getCourseByName = async (name: string) => {
  return await getSingleRecordByColumn("courses", "name", name.trim());
};

export const getTotalCourseFees = async () => {
  return await getSumByColumn("courses", "fees");
};
