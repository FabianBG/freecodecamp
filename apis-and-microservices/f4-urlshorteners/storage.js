// temporal in memory storage
const db = {};

const get = (id) => {
  return db[index];
};

const insert = (id, value) => {
  db[id] = value;
};

module.exports = {
  get,
  insert,
};
