import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Transaction from '../models/Transaction'
import TransactionsRepository from '../repositories/TransactionsRepository'
import Category from '../models/Category'

interface Request {
  title: string
  type: 'income' | 'outcome'
  value: number
  category: Category
}
class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const balance = await transactionsRepository.getBalance()

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Value is bigger than balance')
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category,
    })

    await transactionsRepository.save(transaction)

    return transaction
  }
}

export default CreateTransactionService
