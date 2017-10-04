const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');
const decipher = crypto.createDecipher('aes192', 'a password');

function cryptor(){
    return {
        encrypt: function (input){
            let encrypted = '';
            cipher.on('readable', () => {
                const data = cipher.read();
                if (data)
                    encrypted += data.toString('hex');
            });
            cipher.on('end', () => {
                console.log(encrypted);
            });

            cipher.write(input);
            cipher.end();
            return encrypted;
        }, decrypt : function(encryptedString){
            let decrypted = '';
            decipher.on('readable', () => {
                const data = decipher.read();
                if (data)
                    decrypted += data.toString('utf8');
            });
            decipher.on('end', () => {
                console.log(decrypted);
            });

            decipher.write(encryptedString, 'hex');
            decipher.end();
            return decrypted;
        }
    }
}
module.exports = cryptor;