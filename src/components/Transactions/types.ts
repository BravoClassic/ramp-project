import { FunctionComponent } from "react"
import { Transaction } from "../../utils/types"
// import exp from "constants"

export type SetTransactionApprovalFunction = (params: {
  transactionId: string
  newValue: boolean
}) => Promise<void>

export type setTransactionStateFunction = (params: {
  transactionId: string
  newValue: boolean
}) => Promise<void>
export type ApprovedState = {
  [id: Transaction['id']]: boolean
};
type TransactionsProps = { transactions: Transaction[] | null }

type TransactionPaneProps = {
  onApprovedChange: (transactionId: string, newValue: boolean) => void
  transaction: Transaction
  loading: boolean
  approved?: boolean
  setTransactionApproval: SetTransactionApprovalFunction
}

export type TransactionsComponent = FunctionComponent<TransactionsProps>
export type TransactionPaneComponent = FunctionComponent<TransactionPaneProps>
