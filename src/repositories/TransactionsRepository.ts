import { EntityRepository, Repository } from 'typeorm'

import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let income = 0
    let outcome = 0
    const transactions: Transaction[] = await this.find()
    transactions.map(t => {
      if (t.type === 'income') {
        income += t.value
      } else if (t.type === 'outcome') {
        outcome += t.value
      } else {
        throw Error('Type invalid for transaction')
      }
    })
    const total = income - outcome
    const balance = {
      income,
      outcome,
      total,
    }
    return balance
  }
}

export default TransactionsRepository
