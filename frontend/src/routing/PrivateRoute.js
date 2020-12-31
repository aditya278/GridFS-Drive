import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

const PrivateRoute = ({element : Element, auth : {isAuthenticated, loading}}) => {
    return (
        loading ? (<Spinner />) : isAuthenticated ? (<Element />) : <Navigate to='/login' />
    )
}

const mapStateToProps = (state) => ({auth : state.auth});
export default connect(mapStateToProps)(PrivateRoute);