const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'secreta'; // Substitua por uma chave secreta segura

// Mock de usuários
const users = [
    {
        id: '1',
        username: 'user',
        password: 'a0/UhPzPmeXtt7l1vO9n.kpd2jJ7Z/Ji3SE5bBO5K' // 'password' criptografada
    }
];

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            console.log('Erro na comparação ou senha incorreta:', err);
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { login };
