#!/usr/bin/env node

/**
 * Index Tours Script
 *
 * Fetches all tours from the Strapi REST API (all locales),
 * chunks them into digestible pieces, and upserts embeddings into ChromaDB.
 *
 * Usage:
 *   cd Travel_TVB_Server
 *   node src/api/chatbot/scripts/indexTours.js
 *
 * Prerequisites:
 *   - Strapi server running (or accessible at STRAPI_URL)
 *   - ChromaDB running (default: http://localhost:8000)
 *   - GEMINI_API_KEY set in .env
 */

require('dotenv').config();

const vectorStore = require('../services/vectorStore');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const LOCALES = ['vi', 'en', 'zh'];

/**
 * Extract plain text from Strapi "blocks" (rich text) field.
 */
function blocksToText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map((child) => child.text || '').join('');
      }
      if (block.type === 'heading' && block.children) {
        return block.children.map((child) => child.text || '').join('');
      }
      if (block.type === 'list' && block.children) {
        return block.children
          .map((item) => {
            if (item.children) {
              return '- ' + item.children.map((c) => c.text || '').join('');
            }
            return '';
          })
          .join('\n');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');
}

/**
 * Extract highlights text from repeatable component.
 */
function highlightsToText(highlights) {
  if (!highlights || !Array.isArray(highlights)) return '';

  return highlights
    .map((h, i) => {
      const title = h.Title || h.title || '';
      const desc = h.Description || h.description || '';
      return `${i + 1}. ${title}${desc ? ': ' + desc : ''}`;
    })
    .filter(Boolean)
    .join('\n');
}

/**
 * Format price with thousand separators.
 */
function formatPrice(price) {
  if (!price) return 'N/A';
  return new Intl.NumberFormat('vi-VN').format(parseInt(price)) + ' VND';
}

/**
 * Create chunks from a single tour.
 * Each chunk is a digestible piece of text with metadata.
 */
function createTourChunks(tour, language) {
  const chunks = [];
  const baseMetadata = {
    tourId: String(tour.id || tour.documentId || ''),
    tourSlug: tour.slug || '',
    tourName: tour.Tour_Name || '',
    language: language,
    price: tour.Price ? formatPrice(tour.Price) : 'N/A',
    location: tour.Location || '',
    duration: `${tour.Duration_Days || '?'}N${tour.Duration_Nights || '?'}D`,
    region: tour.Region || '',
  };

  // Chunk 1: Overview (always created)
  const overviewParts = [
    `Tour: ${tour.Tour_Name || 'Unnamed Tour'}`,
    tour.Short_Description ? `Description: ${tour.Short_Description}` : '',
    tour.Location ? `Location: ${tour.Location}` : '',
    tour.Departure_Location ? `Departure: ${tour.Departure_Location}` : '',
    tour.Duration_Days ? `Duration: ${tour.Duration_Days} days, ${tour.Duration_Nights || 0} nights` : '',
    tour.Price ? `Price: ${formatPrice(tour.Price)}` : '',
    tour.Original_Price && parseInt(tour.Original_Price) > parseInt(tour.Price)
      ? `Original Price: ${formatPrice(tour.Original_Price)} (discounted!)`
      : '',
    tour.Child_Price ? `Child Price: ${formatPrice(tour.Child_Price)}` : '',
    tour.Rating ? `Rating: ${tour.Rating}/5 (${tour.Review_Count || 0} reviews)` : '',
    tour.Region ? `Region: ${tour.Region}` : '',
    tour.Transport_Type ? `Transport: ${tour.Transport_Type}` : '',
    tour.Max_Participants ? `Max Participants: ${tour.Max_Participants}` : '',
    tour.Is_Featured ? 'Featured Tour: Yes' : '',
  ].filter(Boolean);

  chunks.push({
    id: `${language}-${tour.slug}-overview`,
    content: overviewParts.join('\n'),
    metadata: { ...baseMetadata, chunkType: 'overview' },
  });

  // Chunk 2: Full description (if exists)
  const descText = blocksToText(tour.Description);
  if (descText && descText.length > 20) {
    // If description is very long, split into sub-chunks
    if (descText.length > 1500) {
      const midPoint = descText.indexOf('\n', Math.floor(descText.length / 2));
      const splitAt = midPoint > 0 ? midPoint : Math.floor(descText.length / 2);

      chunks.push({
        id: `${language}-${tour.slug}-description-1`,
        content: `Tour: ${tour.Tour_Name}\nDescription (Part 1):\n${descText.substring(0, splitAt)}`,
        metadata: { ...baseMetadata, chunkType: 'description' },
      });
      chunks.push({
        id: `${language}-${tour.slug}-description-2`,
        content: `Tour: ${tour.Tour_Name}\nDescription (Part 2):\n${descText.substring(splitAt)}`,
        metadata: { ...baseMetadata, chunkType: 'description' },
      });
    } else {
      chunks.push({
        id: `${language}-${tour.slug}-description`,
        content: `Tour: ${tour.Tour_Name}\nDescription:\n${descText}`,
        metadata: { ...baseMetadata, chunkType: 'description' },
      });
    }
  }

  // Chunk 3: Highlights (if exists)
  const highlightsText = highlightsToText(tour.Highlights);
  if (highlightsText && highlightsText.length > 10) {
    chunks.push({
      id: `${language}-${tour.slug}-highlights`,
      content: `Tour: ${tour.Tour_Name}\nHighlights:\n${highlightsText}`,
      metadata: { ...baseMetadata, chunkType: 'highlights' },
    });
  }

  // Chunk 4: Itinerary (if exists)
  const itineraryText = blocksToText(tour.Itinerary);
  if (itineraryText && itineraryText.length > 20) {
    // Split long itineraries
    if (itineraryText.length > 1500) {
      const midPoint = itineraryText.indexOf('\n', Math.floor(itineraryText.length / 2));
      const splitAt = midPoint > 0 ? midPoint : Math.floor(itineraryText.length / 2);

      chunks.push({
        id: `${language}-${tour.slug}-itinerary-1`,
        content: `Tour: ${tour.Tour_Name}\nItinerary (Part 1):\n${itineraryText.substring(0, splitAt)}`,
        metadata: { ...baseMetadata, chunkType: 'itinerary' },
      });
      chunks.push({
        id: `${language}-${tour.slug}-itinerary-2`,
        content: `Tour: ${tour.Tour_Name}\nItinerary (Part 2):\n${itineraryText.substring(splitAt)}`,
        metadata: { ...baseMetadata, chunkType: 'itinerary' },
      });
    } else {
      chunks.push({
        id: `${language}-${tour.slug}-itinerary`,
        content: `Tour: ${tour.Tour_Name}\nItinerary:\n${itineraryText}`,
        metadata: { ...baseMetadata, chunkType: 'itinerary' },
      });
    }
  }

  return chunks;
}

