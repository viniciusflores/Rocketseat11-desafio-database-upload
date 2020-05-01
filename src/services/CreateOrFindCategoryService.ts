import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Category from '../models/Category'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface Request {
  title: string
}
class CreateOrFindCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository)

    const category = await categoriesRepository.findOne({
      where: { title },
    })

    if (!category) {
      const newCategory = categoriesRepository.create({
        title,
      })

      await categoriesRepository.save(newCategory)

      return newCategory
    }

    return category
  }
}

export default CreateOrFindCategoryService
