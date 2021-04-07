import express from "express";
import {setSignUpCommission} from '../controllers/setSignUpCommission.js';
import {setSaleCommission} from '../controllers/setSaleCommission.js';
import {signUpActivity} from '../controllers/signUpActivity.js';
import {saleCompleteActivity} from '../controllers/saleCompleteActivity.js';
import {balanceOf} from '../controllers/balanceOf.js';

const router = express.Router();

router.post("/setSignUpCommission", setSignUpCommission);
router.post("/setSaleCommission", setSaleCommission);
router.post("/signUpActivity", signUpActivity);
router.post("/saleCompleteActivity", saleCompleteActivity);
router.post("/balanceOf", balanceOf);



export default router;
