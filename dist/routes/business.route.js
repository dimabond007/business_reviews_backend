"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const business_constroller_1 = require("../controllers/business.constroller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const businessRouter = (0, express_1.Router)();
businessRouter.get("/", business_constroller_1.getAllBusiness);
// businessRouter.get('/image', getImage)
businessRouter.patch("/review/:id/", business_constroller_1.updateReview);
businessRouter.get("/review/:id/like", auth_middleware_1.verifyToken, business_constroller_1.toggleLike);
businessRouter.get("/likes", business_constroller_1.fetchLikes);
businessRouter.get("/:id/", business_constroller_1.getBusinessById);
businessRouter.get("/:id/reviews/", business_constroller_1.getReviewsByBusinessId);
businessRouter.post("/:id/reviews/", auth_middleware_1.verifyToken, business_constroller_1.createReview);
businessRouter.delete("/:id/reviews/:reviewId", auth_middleware_1.verifyToken, business_constroller_1.deleteReview);
exports.default = businessRouter;
//# sourceMappingURL=business.route.js.map