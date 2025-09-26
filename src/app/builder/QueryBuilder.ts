import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string | undefined;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  filter() {
    const andConditions: FilterQuery<T>[] = [];
    const email = this.query?.email as string | undefined;

    if (email) {
      andConditions.push({ email } as FilterQuery<T>);
    }

    if (andConditions.length > 0) {
      this.modelQuery = this.modelQuery.find({ $and: andConditions });
    }
    return this;
  }

  sort() {
    const sortField = this.query?.sortField as string | undefined;
    const sortOrder = this.query?.sortOrder as string | undefined;

    const sort: Record<string, 1 | -1> = {};
    if (sortField) {
      sort[sortField] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort["createdAt"] = -1; // default sort
    }

    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const limit = parseInt(this.query?.limit as string) || 20;
    const page = parseInt(this.query?.page as string) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const field = this.query?.field as string | undefined;
    let projection: string = "-__v";
    if (field) {
      projection = field
        .split(",")
        .map((f) => f.trim())
        .join(" ");
    }
    this.modelQuery = this.modelQuery.select(projection);
    return this;
  }
}

export default QueryBuilder;
