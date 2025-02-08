"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/notes.ts
const express_1 = __importDefault(require("express"));
const notesController_js_1 = __importDefault(require("../controllers/notesController.js"));
const router = express_1.default.Router();
router.get('/notes', notesController_js_1.default.getAllNotes);
router.post('/notes', notesController_js_1.default.createNote);
exports.default = router;
