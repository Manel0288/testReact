const jwt = require('jsonwebtoken');
const secret = 'maneltestforinternship';

const authCheck = (req, res, next) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            console.log(decoded)
            return next();
        });
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = authCheck;