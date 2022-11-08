import { GraphQLError } from "graphql";
import types from "sequelize";

export class NoteDataSource {
  private store: {
    db: types.Sequelize;
    notes: types.ModelStatic<types.Model<any, any>>;
  };
  constructor({ store }) {
    this.store = store;
    this.store.db.sync();
  }

  async getNote(id: string) {
    const res = await this.store.notes.findByPk(id);
    return res;
  }

  async getNotes() {
    const res = await this.store.notes.findAll();
    return res;
  }

  async createNote(note) {
    const res = await this.store.notes.create(note);
    return res;
  }

  async deleteNote(id) {
    const res = await this.store.notes.destroy({ where: { id } });
    throw new GraphQLError("Operation not permitted", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  async updateNote(note) {
    const { id, title, author } = note;
    const newNote = {};
    if (title) newNote["title"] = title;
    if (author) newNote["content"] = author;
    await this.store.notes.update(newNote, {
      where: {
        id,
      },
    });
    return note;
  }
}

export default NoteDataSource;