/**
 * Fetch all tours for a given locale from Strapi.
 */
async function fetchToursForLocale(locale) {
  // Only populate relations and components — blocks fields (Description, Itinerary)
  // are returned by default in Strapi 5 and cause 400 if you try to populate them.
  const populateQuery = [
    'populate[Highlights]=true',
    'populate[tour_category]=true',
  ].join('&');

  const paginationQuery = 'pagination[pageSize]=100';
  const url = `${STRAPI_URL}/api/tours?${populateQuery}&${paginationQuery}&locale=${locale}`;

  console.log(`[Indexer] Fetching tours for locale '${locale}' from: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Failed to fetch tours for locale ${locale}: ${response.status} ${response.statusText}\n${errorBody}`);
  }

  const json = await response.json();
  return json.data || [];
}

/**
 * Main indexing function.
 */
async function indexAllTours() {
  console.log('=== Tour Indexing Script ===');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`ChromaDB URL: ${process.env.CHROMADB_URL || 'http://localhost:8000'}`);
  console.log(`Locales: ${LOCALES.join(', ')}`);
  console.log('');

  // Initialize vector store
  await vectorStore.initialize();

  // Clear existing data for clean re-index
  console.log('[Indexer] Clearing existing collection...');
  await vectorStore.clearCollection();

  let totalTours = 0;
  let totalChunks = 0;
  const allChunks = [];

  // Fetch and chunk tours for each locale
  for (const locale of LOCALES) {
    try {
      const tours = await fetchToursForLocale(locale);
      console.log(`[Indexer] Found ${tours.length} tours for locale '${locale}'`);

      for (const tour of tours) {
        const chunks = createTourChunks(tour, locale);
        allChunks.push(...chunks);
        console.log(`  - ${tour.Tour_Name || tour.slug}: ${chunks.length} chunks`);
      }

      totalTours += tours.length;
    } catch (err) {
      console.error(`[Indexer] Error fetching tours for locale '${locale}':`, err.message);
    }
  }

  // Upsert all chunks into ChromaDB
  if (allChunks.length > 0) {
    console.log(`\n[Indexer] Upserting ${allChunks.length} chunks into ChromaDB...`);
    totalChunks = await vectorStore.addDocuments(allChunks);
  }

  console.log('\n=== Indexing Complete ===');
  console.log(`Indexed ${totalTours} tours, ${totalChunks} chunks total`);
  console.log(`Locales processed: ${LOCALES.join(', ')}`);
}

// Run the script
indexAllTours()
  .then(() => {
    console.log('\nDone! You can now use the chatbot.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFatal error during indexing:', err);
    process.exit(1);
  });
