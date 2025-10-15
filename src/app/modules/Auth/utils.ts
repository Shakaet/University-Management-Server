import { AppError } from "../../Errors/AppError";
import bcrypt from "bcrypt"
import { UserModel } from "../user/user.model";



export const validateUserById = async (id: string, password?: string) => {
  // 1️⃣ Check if user exists
  const user = await UserModel.findOne({ id });
  if (!user) {
    throw new AppError(404, "This user does not exist", "");
  }

  // 2️⃣ Check if deleted
  if (user.isDeleted) {
    throw new AppError(404, "This user does not exist (already deleted)", "");
  }

  // 3️⃣ Check if blocked
  if (user.status === "blocked") {
    throw new AppError(403, "This user is blocked", "");
  }

  // 4️⃣ Optional: check password
  if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(401, "Password did not match", "");
    }
  }

  // ✅ All good → return user
  return user;
};