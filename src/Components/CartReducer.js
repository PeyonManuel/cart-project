import Axios from 'axios';

const calctotal = (phones) => {
    let totalprice = 0;
    phones.forEach((phone) => {
        totalprice += phone.price * phone.quantity;
    });
    return Math.round(totalprice * 100) / 100;
};

const CartReducer = (state, action) => {
    let newPhones = state.phones;
    switch (action.type) {
        case 'FETCHSUCCESFUL':
            return {
                phones: action.payload,
                loading: false,
                error: '',
                total: calctotal(action.payload),
            };
        case 'FETCHERROR':
            return {
                phones: action.payload,
                loading: false,
                error: 'Something went wrong',
                total: 0,
            };
        case 'QUANTITYUP':
            newPhones = state.phones.map((phone) => {
                return phone._id !== action.payload
                    ? phone
                    : { ...phone, quantity: phone.quantity + 1 };
            });
            const newPhoneU = newPhones.find(
                (phone) => phone._id === action.payload
            );
            const oldPhoneU = state.phones.find(
                (phone) => phone._id === action.payload
            );
            if (newPhoneU.quantity !== oldPhoneU.quantity) {
                Axios.post(
                    'http://localhost:5000/phones/update/' + newPhoneU._id,
                    newPhoneU
                ).then((res) => console.log(res.data));
            }
            return {
                ...state,
                phones: newPhones,
                total: calctotal(newPhones),
            };
        case 'QUANTITYDOWN':
            newPhones = state.phones.map((phone) => {
                return phone._id !== action.payload
                    ? phone
                    : phone.quantity - 1 > 0
                    ? { ...phone, quantity: phone.quantity - 1 }
                    : phone;
            });
            const newPhoneD = newPhones.find(
                (phone) => phone._id === action.payload
            );
            const oldPhoneD = state.phones.find(
                (phone) => phone._id === action.payload
            );
            if (newPhoneD.quantity !== oldPhoneD.quantity) {
                Axios.post(
                    'http://localhost:5000/phones/update/' + newPhoneD._id,
                    newPhoneD
                ).then((res) => console.log(res.data));
            }
            return {
                ...state,
                phones: newPhones,
                total: calctotal(newPhones),
            };
        case 'REMOVEPHONE':
            newPhones = state.phones.filter(
                (phone) => phone._id !== action.payload
            );
            Axios.delete(
                'http://localhost:5000/phones/' + action.payload
            ).then((res) => console.log(res.data));
            return {
                ...state,
                phones: newPhones,
                total: calctotal(newPhones),
            };
        case 'CLEARCART':
            return {
                ...state,
                phones: [],
                total: calctotal([]),
            };
        case 'SUMTOTAL':
            return {
                ...state,
                total: calctotal(state.phones),
            };
        default:
            break;
    }
};

export default CartReducer;
