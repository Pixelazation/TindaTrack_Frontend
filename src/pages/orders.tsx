
import { deleteOrder, fetchOrders } from '../api/orders';
import DataManager from '../components/data-manager';
import { orderColumns } from '../components/orders/order-columns';
import OrderForm from '../components/orders/order-form';

export default function Orders() {
  return (
    <DataManager
      addForm={OrderForm}
      deleteItem={deleteOrder}
      fetchItems={fetchOrders}
      columns={orderColumns}
      title="Orders"
      itemName='order'
    />
  )
}