import { deleteSalesman, fetchSalesmen } from '../api/salesmen';
import DataManager from '../components/data-manager';
import { salesmanColumns } from '../components/salesmen/salesman-columns';
import SalesmanForm from '../components/salesmen/salesman-form';

export default function Salesmen() {
  return (
    <DataManager
      addForm={SalesmanForm}
      deleteItem={deleteSalesman}
      fetchItems={fetchSalesmen}
      columns={salesmanColumns}
      title="Salesmen"
      itemName='salesman'
    />
  )
}