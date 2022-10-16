const crypto = require("crypto");

module.exports={
    generateSHA256: (value) => {
        return crypto.createHash("sha256").update(value).digest("hex");
    }
};