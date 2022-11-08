import { GraphQLError } from "graphql";
import types from "sequelize";

export class BookAPI {
  private store: {
    db: types.Sequelize;
    books: types.ModelStatic<types.Model<any, any>>;
  };
  constructor({ store }) {
    this.store = store;
    this.store.db.sync();
  }

  async getBook(id: string) {
    const res = await this.store.books.findByPk(id);
    return res;
  }

  async getBooks() {
    const res = await this.store.books.findAll();
    return res;
  }

  async createBook(book) {
    const res = await this.store.books.create(book);
    return res;
  }

  async deleteBook(id) {
    const res = await this.store.books.destroy({ where: { id } });
    throw new GraphQLError("Operation not permitted", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  async updateBook(book) {
    const { id, title, author } = book;
    const newBook = {};
    if (title) newBook["title"] = title;
    if (author) newBook["author"] = author;
    const res = await this.store.books.update(newBook, {
      where: {
        id,
      },
    });
    return book;
  }
}

export default BookAPI;
