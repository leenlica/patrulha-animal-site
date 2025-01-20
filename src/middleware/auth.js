import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
    try {
        const { authorization } = req.headers;

        const [, token] = authorization.split(' ');

        const { id_usuario } = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = id_usuario;

        next();
    } catch (error) {
        res.status(401).send({ auth: false, message: 'Token invalid.' });
    }
}

export { isAuthenticated };
