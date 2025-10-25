import { describe, it, expect, beforeAll } from 'vitest';
import {
    percentileToZScore,
    zScoreToPercentile,
    calculateMeasurement,
    calculatePercentile,
    getPercentileDescription
} from '../src/calculations.js';
import {
    boysWeightData,
    girlsWeightData,
    boysLengthData,
    girlsLengthData,
    boysHeadData,
    girlsHeadData
} from '../src/data.js';

// Mock data for testing
beforeAll(() => {
    // Populate mock data arrays with sample values
    // Month 6 data for boys weight
    boysWeightData.push([6, 0.1257, 7.934, 0.10958, 6.352967, 6.611702, 6.885864, 7.366195, 7.934, 8.539707, 9.119041, 9.481939, 9.848832]);

    // Month 6 data for girls weight
    girlsWeightData.push([6, -0.0756, 7.297, 0.12204, 5.729383, 5.97888, 6.246243, 6.72212, 7.297, 7.925102, 8.540297, 8.93289, 9.33549062]);

    // Month 6 data for boys length
    boysLengthData.push([6, 1, 67.6236, 0.03165, 63.34303, 64.10314, 64.88071, 66.18, 67.6236, 69.0672, 70.36649, 71.14406, 71.90417]);

    // Month 6 data for girls length
    girlsLengthData.push([6, 1, 65.7311, 0.03448, 61.1982833, 62.00319, 62.82658, 64.20243, 65.7311, 67.25977, 68.63562, 69.45901, 70.2639167]);

    // Month 6 data for boys head
    boysHeadData.push([6, 1, 43.3306, 0.02817, 40.88935, 41.32285, 41.76631, 42.5073, 43.3306, 44.1539, 44.89489, 45.33835, 45.771846]);

    // Month 6 data for girls head
    girlsHeadData.push([6, 1, 42.1995, 0.03087, 39.5941, 40.05675, 40.53002, 41.32084, 42.1995, 43.07816, 43.86898, 44.34225, 44.8048971]);
});

describe('percentileToZScore', () => {
    it('should convert 50th percentile to z-score ~0', () => {
        const z = percentileToZScore(50);
        expect(z).toBeCloseTo(0, 1);
    });

    it('should convert 2.3rd percentile to z-score ~-2', () => {
        const z = percentileToZScore(2.3);
        expect(z).toBeCloseTo(-2, 0);
    });

    it('should convert 97.7th percentile to z-score ~2', () => {
        const z = percentileToZScore(97.7);
        expect(z).toBeCloseTo(2, 0);
    });

    it('should convert 84th percentile to z-score ~1', () => {
        const z = percentileToZScore(84);
        expect(z).toBeCloseTo(1, 0);
    });

    it('should convert 16th percentile to z-score ~-1', () => {
        const z = percentileToZScore(16);
        expect(z).toBeCloseTo(-1, 0);
    });
});

describe('zScoreToPercentile', () => {
    it('should convert z-score 0 to 50th percentile', () => {
        const p = zScoreToPercentile(0);
        expect(p).toBeCloseTo(50, 0);
    });

    it('should convert z-score -2 to low percentile', () => {
        const p = zScoreToPercentile(-2);
        expect(p).toBeCloseTo(2.3, 0);
    });

    it('should convert z-score 2 to high percentile', () => {
        const p = zScoreToPercentile(2);
        expect(p).toBeCloseTo(97.7, 0);
    });

    it('should convert z-score 1 to ~84th percentile', () => {
        const p = zScoreToPercentile(1);
        expect(p).toBeCloseTo(84, 0);
    });

    it('should clamp values to 1-99 range', () => {
        const pLow = zScoreToPercentile(-10);
        const pHigh = zScoreToPercentile(10);
        expect(pLow).toBeGreaterThanOrEqual(1);
        expect(pHigh).toBeLessThanOrEqual(99);
    });
});

