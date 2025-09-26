import mongoose from "mongoose";
import { catchAsynFunction } from "../../utils/catchAsync";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { UserModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";

export const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  
//    let {searchTerm,email,sortField,sortOrder,limit,page,field}=query

// let andConditions = [];

// if (searchTerm) {
//   andConditions.push({
//     $or: ["email", "name.firstName", "presentAddress"].map(field => ({
//       [field]: { $regex: searchTerm, $options: "i" }
//     }))
//   });
// }

// if (email) {
//   andConditions.push({ email: email });
// }


// const querys = andConditions.length > 0 ? { $and: andConditions } : {};

// // Default sort
// const sort :Record<string, 1 | -1> = {};
// if (sortField) {
//   sort[sortField as string] = sortOrder === "desc" ? -1 : 1; // 1 = asc, -1 = desc
// }

// // Pagination
// const limitNum = parseInt(limit as string) || 20; // default 20
// const pageNum = parseInt(page as string) || 1; // default 1
// const skipNum = (pageNum - 1) * limitNum;

//  // 🎯 Field limiting (projection)
//   let projection: string = '-__v';
//   if (field) {
//     projection = (field as string)
//       .split(",")
//       .map(f => f.trim())
//       .join(" ");
//   }
  

//   const result = await Faculty.find(
//     querys
//   ).sort(sort).select(projection).skip(skipNum).limit(limitNum).populate("academicDepartment")

 
//   return result


// use Query builder

const queryBuilder = new QueryBuilder(Faculty.find(), query)
    .search(["email", "name.firstName", "presentAddress"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery;
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new Error('Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};





export const FacultyServices = {
  
  getSingleFacultyFromDB,
  getAllFacultiesFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB
  
};
