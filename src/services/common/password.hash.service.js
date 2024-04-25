const bcrypt = require('bcryptjs')

hashPassword = async (password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (e) {
        console.log(e)
    }

}

verifyPassword = async (password, hashedPassword) => {
    try {
        var result = await bcrypt.compare(password, hashedPassword)       
        return result
    } catch (e) {
        console.log(e)
    }

}

module.exports = { verifyPassword, hashPassword }