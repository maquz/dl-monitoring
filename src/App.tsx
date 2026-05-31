import { useState } from 'react';
import Login from './components/Login';
import FormApp from './components/FormApp';
import AdminPanel from './components/AdminPanel';

type Role = 'user' | 'admin';

function App() {
  const [role, setRole] = useState<Role | null>(null);

  const handleLogin = (r: Role) => setRole(r);
  const handleLogout = () => setRole(null);

  if (!role) return <Login onLogin={handleLogin} />;
  if (role === 'admin') return <AdminPanel onLogout={handleLogout} />;
  return <FormApp onLogout={handleLogout} />;
}

export default App;
