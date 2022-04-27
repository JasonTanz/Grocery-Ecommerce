import { useQuery } from '@apollo/client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Header, Footer } from '../components/organisms';
import { checkAuth } from '../graphql/auth';
import { LOGOUT } from '../reducers/authSlice';
import jwtDecode from 'jwt-decode';
interface Props {
  component: any;
  header?: boolean;
  footer?: boolean;
  isProtected?: boolean;
  roles?: string;
}

const GERoutes = ({
  footer = true,
  header = true,
  isProtected = false,
  component: Component,
  roles,
  ...rest
}: Props) => {
  const { error, data } = useQuery(checkAuth);
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const decodedToken: any = authState.accessToken
    ? jwtDecode(authState.accessToken)
    : null;
  useEffect(() => {
    const logout = () => {
      dispatch(LOGOUT());
    };

    if (data) {
      return;
    }

    if (error) {
      logout();
    }
  }, [data, dispatch, error]);

  if (isProtected && !authState.isAuthenticated) {
    return <Navigate to="/" />;
  } else if (decodedToken && roles === 'cust' && decodedToken.role !== 'cust') {
    return <Navigate to="/admin/dashboard" />;
  } else if (
    decodedToken &&
    roles === 'admin' &&
    decodedToken.role !== 'admin'
  ) {
    return <Navigate to="/cust/dashboard" />;
  } else {
    return (
      <>
        {header && <Header />}
        <Component {...rest} />
        {footer && <Footer />}
      </>
    );
  }
};

export default GERoutes;
