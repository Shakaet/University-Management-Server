import { Faculty } from "./faculty.model";

export const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};



export const FacultyServices = {
  
  getSingleFacultyFromDB,
  
};
