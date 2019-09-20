const bcrypt = require('bcrypt');



//hash functionality using bcrypt
// UserSchema.pre('save', function(next) {
//     console.log("pre save hook");
//     bcrypt.hash(this.password, 12, (err, hash) => {
//         if(err){
//             return next(err);
//         }
//         this.password = hash;
//         next();

//     });
// });

