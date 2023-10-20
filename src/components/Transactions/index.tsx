import {  useCallback, useState } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams, Transaction } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { ApprovedState, SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, loading } = useCustomFetch()
  

  const handleApprovedChange = (id: Transaction['id'], newApproved: boolean) => {
    setApproved(prev => ({
      ...prev,
      [id]: newApproved  
    }))
  }

 
  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
      
    },
    [fetchWithoutCache]
  )


  const [approved, setApproved] = useState<ApprovedState>(
    () => {
      // Build initial state from transactions
      const initialApproved: { [key: string]: boolean } = {};
      if (transactions) {
        transactions.forEach((t) => {
          initialApproved[t.id] = t.approved;
        });
      }
      return initialApproved;
    }
  );

 
  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }
  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          approved={approved[transaction.id] !== undefined ? approved[transaction.id] : transaction.approved}
          onApprovedChange={handleApprovedChange}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
