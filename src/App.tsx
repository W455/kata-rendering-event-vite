import 'normalize.css';
import { Overview } from './components';
import { ConfigurationContextProvider } from './lib';

export default function App() {
  return (
    <ConfigurationContextProvider>
      <Overview />
    </ConfigurationContextProvider>
  );
}
