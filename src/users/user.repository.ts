import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    private readonly logger = new Logger(UserRepository.name)
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOneUser(userFilterQuery: FilterQuery<User>): Promise<User> {
        this.logger.debug(`filter query param 😟 ${userFilterQuery}`)
        return this.userModel.findOne(userFilterQuery);
    }

    async findUsers(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async createUser(user: User): Promise<User> {
        const newUser = this.userModel.create(user);
        return (await newUser).save();
    }

    async findOneUserAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}