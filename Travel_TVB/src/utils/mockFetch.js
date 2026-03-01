// src/utils/mockFetch.js
import mockData from './mockData';

export const setupMockFetch = () => {
    const originalFetch = window.fetch;

    window.fetch = async (input, init) => {
        // We only intercept strings indicating the Strapi API
        if (typeof input === 'string' && input.includes('/api/')) {
            // Find matching mock data key by pathname
            const urlObj = new URL(input, window.location.origin);
            let matchedKey = Object.keys(mockData).find(key => urlObj.pathname.includes(key));

            // If no exact match, fallback to returning something at least
            if (!matchedKey && urlObj.pathname.includes('/api/single-posts')) {
                matchedKey = '/api/single-posts';
            } else if (!matchedKey && urlObj.pathname.includes('/api/single-community-posts')) {
                matchedKey = '/api/single-community-posts';
            }

            try {
                // Attempt actual fetch first
                const response = await originalFetch(input, init);

                if (response.ok) {
                    // Sometimes the DB is running but returns empty data array or null object.
                    // Let's clone and read it to be safe, if we want to be highly robust.
                    const clonedResponse = response.clone();
                    const json = await clonedResponse.json();

                    let isEmptyData = false;
                    if (!json || (!json.data)) {
                        isEmptyData = true; // completely malformed
                    } else if (Array.isArray(json.data) && json.data.length === 0) {
                        isEmptyData = true; // empty array collection
                    } else if (typeof json.data === 'object' && Object.keys(json.data).length === 0) {
                        isEmptyData = true; // empty object
                    } else if (json.data === null) {
                        isEmptyData = true; // null data object
                    }

                    if (isEmptyData && matchedKey) {
                        console.log(`[MockFetch] Strapi returned empty data for ${input}. Injecting mock Vietnam content.`);
                        return new Response(JSON.stringify(mockData[matchedKey]), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }

                    return response;
                } else {
                    // Response not OK (e.g. 404, 500) -> Use mock data
                    throw new Error('Not OK');
                }
            } catch (err) {
                // Fetch failed (network error, connection refused, or we threw "Not OK")
                if (matchedKey && mockData[matchedKey]) {
                    console.log(`[MockFetch] Request to ${input} failed. Injecting mock Vietnam content.`);
                    return new Response(JSON.stringify(mockData[matchedKey]), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // If it was a POST request like form submission, just return a generic success
                if (init && init.method === 'POST') {
                    console.log(`[MockFetch] Mocking POST success to ${input}`);
                    return new Response(JSON.stringify({ data: { message: "Mock success" } }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // If we don't have mock data for it, let it fail natively.
                return originalFetch(input, init);
            }
        }

        return originalFetch(input, init);
    };
};
