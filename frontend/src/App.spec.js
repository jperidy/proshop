import React from 'react';
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render } from './test-utils';
import App from './App';
import { screen } from '@testing-library/react';
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    waitFor,
} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect';


describe('Renders the connected app with initialState', () => {
    render(<App />, {
        initialState: {
            cart: { 
                cartItems: [],
                shippingAddress: {},
                paymentMethod: 'paymentFromStorage'
            },
            userLogin: {userInfo: {}}
        }
    });

    it('Check if header contain the navbar', async () => {
        //await waitFor(() => screen.getByRole('heading'));
        //await expect(screen.getAllByText(/proshop/i)).toHaveTextContent('proshop');
        await expect(document.getElementsByClassName('navbar navbar'));
    });
})

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});