describe('calculateMeasurement', () => {
    it('should calculate weight for 6-month-old boy at 50th percentile', () => {
        const weight = calculateMeasurement(6, 'boy', 50, 'weight');
        expect(weight).toBeCloseTo(7.934, 1);
    });

    it('should calculate weight for 6-month-old girl at 50th percentile', () => {
        const weight = calculateMeasurement(6, 'girl', 50, 'weight');
        expect(weight).toBeCloseTo(7.297, 1);
    });

    it('should calculate length for 6-month-old boy at 50th percentile', () => {
        const length = calculateMeasurement(6, 'boy', 50, 'length');
        expect(length).toBeCloseTo(67.6236, 1);
    });

    it('should calculate length for 6-month-old girl at 50th percentile', () => {
        const length = calculateMeasurement(6, 'girl', 50, 'length');
        expect(length).toBeCloseTo(65.7311, 1);
    });

    it('should calculate head circumference for 6-month-old boy at 50th percentile', () => {
        const head = calculateMeasurement(6, 'boy', 50, 'head');
        expect(head).toBeCloseTo(43.3306, 1);
    });

    it('should throw error for invalid measurement type', () => {
        expect(() => calculateMeasurement(6, 'boy', 50, 'invalid')).toThrow('Invalid measurement type');
    });

    it('should throw error for age not in data', () => {
        expect(() => calculateMeasurement(999, 'boy', 50, 'weight')).toThrow('Age not found in data');
    });

    it('should calculate higher values for higher percentiles', () => {
        const weight25 = calculateMeasurement(6, 'boy', 25, 'weight');
        const weight75 = calculateMeasurement(6, 'boy', 75, 'weight');
        expect(weight75).toBeGreaterThan(weight25);
    });
});

describe('calculatePercentile', () => {
    it('should calculate percentile for 6-month-old boy weighing 7.934 kg as ~50th', () => {
        const percentile = calculatePercentile(6, 'boy', 7.934, 'weight');
        expect(percentile).toBeCloseTo(50, 0);
    });

    it('should calculate percentile for 6-month-old girl weighing 7.297 kg as ~50th', () => {
        const percentile = calculatePercentile(6, 'girl', 7.297, 'weight');
        expect(percentile).toBeCloseTo(50, 0);
    });

    it('should calculate percentile for 6-month-old boy with length 67.6 cm as ~50th', () => {
        const percentile = calculatePercentile(6, 'boy', 67.6, 'length');
        expect(percentile).toBeCloseTo(50, 0);
    });

    it('should return higher percentile for higher measurement', () => {
        const p1 = calculatePercentile(6, 'boy', 7.0, 'weight');
        const p2 = calculatePercentile(6, 'boy', 8.5, 'weight');
        expect(p2).toBeGreaterThan(p1);
    });

    it('should throw error for invalid measurement type', () => {
        expect(() => calculatePercentile(6, 'boy', 7.5, 'invalid')).toThrow('Invalid measurement type');
    });

    it('should throw error for age not in data', () => {
        expect(() => calculatePercentile(999, 'boy', 7.5, 'weight')).toThrow('Age not found in data');
    });
});

describe('getPercentileDescription', () => {
    it('should format 1st percentile correctly', () => {
        expect(getPercentileDescription(1)).toBe('1st percentile');
    });

    it('should format 2nd percentile correctly', () => {
        expect(getPercentileDescription(2)).toBe('2nd percentile');
    });

    it('should format 3rd percentile correctly', () => {
        expect(getPercentileDescription(3)).toBe('3rd percentile');
    });

    it('should format 4th percentile correctly', () => {
        expect(getPercentileDescription(4)).toBe('4th percentile');
    });

    it('should format 11th percentile correctly', () => {
        expect(getPercentileDescription(11)).toBe('11th percentile');
    });

    it('should format 21st percentile correctly', () => {
        expect(getPercentileDescription(21)).toBe('21st percentile');
    });

    it('should format 50th percentile correctly', () => {
        expect(getPercentileDescription(50)).toBe('50th percentile');
    });

    it('should format 99th percentile correctly', () => {
        expect(getPercentileDescription(99)).toBe('99th percentile');
    });

    it('should handle decimal percentiles', () => {
        expect(getPercentileDescription(50.5)).toBe('50th percentile');
    });
});
