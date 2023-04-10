import {  StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuhtProvider } from './src/contexts/AuthContext';
import {NetworkInfo} from 'react-native-network-info';





export default function App() {
  

  return (
    <NavigationContainer>
      <AuhtProvider>
        <StatusBar backgroundColor={"#1d1d2e"} barStyle={'light-content'} translucent={false}/>
        <Routes/>
      </AuhtProvider>
    </NavigationContainer>
  );
}
