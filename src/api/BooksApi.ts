
import { APIRequestContext } from '@playwright/test';

export class BooksApi {

    readonly request: APIRequestContext;
    readonly baseURL = 'https://simple-books-api.click';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Step 1: Register a new API client and get a token
    async generateToken(email: string): Promise<string> {

        const response = await this.request.post(
            `${this.baseURL}/api-clients/`,
            {
                data: {
                    clientName: 'QA Automation',
                    clientEmail: email
                }
            }
        );

        // Verify successful client registration
        if (response.status() !== 201) {
            throw new Error(
                `Token generation failed: ${response.status()} - ${await response.text()}`
            );
        }

        // Extract the access token from response
        const responseBody = await response.json();

        return responseBody.accessToken;
    }

    // Step 2: Create a new book order using Bearer Token
    async createOrder(
        token: string,
        bookId: number,
        customerName: string
    ): Promise<{ status: number; orderId: string }> {

        // Send POST request to create a new order
        const response = await this.request.post(
            `${this.baseURL}/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    bookId: bookId,
                    customerName: customerName
                }
            }
        );

        // Read the API response
        const responseBody = await response.json();

        // Return status code and generated order ID
        return {
            status: response.status(),
            orderId: responseBody.orderId
        };
    }

    // Step 3: Fetch an existing order using its ID
    async getOrder(token: string, orderId: string) {

        // Send GET request using Bearer Token
        const response = await this.request.get(
            `${this.baseURL}/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Read response body
        const responseBody = await response.json();

        // Return status code and order details
        return {
            status: response.status(),
            body: responseBody
        };
    }

    // Step 4: Update customer name using PATCH request
    async updateOrder(
        token: string,
        orderId: string,
        customerName: string
    ): Promise<number> {

        // Send PATCH request to update the order
        const response = await this.request.patch(
            `${this.baseURL}/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    customerName: customerName
                }
            }
        );

        // Return HTTP status code
        return response.status();
    }

    // Step 5: Delete an existing order
    async deleteOrder(
        token: string,
        orderId: string
    ): Promise<number> {

        // Send DELETE request using Bearer Token
        const response = await this.request.delete(
            `${this.baseURL}/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Return the HTTP status code
        return response.status();
    }

}

