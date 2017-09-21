import model from '../schema'
const { category } = model

export default class Category {
  static async insert (data) {
    return await category.create(data)
  }
  static async getList() {
    return await category.findAll()
  }
  static async getCount() {
    return await category.count()
  }
  static async update(id, data) {
    const options = { where: { id } }
    return await category.update(data, options)
  }
  static async delete(id) {
    const options = { where: { id }}
    return await category.destroy(options)
  }
}