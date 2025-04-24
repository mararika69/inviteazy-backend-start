import { UserModel } from "../../models/userModel";
import { IUser, IUserRepository, IUserWithoutPassword } from "../../interfaces/userInterface";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<IUserWithoutPassword[]> {
    const result = await UserModel.find();
    return result.map(({ id, full_name, email, phone_number, profile_picture, address }) => ({
      id,
      full_name,
      email,
      phone_number,
      profile_picture,
      address,
    }));
  }

  async findById(id: string): Promise<IUserWithoutPassword | null> {
    const result = await UserModel.findById(id);
    if (!result) return null;

    const { full_name, email, phone_number, profile_picture, address } = result;
    return {
      id: result.id,
      full_name,
      email,
      phone_number,
      profile_picture,
      address,
    };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
    const newUser = await UserModel.create(user);

    const { full_name, email, phone_number, profile_picture, address } = newUser;
    return {
      id: newUser.id,
      full_name,
      email,
      phone_number,
      profile_picture,
      address,
    };
  }
}
