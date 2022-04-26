import React from 'react';
import { Header } from '../components/organisms';

interface Props {
  component: any;
  header?: boolean;
}

const GERoutes = ({ header = true, component: Component }: Props) => {
  return (
    <>
      {header && <Header />}

      <Component />
    </>
  );
};

export default GERoutes;
