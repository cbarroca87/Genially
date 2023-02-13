import { Router } from "express";
import * as crud from "../controllers/crud"
import checkFields from "../middlewares/checkFields";

const router = Router();

// Primary app routes
// app.get("/", healthController.check);
router.get("/", crud.getGeniallies);
router.post("/", [checkFields], crud.saveGenially);
router.put("/:id",  crud.modifyGenially);
router.delete("/:id",  crud.deleteGenially);


export default router;