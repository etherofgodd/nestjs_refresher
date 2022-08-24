import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDetailDto } from "./dto/user-detail.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(":userId")
    async getUserById(@Param("userId") userId: string): Promise<User> {
        return this.userService.getUserById(userId)
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto)
    }

    @Patch(":userId")
    async updateUser(
        @Param("userId") userId: string,
        @Body() userDetail: UserDetailDto): Promise<User> {
        return this.userService.updateUser(userId, userDetail)
    }
}