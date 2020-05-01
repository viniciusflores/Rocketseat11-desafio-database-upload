import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'
import CreateOrFindCategoryService from '../services/CreateOrFindCategoryService'
import DeleteTransactionService from '../services/DeleteTransactionService'
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router()

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.find()
  const balance = await transactionsRepository.getBalance()
  return response.json({ transactions, balance })
})

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body

  const createOrFindCategoryService = new CreateOrFindCategoryService()
  const createTransactionService = new CreateTransactionService()

  const categoryObj = await createOrFindCategoryService.execute({
    title: category,
  })

  const transaction = await createTransactionService.execute({
    title,
    type,
    value,
    category: categoryObj,
  })

  return response.json(transaction)
})

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const deleteTransactionService = new DeleteTransactionService()
  await deleteTransactionService.execute({ id })
  return response.status(204).json()
})

transactionsRouter.post('/import', async (request, response) => {
  // TODO
})

export default transactionsRouter
