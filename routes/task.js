import e from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=e.Router();

router.post("/new",isAuthenticated,newTask)
router.get("/my",isAuthenticated,getMyTasks);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);
export default router;