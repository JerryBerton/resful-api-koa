import model from '../schema'
const { user } = model

export default class User {
  static async findByName (name) {
    let where = { name }
    return await user.findOne({ where })
  }
}