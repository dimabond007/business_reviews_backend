"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCriteria = buildCriteria;
function buildCriteria(query) {
    const criteria = {};
    if (query.name) {
        criteria.name = { $regex: query.name, $options: "i" };
    }
    if (query.category) {
        criteria.category = { $regex: query.category, $options: "i" };
    }
    if (query.district) {
        criteria.district = { $regex: query.district, $options: "i" };
    }
    return criteria;
}
//# sourceMappingURL=business.helper.js.map