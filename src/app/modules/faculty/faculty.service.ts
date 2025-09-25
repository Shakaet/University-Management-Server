import { catchAsynFunction } from "../../utils/catchAsync";
import { Faculty } from "./faculty.model";

export const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  
   let {searchTerm,email,sortField,sortOrder,limit,page,field}=query

let andConditions = [];

if (searchTerm) {
  andConditions.push({
    $or: ["email", "name.firstName", "presentAddress"].map(field => ({
      [field]: { $regex: searchTerm, $options: "i" }
    }))
  });
}

if (email) {
  andConditions.push({ email: email });
}


const querys = andConditions.length > 0 ? { $and: andConditions } : {};

// Default sort
const sort :Record<string, 1 | -1> = {};
if (sortField) {
  sort[sortField as string] = sortOrder === "desc" ? -1 : 1; // 1 = asc, -1 = desc
}

// Pagination
const limitNum = parseInt(limit as string) || 20; // default 20
const pageNum = parseInt(page as string) || 1; // default 1
const skipNum = (pageNum - 1) * limitNum;

 // 🎯 Field limiting (projection)
  let projection: string = '-__v';
  if (field) {
    projection = (field as string)
      .split(",")
      .map(f => f.trim())
      .join(" ");
  }
  

  const result = await Faculty.find(
    querys
  ).sort(sort).select(projection).skip(skipNum).limit(limitNum).populate("academicDepartment")

 
  return result
};



export const FacultyServices = {
  
  getSingleFacultyFromDB,
  getAllFacultiesFromDB
  
};
