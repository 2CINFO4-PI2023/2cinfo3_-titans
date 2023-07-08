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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatController = void 0;
const HTTPError_1 = require("../../../errors/HTTPError");
class PlatController {
    constructor(platService) {
        this.platService = platService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plat = req.body;
                const data = yield this.platService.createPlat(plat);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError)
                    return res.status(error.http_code)
                        .json({ message: error.message, description: error.description });
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.platService.getAllPlat();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.platService.getPlat(req.params.id);
                res.status(200).json(data);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.platService.updatePlat(req.params.id, req.body);
                return res.status(200).send(data);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.platService.deletePlat(req.params.id);
                return res.status(204).send();
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    platCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.platService.commandPlat(req.params.id);
                return res.status(200).send();
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    calculCalories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.platService.calculCalories(req.params.id);
                return res.status(200).send(data);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    getlatestPlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.platService.getlatestPlat();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.PlatController = PlatController;
