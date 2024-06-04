"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const userData = new this.userModel(createUserDto);
        return await userData.save();
    }
    async findAll() {
        const result = await this.userModel.find({});
        return result;
    }
    async findOne(id) {
        const result = await this.userModel.findOne({ _id: id });
        return result;
    }
    async update(id, updateUserDto) {
        const result = await this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto });
        return result;
    }
    async remove(id) {
        const result = await this.userModel.deleteOne({ _id: id });
        return result;
    }
    async findUserByUserName(username) {
        const result = await this.userModel.find({ username });
        return result;
    }
    async signIn(signInDto) {
        const result = await this.findUserByUserName(signInDto.username);
        if (result[0].password !== signInDto.password) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: result._id, username: result.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map