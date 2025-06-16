import { Outlet } from 'react-router';
import NavBar from '../components/nav-bar';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className='p-4'>
        <Outlet />
      </main>
    </>
  );
}