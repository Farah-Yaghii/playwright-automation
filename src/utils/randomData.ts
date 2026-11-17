
import { randomUUID } from 'node:crypto';

// Generate a unique email for API authentication
export function generateRandomEmail(): string {

    // Step 1: Generate a random unique value
    const randomValue = randomUUID();

    // Step 2: Create an email using the random value
    const email = `qa-${randomValue}@example.com`;

    // Step 3: Return the generated email
    return email;
}
