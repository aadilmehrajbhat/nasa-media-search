import { Header } from '@components';

function Main({ children }) {
  return (
    <main className="bg-gray-700 text-white min-h-screen">
      <Header />
      {children}
    </main>
  );
}

export default Main;
