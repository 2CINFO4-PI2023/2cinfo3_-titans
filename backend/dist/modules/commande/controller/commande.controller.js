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
exports.CommandeController = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const plat_repository_1 = require("../../stock/repository/plat.repository");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51NQZmtHmHdoE3GBpdVHeTCmGIgVQwTzbr9uUuxTtCwaFMCKNSqI1tvsu3sTrayjoI75Y1Gmxrwdqojd6pKlKUZn600qO0evALz");
class CommandeController {
    constructor(commandeService) {
        this.commandeService = commandeService;
        this.platRepo = new plat_repository_1.PlatRepository();
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let commande = req.body;
                let itemsPrice = 0;
                const { orderItems, taxPrice, shippingPrice } = req.body;
                for (let i = 0; i < orderItems.length; i++) {
                    const plat = yield this.platRepo.get((_a = orderItems[i]) === null || _a === void 0 ? void 0 : _a.plat);
                    console.log("plat ==>", plat);
                    itemsPrice = itemsPrice + (plat === null || plat === void 0 ? void 0 : plat.price) * ((_b = orderItems[i]) === null || _b === void 0 ? void 0 : _b.qty);
                }
                const totalPrice = itemsPrice + taxPrice + shippingPrice;
                commande = Object.assign(Object.assign({}, commande), { totalPrice, itemsPrice });
                const data = yield this.commandeService.createCommande(commande);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof DuplicatedError_1.DuplicatedError) {
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
                const commande = yield this.commandeService.getCommande(id);
                if (!commande) {
                    return res.status(404).json({ message: "Commande not found" });
                }
                res.json(commande);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commandes = yield this.commandeService.allCommandes();
                res.json(commandes);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const commande = req.body;
                const response = yield this.commandeService.updateCommande(id, commande);
                res.json({ message: "Commande updated successfully", response });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.commandeService.deleteCommande(id);
                res.json({ message: "Commande deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    payCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield stripe.checkout.sessions.create({
                    line_items: [
                        {
                            price_data: {
                                currency: "EUR",
                                unit_amount: 2000,
                                product_data: {
                                    name: "T-shirt",
                                    description: "Comfortable cotton t-shirt",
                                    images: ["https://example.com/t-shirt.png"],
                                },
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: "https://someurl",
                    cancel_url: "https://someurl",
                });
                res.status(200).json({
                    success: true,
                    info: session,
                });
            }
            catch (error) {
                res.status(500).send(error);
                throw error;
            }
        });
    }
}
exports.CommandeController = CommandeController;
