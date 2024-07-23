"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLikes = exports.toggleLike = exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByBusinessId = exports.getBusinessById = exports.getAllBusiness = void 0;
const Business_1 = __importDefault(require("../models/Business"));
const Review_1 = __importDefault(require("../models/Review"));
const mongoose_1 = __importStar(require("mongoose"));
const Like_1 = __importDefault(require("../models/Like"));
const index_1 = require("../index"); // Import io from index.ts
const business_helper_1 = require("../helpers/business.helper");
const getAllBusiness = async (req, res) => {
    const query = req.query;
    const criteria = (0, business_helper_1.buildCriteria)(query);
    try {
        const business = await Business_1.default.find(criteria);
        res.status(200).send(business);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "getAllBusiness: " + err.message });
    }
};
exports.getAllBusiness = getAllBusiness;
const getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business_1.default.findById(id);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        res.status(200).json(business);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "getBusinessById: " + err.message });
    }
};
exports.getBusinessById = getBusinessById;
const getReviewsByBusinessId = async (req, res) => {
    try {
        const businessId = req.params.id;
        const reviews = await Review_1.default.find({ business: businessId })
            .populate("user", "username imgUrl")
            .populate("likes", "user");
        res.status(200).send(reviews);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "getReviewsByBusinessId: " + err.message });
    }
};
exports.getReviewsByBusinessId = getReviewsByBusinessId;
const createReview = async (req, res) => {
    try {
        const businessId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const review = new Review_1.default(req.body);
        review.business = businessId;
        await review.save();
        // Emit event to notify clients about the new review
        const newReviewPop = await review.populate("user", "username imgUrl");
        index_1.io.emit("newReview", newReviewPop);
        res.status(201).send(review);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "createReview: " + err.message });
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updatedReview = await Review_1.default.findByIdAndUpdate(reviewId, req.body, {
            new: true,
        }).populate("user", "username imgUrl");
        index_1.io.emit("updateReview", updatedReview);
        res.status(200).send(updatedReview);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "updateReview: " + err.message });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        await Review_1.default.findByIdAndDelete(reviewId);
        index_1.io.emit("deleteReview", reviewId);
        res.status(200).send({ message: "Review deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: "deleteReview: " + err.message });
    }
};
exports.deleteReview = deleteReview;
const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewId = new mongoose_1.Types.ObjectId(id);
        const userId = new mongoose_1.Types.ObjectId(req.userId);
        const like = await Like_1.default.findOne({ review: reviewId, user: userId });
        if (like) {
            await Like_1.default.deleteOne({ _id: like._id });
        }
        else {
            const newLike = new Like_1.default({ review: reviewId, user: userId });
            await newLike.save();
        }
        const likesOfReview = await Like_1.default.countDocuments({ review: reviewId });
        const updatedReview = await Review_1.default.findByIdAndUpdate(reviewId, {
            likes: likesOfReview,
        }, { new: true }).populate("user", "username imgUrl");
        // Emit event to notify clients about the like update
        index_1.io.emit("updateLike", { reviewId, likes: likesOfReview });
        res.status(200).json(updatedReview);
    }
    catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ error: "Failed to toggle like" });
    }
};
exports.toggleLike = toggleLike;
const fetchLikes = async (req, res) => {
    try {
        const likes = await Like_1.default.find();
        res.status(200).json(likes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching likes" });
    }
};
exports.fetchLikes = fetchLikes;
//# sourceMappingURL=business.constroller.js.map