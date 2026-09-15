import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

/**
 * Express middleware that verifies the Bearer JWT from the Authorization header.
 * On success it attaches { userId, email } to req.userData and calls next();
 * otherwise it responds with 401 Unauthorized.
 */
function checkAuth(req, res, next) {
    try {
        // Expected header format: "Authorization: Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, secretKey);
        // Expose the authenticated user to downstream route handlers
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed try Again" });
    }
};

export default checkAuth;
