
import { test, expect } from '@playwright/test';
import { BooksApi } from '../../src/api/BooksApi';
import { generateRandomEmail } from '../../src/utils/randomData';

test('TC_API_001 - Authenticate and Create Book Order',
    async ({ request }) => {

        // Step 1: Create an instance of BooksApi
        const booksApi = new BooksApi(request);

        // Step 2: Generate a unique email
        const email = generateRandomEmail();

        // Step 3: Generate Bearer Token
        const token = await booksApi.generateToken(email);

        // Verify token is returned
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');

        // Step 4: Prepare order data
        const bookId = 1;
        const customerName = 'QA Automation User';

        // Step 5: Create a new book order
        const result = await booksApi.createOrder(
            token,
            bookId,
            customerName
        );

        // Step 6: Verify 201 Created status code
        expect(result.status).toBe(201);

        // Step 7: Verify a valid order ID is returned
        expect(result.orderId).toBeTruthy();
        expect(typeof result.orderId).toBe('string');

        // Print order details in terminal
        console.log('Order created successfully');
        console.log('Order ID:', result.orderId);
    });
// TC_API_002 - Fetch Created Book Order

test('TC_API_002 - Fetch Created Book Order',
    async ({ request }) => {

        // Step 1: Create an instance of BooksApi
        const booksApi = new BooksApi(request);

        // Step 2: Generate a unique email
        const email = generateRandomEmail();

        // Step 3: Generate Bearer Token
        const token = await booksApi.generateToken(email);

        // Step 4: Prepare test data
        const bookId = 1;
        const customerName = 'QA Automation User';

        // Step 5: Create a new order to get a dynamic Order ID
        const createdOrder = await booksApi.createOrder(
            token,
            bookId,
            customerName
        );

        // Verify order creation
        expect(createdOrder.status).toBe(201);
        expect(createdOrder.orderId).toBeTruthy();

        // Step 6: Fetch the created order using GET request
        const result = await booksApi.getOrder(
            token,
            createdOrder.orderId
        );

        // Step 7: Verify 200 OK status code
        expect(result.status).toBe(200);

        // Step 8: Verify order details match submitted data
        expect(result.body.id).toBe(createdOrder.orderId);
        expect(result.body.bookId).toBe(bookId);
        expect(result.body.customerName).toBe(customerName);

        // Print order details in terminal
        console.log('Order fetched successfully');
        console.log('Order ID:', result.body.id);
        console.log('Book ID:', result.body.bookId);
        console.log('Customer Name:', result.body.customerName);
    });


test('TC_API_003 - Update Customer Name',
    async ({ request }) => {

        // Step 1: Initialize Books API
        const booksApi = new BooksApi(request);

        // Step 2: Generate unique email and Bearer Token
        const email = generateRandomEmail();
        const token = await booksApi.generateToken(email);

        // Step 3: Create a new order
        const bookId = 1;
        const originalName = 'QA Automation User';

        const createdOrder = await booksApi.createOrder(
            token,
            bookId,
            originalName
        );

        // Verify order created successfully
        expect(createdOrder.status).toBe(201);
        expect(createdOrder.orderId).toBeTruthy();

        // Step 4: Update customer name using PATCH
        const updatedName = 'Updated QA User';

        const updateStatus = await booksApi.updateOrder(
            token,
            createdOrder.orderId,
            updatedName
        );

        // Step 5: Verify 204 No Content
        expect(updateStatus).toBe(204);

        // Step 6: Fetch updated order using GET
        const updatedOrder = await booksApi.getOrder(
            token,
            createdOrder.orderId
        );

        // Step 7: Verify 200 OK
        expect(updatedOrder.status).toBe(200);

        // Step 8: Verify customer name was updated
        expect(updatedOrder.body.customerName).toBe(updatedName);

        // Print results in terminal
        console.log('Original Name:', originalName);
        console.log('Updated Name:', updatedOrder.body.customerName);
        console.log('Order updated successfully');
    });

test('TC_API_004 - Delete Order and Verify 404',
    async ({ request }) => {

        // Step 1: Initialize Books API
        const booksApi = new BooksApi(request);

        // Step 2: Generate unique email and Bearer Token
        const email = generateRandomEmail();
        const token = await booksApi.generateToken(email);

        // Step 3: Create a new order
        const bookId = 1;
        const customerName = 'QA Automation User';

        const createdOrder = await booksApi.createOrder(
            token,
            bookId,
            customerName
        );

        // Verify order created successfully
        expect(createdOrder.status).toBe(201);
        expect(createdOrder.orderId).toBeTruthy();

        // Step 4: Delete the created order
        const deleteStatus = await booksApi.deleteOrder(
            token,
            createdOrder.orderId
        );

        // Step 5: Verify 204 No Content
        expect(deleteStatus).toBe(204);

        // Step 6: Send GET request after deletion
        const response = await request.get(
            `https://simple-books-api.click/orders/${createdOrder.orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Step 7: Verify 404 Not Found
        expect(response.status()).toBe(404);

        // Print result in terminal
        console.log('Order ID:', createdOrder.orderId);
        console.log('Delete Status:', deleteStatus);
        console.log('GET After Delete:', response.status());
        console.log('Order deleted successfully');
    });
