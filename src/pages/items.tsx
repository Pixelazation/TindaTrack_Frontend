import ItemForm from '../components/items/item-form';
import { deleteItem, fetchItems } from '../api/items';
import { itemColumns } from '../components/items/item-columns';
import DataManager from '../components/data-manager';

export default function Items() {
  return (
    <DataManager
      addForm={ItemForm}
      deleteItem={deleteItem}
      fetchItems={fetchItems}
      columns={itemColumns}
      title="Items"
      itemName='item'
    />
  )
}