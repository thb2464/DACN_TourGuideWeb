import { setupMockFetch } from './mockFetch';

// We need to mock the mockData module
vi.mock('./mockData', () => ({
  default: {
    '/api/faq': { data: { questions: [{ q: 'What?', a: 'Answer' }] } },
    '/api/tours': { data: [{ id: 1, Tour_Name: 'Mock Tour' }] },
  },
}));

describe('setupMockFetch', () => {
  let originalFetch;

  beforeEach(() => {
    // Save and mock the original fetch
    originalFetch = vi.fn();
    window.fetch = originalFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should replace window.fetch', () => {
    const before = window.fetch;
    setupMockFetch();
    expect(window.fetch).not.toBe(before);
  });

  it('should pass through non-API requests to original fetch', async () => {
    originalFetch.mockResolvedValue({ ok: true });
    setupMockFetch();

    await window.fetch('https://example.com/images/photo.jpg');
    expect(originalFetch).toHaveBeenCalledWith('https://example.com/images/photo.jpg', undefined);
  });

  it('should return mock data when real fetch fails and mock key matches', async () => {
    originalFetch.mockRejectedValue(new Error('Network error'));
    setupMockFetch();

    const response = await window.fetch('http://localhost:1337/api/faq?populate=*');
    const json = await response.json();

    expect(json.data.questions).toBeDefined();
    expect(json.data.questions.length).toBeGreaterThan(0);
  });

  it('should return real data when fetch succeeds with non-empty data', async () => {
    const realData = { data: { id: 1, title: 'Real Data' } };
    originalFetch.mockResolvedValue({
      ok: true,
      clone: () => ({
        json: () => Promise.resolve(realData),
      }),
    });
    setupMockFetch();

    const response = await window.fetch('http://localhost:1337/api/faq');
    // The original successful response should be returned
    expect(response.ok).toBe(true);
  });

  it('should return mock POST success when POST request fails and no mock key', async () => {
    originalFetch.mockRejectedValue(new Error('Network error'));
    setupMockFetch();

    const response = await window.fetch('http://localhost:1337/api/unknown-endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    });
    const json = await response.json();

    expect(json.data.message).toBe('Mock success');
  });
});
