import {
  deleteById,
  getAllData,
  getById,
  getSingleRecordByColumn,
  insertData,
  updateData,
} from "./baseOperations";

export const insertSubject = async (subject: {
  name: string;
  course_id: number;
}) => {
  return await insertData({
    table: "subjects",
    data: {
      name: subject.name.trim(),
      course_id: subject.course_id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
};

export const updateSubject = async (subject: {
  id: number;
  name: string;
  course_id: number;
}) => {
  return await updateData({
    table: "subjects",
    data: {
      name: subject.name.trim(),
      course_id: subject.course_id,
    },
    whereColumn: "id",
    whereValue: subject.id,
  });
};

export const deleteSubject = async (id: number) => {
  return await deleteById({ table: "subjects", id });
};

export const getAllSubjects = async () => {
  return await getAllData("subjects");
};

export const getSubjectById = async (id: number) => {
  return await getById("subjects", id);
};

export const getSubjectByName = async (name: string) => {
  return await getSingleRecordByColumn("subjects", "name", name.trim());
};
