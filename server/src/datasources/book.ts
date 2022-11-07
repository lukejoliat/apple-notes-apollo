import { DataSource } from "apollo-datasource";
import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";

export class BookAPI extends DataSource {
  store: any;
  context: any;
  constructor({ store }) {
    super();
    this.store = store;
    this.store.db.sync();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
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
