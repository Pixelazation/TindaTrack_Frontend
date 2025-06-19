import { deleteAccount, fetchAccounts } from '../api/accounts';
import { accountColumns } from '../components/accounts/account-columns';
import AccountForm from '../components/accounts/account-form';
import DataManager from '../components/data-manager';

export default function Accounts() {
  return (
    <DataManager
      addForm={AccountForm}
      deleteItem={deleteAccount}
      fetchItems={fetchAccounts}
      columns={accountColumns}
      title="Accounts"
      itemName='account'
    />
  )
}