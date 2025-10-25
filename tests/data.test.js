import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    boysWeightData,
    girlsWeightData,
    boysLengthData,
    girlsLengthData,
    boysHeadData,
    girlsHeadData,
    loadAllData
} from '../js/data.js';

describe('Data arrays', () => {
    it('should export boysWeightData array', () => {
        expect(Array.isArray(boysWeightData)).toBe(true);
    });

    it('should export girlsWeightData array', () => {
        expect(Array.isArray(girlsWeightData)).toBe(true);
    });

    it('should export boysLengthData array', () => {
        expect(Array.isArray(boysLengthData)).toBe(true);
    });

    it('should export girlsLengthData array', () => {
        expect(Array.isArray(girlsLengthData)).toBe(true);
    });

    it('should export boysHeadData array', () => {
        expect(Array.isArray(boysHeadData)).toBe(true);
    });

    it('should export girlsHeadData array', () => {
        expect(Array.isArray(girlsHeadData)).toBe(true);
    });
});

describe('loadAllData', () => {
    beforeEach(() => {
        // Reset data arrays
        boysWeightData.length = 0;
        girlsWeightData.length = 0;
        boysLengthData.length = 0;
        girlsLengthData.length = 0;
        boysHeadData.length = 0;
        girlsHeadData.length = 0;
    });

    it('should be a function', () => {
        expect(typeof loadAllData).toBe('function');
    });

    it('should return a promise', () => {
        const result = loadAllData();
        expect(result).toBeInstanceOf(Promise);
    });

    it('should load CSV data when successful', async () => {
        // Mock successful fetch
        global.fetch = vi.fn((filename) => {
            const csvData = `Month,L,M,S,2nd (2.3rd),5th,10th,25th,50th,75th,90th,95th,98th (97.7th)
6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832`;

            return Promise.resolve({
                ok: true,
                text: () => Promise.resolve(csvData)
            });
        });

        const result = await loadAllData();

        expect(result).toBe(true);
        expect(boysWeightData.length).toBeGreaterThan(0);
        expect(girlsWeightData.length).toBeGreaterThan(0);
    });

    it('should return false when fetch fails', async () => {
        // Mock failed fetch
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Not Found'
            })
        );

        const result = await loadAllData();

        expect(result).toBe(false);
    });

    it('should handle network errors', async () => {
        // Mock network error
        global.fetch = vi.fn(() =>
            Promise.reject(new Error('Network error'))
        );

        const result = await loadAllData();

        expect(result).toBe(false);
    });

    it('should parse CSV data correctly', async () => {
        // Mock fetch with known CSV data
        const csvData = `Month,L,M,S,2nd (2.3rd),5th,10th,25th,50th,75th,90th,95th,98th (97.7th)
0,0.3487,3.3464,0.14602,2.459312,2.603994,2.757621,3.027282,3.3464,3.686659,4.011499,4.214527,4.419354
6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832`;

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(csvData)
            })
        );

        const result = await loadAllData();

        expect(result).toBe(true);
        expect(boysWeightData[0]).toBeDefined();
        expect(boysWeightData[0][0]).toBe(0); // Age
        expect(boysWeightData[0][1]).toBeCloseTo(0.3487, 4); // L
        expect(boysWeightData[0][2]).toBeCloseTo(3.3464, 4); // M
    });

    it('should skip empty lines in CSV', async () => {
        const csvData = `Month,L,M,S,2nd (2.3rd),5th,10th,25th,50th,75th,90th,95th,98th (97.7th)
0,0.3487,3.3464,0.14602,2.459312,2.603994,2.757621,3.027282,3.3464,3.686659,4.011499,4.214527,4.419354

6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832`;

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(csvData)
            })
        );

        const result = await loadAllData();

        expect(result).toBe(true);
        expect(boysWeightData.length).toBe(2); // Should have 2 rows, not 3
    });

    it('should convert all values to numbers', async () => {
        const csvData = `Month,L,M,S,2nd (2.3rd),5th,10th,25th,50th,75th,90th,95th,98th (97.7th)
6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832`;

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(csvData)
            })
        );

        const result = await loadAllData();

        expect(result).toBe(true);
        expect(typeof boysWeightData[0][0]).toBe('number');
        expect(typeof boysWeightData[0][1]).toBe('number');
        expect(typeof boysWeightData[0][8]).toBe('number'); // 50th percentile
    });

    it('should load all 6 datasets', async () => {
        const csvData = `Month,L,M,S,2nd (2.3rd),5th,10th,25th,50th,75th,90th,95th,98th (97.7th)
6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832`;

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(csvData)
            })
        );

        const result = await loadAllData();

        expect(result).toBe(true);
        expect(boysWeightData.length).toBeGreaterThan(0);
        expect(girlsWeightData.length).toBeGreaterThan(0);
        expect(boysLengthData.length).toBeGreaterThan(0);
        expect(girlsLengthData.length).toBeGreaterThan(0);
        expect(boysHeadData.length).toBeGreaterThan(0);
        expect(girlsHeadData.length).toBeGreaterThan(0);
    });
});
