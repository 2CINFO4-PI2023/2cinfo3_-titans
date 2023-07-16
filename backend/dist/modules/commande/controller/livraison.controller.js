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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivraisonController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HTTPError_1 = require("../../../errors/HTTPError");
class LivraisonController {
    constructor(livraisonService) {
        this.livraisonService = livraisonService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livraison = {
                    commande: mongoose_1.default.isValidObjectId("64ac6be5f2cefda913509b57") ? "64ac6be5f2cefda913509b57" : null,
                    deliveryMan: {
                        name: "mouhibbbb",
                        phoneNumber: "548485448"
                    },
                    deliveryStatus: "en cours",
                };
                console.log("ssssss", livraison);
                const data = yield this.livraisonService.createLivraison(livraison);
                res.status(200).json(data);
                // add confirmation email with mohamed
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
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const livraison = yield this.livraisonService.getLivraison(id);
                if (!livraison) {
                    return res.status(404).json({ message: "livraison not found" });
                }
                res.json(livraison);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livraisons = yield this.livraisonService.allLivraisons();
                res.json(livraisons);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = mongoose_1.default.isValidObjectId(req.params.id) ? req.params.id : "";
                const livraison = req.body;
                console.log("upfff", livraison, id);
                const response = yield this.livraisonService.updateLivraison(id, livraison);
                res.json({ message: "livraison updated successfully", response });
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
                const id = req.params.id;
                yield this.livraisonService.deleteLivraison(id);
                res.json({ message: "livraison deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.LivraisonController = LivraisonController;
