import React from 'react';
import { Header } from '../components/organisms';

interface Props {
  component: any;
}

const GERoutes = ({ component: Component }: Props) => {
  return (
    <>
      <Header />

      <Component />
    </>
  );
};

export default GERoutes;
