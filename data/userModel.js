const db = require('./dbConfig');

const findUsers = () => {
    return db('users');
}

const findUsersBy = (filter) => {
    return db('users').where(filter);
}

const findUsersById = (id) => {
    return db('users').where({id});
}

const insert = (user) => {
    return db('users').insert(user)
                .then(id => {
                    findUsersById(id[0]);
                })
}

const update = (id, changes) => {
    return db('users')
        .where('id', Number(id))
        .update(changes)
}

const remove = (id) => {
    return db('users')
        .where({id})
        .del();
}

module.exports = {
    findUsers,
    findUsersBy,
    findUsersById,
    insert,
    update,
    remove
}

