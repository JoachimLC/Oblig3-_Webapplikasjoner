import './App.css';
import type {PropsWithChildren} from 'react';
import Layout from './components/Layout';


type AppProps = PropsWithChildren;

export default function App(props: AppProps) {
  const { children } = props;
  return (

    <Layout>
      {children}
    </Layout>
  );
}