"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongoose_1 = require("mongoose");
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const InvalidObjectIdError_1 = require("../../../errors/InvalidObjectIdError");
const NotFoundError_1 = require("../../../errors/NotFoundError");
const user_schema_1 = require("../model/user.schema");
class UserRepository {
    constructor() { }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield user_schema_1.User.create(user);
                const _a = doc.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                return userWithoutPassword;
            }
            catch (error) {
                if (error.code == 11000) {
                    throw new DuplicatedError_1.DuplicatedError("Email is already used");
                }
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const user = yield user_schema_1.User.findById(id).select("-password");
                if (user == null) {
                    throw new NotFoundError_1.NotFoundError("user not found");
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    all(page, pageSize, filters, sortField, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * pageSize;
                const query = {};
                if (filters.name) {
                    query.name = { $regex: new RegExp(filters.name, "i") };
                }
                if (filters.email) {
                    query.email = { $regex: new RegExp(filters.email, "i") };
                }
                if (filters.role) {
                    query.role = parseInt(filters.role, 10);
                }
                if (filters.phone) {
                    query.phone = { $regex: new RegExp(filters.phone, "i") };
                }
                const sortQuery = {};
                sortQuery[sortField] = sortOrder === "desc" ? -1 : 1;
                const users = yield user_schema_1.User.find(query)
                    .select("-password")
                    .skip(skip)
                    .limit(pageSize)
                    .sort(sortQuery);
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const doc = yield user_schema_1.User.findByIdAndDelete(id);
                if (doc == null) {
                    throw new NotFoundError_1.NotFoundError("user not found");
                }
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const doc = yield user_schema_1.User.findByIdAndUpdate(id, user, { new: true });
                if (doc == null) {
                    throw new NotFoundError_1.NotFoundError("user not found");
                }
                const _a = doc.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                return userWithoutPassword;
            }
            catch (error) {
                if (error.code == 11000) {
                    throw new DuplicatedError_1.DuplicatedError("Email is already used");
                }
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield user_schema_1.User.findOne({ email });
                if (doc == null) {
                    throw new NotFoundError_1.NotFoundError("user not found");
                }
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    countUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield user_schema_1.User.countDocuments(filters);
                return count;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
