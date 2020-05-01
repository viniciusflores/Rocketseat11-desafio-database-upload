import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'
import AppError from '../errors/AppError'

interface Request {
  id: string
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const transaction = await transactionsRepository.find({
      id,
    })

    if (!transaction || transaction.length <= 0) {
      throw new AppError('transaction not found')
    }

    await transactionsRepository.remove(transaction)
  }
}

export default DeleteTransactionService
