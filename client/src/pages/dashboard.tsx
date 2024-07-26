import Navbar from '../components/Navbar';
import PropertyList from '../components/PropertyList';



export default function Dashboard() {


  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen mx-auto max-w-7xl p-4">
        <PropertyList />

 
      </main>
    </>
  );
}

export { Dashboard };
