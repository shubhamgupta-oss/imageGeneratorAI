import jwt from 'jsonwebtoken';

export async function getUser(user) {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
    }, process.env.SECRET_KEY, { expiresIn: '10h' });
}

export async function setUser(token) {
    if (!token) return null;
    return jwt.verify(token, process.env.SECRET_KEY);
}
