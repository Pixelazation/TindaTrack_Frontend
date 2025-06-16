import { useEffect, useState } from 'react';
import type { Salesman } from '../types/salesman';
import { fetchSalesmen } from '../api/salesmen';
import { Button } from '../components/ui/button';
import { LucidePlus } from 'lucide-react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import SalesmanForm from '../components/salesmen/salesman-form';

export default function Salesmen() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [salesmen, setSalesmen] = useState<Salesman[]>([]);
  const [editSalesman, setEditSalesman] = useState<Salesman | null>(null);

  async function loadSalesmen() {
    try {
      const data = await fetchSalesmen();
      setSalesmen(data);
    } catch (error) {
      console.error("Failed to fetch salesmen:", error);
    }
  }

  function handleAdd() {
    setEditSalesman(null);
    setOpenForm(true);
  }

  function handleEdit(salesman: Salesman) {
    setEditSalesman(salesman);
    setOpenForm(true);
  }

  function handleDelete(salesman: Salesman) {
    setEditSalesman(salesman);
    setOpenDeleteDialog(true);
  }

  useEffect(() => {
    loadSalesmen();
  }, []);

  useEffect(() => {
    if (!openForm)
      loadSalesmen();
  }, [openForm]);

  return (
    <div className='px-32 py-8'>
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <SalesmanForm closeForm={() => setOpenForm(false)} salesman={editSalesman}/>
        </DialogContent>
      </Dialog>

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Salesmen
        </h1>
        <Button onClick={handleAdd}>
          <LucidePlus /> Add Salesman
        </Button>
      </div>
    </div>
  )
}