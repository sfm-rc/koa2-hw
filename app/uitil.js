"use strict";exports.__esModule = true;var pagination = exports.pagination = function pagination(limit, pageIndex, count) {
    return {
        pagination: {
            pageCount: Math.ceil(count / limit),
            pageIndex: pageIndex,
            limit: limit,
            total: count } };


};

var getLinuxTimeStamp = exports.getLinuxTimeStamp = function getLinuxTimeStamp() {
    return new Date().getTime() / 1000;
};
//# sourceMappingURL=uitil.js.map