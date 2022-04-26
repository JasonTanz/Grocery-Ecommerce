import React from 'react';
import { Header, Footer } from '../components/organisms';

interface Props {
  component: any;
  header?: boolean;
  footer?: boolean;
}

const GERoutes = ({
  footer = true,
  header = true,
  component: Component,
}: Props) => {
  return (
    <>
      {header && <Header />}
      <Component />
      {footer && <Footer />}
    </>
  );
};

export default GERoutes;
