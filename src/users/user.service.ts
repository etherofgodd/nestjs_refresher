import { Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDetailDto } from "./dto/user-detail.dto";
import { User } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserRepository.name)

    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(userId: string): Promise<User> {
        this.logger.log(userId)
        return this.userRepository.findOneUser({ userId })
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.findUsers({})
    }

    async createUser({ age, email }: CreateUserDto): Promise<User> {
        this.logger.debug(`age of user ${age}:::email of the user${email}`)
        return this.userRepository.createUser({
            age,
            email,
            favouriteFoods: [],
            userId: randomUUID()
        })
    }

    async updateUser(userId: string, userUpdateDto: UserDetailDto) {
        console.log('userUpdateDto', userUpdateDto)
        this.logger.log(`updating the user field with this param::: ${userUpdateDto}`, this.updateUser.name)
        return this.userRepository.findOneUserAndUpdate({ userId }, userUpdateDto)
    }
}