const bcrypt = require('bcrypt');

const getSalt = async() =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('12345',salt);
    console.log(hashedPass);
}

