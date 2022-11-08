import types, { Sequelize } from "sequelize";

export const createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.sqlite",
  });

  const books = db.define("books", {
    id: { primaryKey: true, type: types.STRING },
    title: types.STRING,
    author: types.STRING,
  });

  const notes = db.define("notes", {
    id: { primaryKey: true, type: types.STRING },
    title: types.STRING,
    content: types.STRING,
  });

  return { db, books, notes };
};
