import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test/test-utils';
import Tours from './Tours';

// Mock useLanguage
vi.mock('../../context/LanguageContext', () => ({
  useLanguage: vi.fn(() => ({
    currentLanguage: { code: 'en', name: 'English', flag: '🇺🇸' },
  })),
  LanguageProvider: ({ children }) => children,
}));

// Mock AnimateOnScroll to just render children
vi.mock('../../components/AnimateOnScroll/AnimateOnScroll', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

// Mock TourCard component
vi.mock('../../components/TourCard/TourCard', () => ({
  default: ({ tour }) => <div data-testid="tour-card">{tour.Tour_Name}</div>,
}));

// Mock PriceRangeSlider
vi.mock('../../components/PriceRangeSlider/PriceRangeSlider', () => ({
  default: () => <div data-testid="price-slider">Price Slider</div>,
}));

describe('Tours page', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show loading state initially', () => {
    global.fetch.mockReturnValue(new Promise(() => {})); // Never resolves
    renderWithRouter(<Tours />);
    expect(screen.getByText('Loading tours...')).toBeInTheDocument();
  });

  it('should render tour cards after successful fetch', async () => {
    const mockTours = [
      { id: 1, Tour_Name: 'Ha Long Bay', Price: '5000000', Region: 'MienBac', slug: 'ha-long', Rating: 4.5, Review_Count: 10 },
      { id: 2, Tour_Name: 'Da Lat', Price: '3000000', Region: 'TayNguyen', slug: 'da-lat', Rating: 4.2, Review_Count: 5 },
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: mockTours,
        meta: { pagination: { page: 1, pageCount: 1, pageSize: 9, total: 2 } },
      }),
    });

    renderWithRouter(<Tours />);

    await waitFor(() => {
      expect(screen.queryByText('Loading tours...')).not.toBeInTheDocument();
    });

    expect(screen.getAllByTestId('tour-card')).toHaveLength(2);
    expect(screen.getByText('Ha Long Bay')).toBeInTheDocument();
    expect(screen.getByText('Da Lat')).toBeInTheDocument();
  });

  it('should show "No tours found" for empty results', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: [],
        meta: { pagination: { page: 1, pageCount: 0, pageSize: 9, total: 0 } },
      }),
    });

    renderWithRouter(<Tours />);

    await waitFor(() => {
      expect(screen.getByText('No tours found.')).toBeInTheDocument();
    });
  });

  it('should show error message on fetch failure', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    renderWithRouter(<Tours />);

    await waitFor(() => {
      expect(screen.getByText('Could not load tours.')).toBeInTheDocument();
    });
  });
});

// --- Test generatePaginationItems (extracted logic) ---

describe('generatePaginationItems', () => {
  // Re-implement the function for isolated testing since it's not exported
  const generatePaginationItems = (currentPage, totalPages) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const items = [1];
    if (currentPage > 3) items.push('...');
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) items.push(i);
    if (currentPage < totalPages - 2) items.push('...');
    items.push(totalPages);
    return items;
  };

  it('should return [1, 2, 3] for totalPages=3', () => {
    expect(generatePaginationItems(1, 3)).toEqual([1, 2, 3]);
  });

  it('should return [1, 2, 3, 4, 5] for totalPages=5', () => {
    expect(generatePaginationItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should include ellipsis for large page count', () => {
    const result = generatePaginationItems(5, 10);
    expect(result).toContain('...');
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(10);
  });

  it('should show correct range around current page', () => {
    const result = generatePaginationItems(5, 10);
    expect(result).toContain(4);
    expect(result).toContain(5);
    expect(result).toContain(6);
  });
});
