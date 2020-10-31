import React from 'react';
import Header from './header';
import CartReducer from './CartReducer';
import Axios from 'axios';
import './Cart.css';

const defaultState = {
    phones: [],
    loading: true,
    error: '',
    total: 0,
};

const Cart = () => {
    const [state, dispatch] = React.useReducer(CartReducer, defaultState);
    const ammount = state.phones.reduce((a, b) => {
        return a + b.quantity;
    }, 0);
    React.useEffect(() => {
        Axios.get('http://localhost:5000/phones/')
            .then((response) => {
                dispatch({ type: 'FETCHSUCCESFUL', payload: response.data });
            })
            .catch(() => dispatch({ type: 'FETCHERROR' }));
        dispatch({ type: 'SUMTOTAL' });
    }, []);
    if (state.loading) return <h1>Loading...</h1>;
    return (
        <>
            <Header ammount={ammount} />
            <h1>Your bag</h1>
            <div className='cart-container'>
                {state.phones.map((phone) => {
                    const { img, name, price, _id, quantity } = phone;
                    return (
                        <article className='phone-container' key={_id}>
                            <img
                                src={img}
                                style={{ width: '80px' }}
                                alt='phone'
                            />
                            <div className='phone-title'>
                                <h4 className='phonename'>{name}</h4>
                                <p className='phoneprice'>{price}</p>
                                <button
                                    className='removebtn'
                                    onClick={() =>
                                        dispatch({
                                            type: 'REMOVEPHONE',
                                            payload: _id,
                                        })
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                            <div>
                                <button
                                    className='arrowbtn'
                                    onClick={() =>
                                        dispatch({
                                            type: 'QUANTITYUP',
                                            payload: _id,
                                        })
                                    }
                                >
                                    <i className='fas fa-angle-up'></i>
                                </button>
                                <p style={{ margin: '0px' }}>{quantity}</p>
                                <button
                                    className='arrowbtn'
                                    onClick={() =>
                                        dispatch({
                                            type: 'QUANTITYDOWN',
                                            payload: _id,
                                        })
                                    }
                                >
                                    <i className='fas fa-angle-down'></i>
                                </button>
                            </div>
                        </article>
                    );
                })}
                {state.phones.length > 0 ? (
                    <>
                        <div className='total-container'>
                            <h4>Total</h4>
                            <h4>${state.total}</h4>
                        </div>

                        <button
                            className='clearbtn'
                            onClick={() => dispatch({ type: 'CLEARCART' })}
                        >
                            Clear cart
                        </button>
                    </>
                ) : (
                    <h2>is currently empty</h2>
                )}
            </div>
        </>
    );
};

export default Cart;
