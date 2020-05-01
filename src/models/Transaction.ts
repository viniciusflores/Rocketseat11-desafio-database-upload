import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import Category from './Category'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  title: string

  @Column({ type: 'enum', enum: ['income', 'outcome'] })
  type: string

  @Column('integer')
  value: number

  @Column('varchar')
  category_id: string

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Transaction
