// Create trigger to update updated_at on update
// export const createUpdatedAtTrigger = async () => {
//   const query = `
//     CREATE TRIGGER IF NOT EXISTS update_courses_updated_at
//     AFTER UPDATE ON courses
//     FOR EACH ROW
//     BEGIN
//       UPDATE courses
//       SET updated_at = datetime('now')
//       WHERE id = OLD.id;
//     END;
//   `;
//   await db.execAsync(query);
// };
