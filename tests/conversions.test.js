import { describe, it, expect } from 'vitest';
import {
    kgToLbs,
    lbsToKg,
    cmToInches,
    inchesToCm,
    lbsToLbsOz,
    formatWeight,
    formatLength,
    formatHeadCircumference
} from '../js/conversions.js';

describe('kgToLbs', () => {
    it('should convert 1 kg to ~2.20 lbs', () => {
        expect(kgToLbs(1)).toBeCloseTo(2.20, 2);
    });

    it('should convert 10 kg to ~22.05 lbs', () => {
        expect(kgToLbs(10)).toBeCloseTo(22.05, 2);
    });

    it('should convert 7.5 kg to ~16.53 lbs', () => {
        expect(kgToLbs(7.5)).toBeCloseTo(16.53, 2);
    });

    it('should handle 0 kg', () => {
        expect(kgToLbs(0)).toBe(0);
    });

    it('should round to 2 decimal places', () => {
        const result = kgToLbs(3.456);
        expect(result.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
});

describe('lbsToKg', () => {
    it('should convert 2.20 lbs to ~1 kg', () => {
        expect(lbsToKg(2.20)).toBeCloseTo(1, 2);
    });

    it('should convert 22.05 lbs to ~10 kg', () => {
        expect(lbsToKg(22.05)).toBeCloseTo(10, 2);
    });

    it('should convert 16.53 lbs to ~7.5 kg', () => {
        expect(lbsToKg(16.53)).toBeCloseTo(7.5, 2);
    });

    it('should handle 0 lbs', () => {
        expect(lbsToKg(0)).toBe(0);
    });

    it('should be inverse of kgToLbs', () => {
        const originalKg = 8.5;
        const lbs = kgToLbs(originalKg);
        const backToKg = lbsToKg(lbs);
        expect(backToKg).toBeCloseTo(originalKg, 1);
    });
});

describe('cmToInches', () => {
    it('should convert 2.54 cm to 1 inch', () => {
        expect(cmToInches(2.54)).toBeCloseTo(1, 2);
    });

    it('should convert 100 cm to ~39.37 inches', () => {
        expect(cmToInches(100)).toBeCloseTo(39.37, 2);
    });

    it('should convert 67.6 cm to ~26.61 inches', () => {
        expect(cmToInches(67.6)).toBeCloseTo(26.61, 2);
    });

    it('should handle 0 cm', () => {
        expect(cmToInches(0)).toBe(0);
    });

    it('should round to 2 decimal places', () => {
        const result = cmToInches(45.678);
        expect(result.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
});

describe('inchesToCm', () => {
    it('should convert 1 inch to 2.54 cm', () => {
        expect(inchesToCm(1)).toBeCloseTo(2.54, 2);
    });

    it('should convert 39.37 inches to ~100 cm', () => {
        expect(inchesToCm(39.37)).toBeCloseTo(100, 2);
    });

    it('should handle 0 inches', () => {
        expect(inchesToCm(0)).toBe(0);
    });

    it('should be inverse of cmToInches', () => {
        const originalCm = 65.5;
        const inches = cmToInches(originalCm);
        const backToCm = inchesToCm(inches);
        expect(backToCm).toBeCloseTo(originalCm, 1);
    });
});

describe('lbsToLbsOz', () => {
    it('should convert 10 lbs to 10 lbs 0 oz', () => {
        const result = lbsToLbsOz(10);
        expect(result.pounds).toBe(10);
        expect(result.ounces).toBe(0);
    });

    it('should convert 10.5 lbs to 10 lbs 8 oz', () => {
        const result = lbsToLbsOz(10.5);
        expect(result.pounds).toBe(10);
        expect(result.ounces).toBe(8);
    });

    it('should convert 7.25 lbs to 7 lbs 4 oz', () => {
        const result = lbsToLbsOz(7.25);
        expect(result.pounds).toBe(7);
        expect(result.ounces).toBe(4);
    });

    it('should convert 8.75 lbs to 8 lbs 12 oz', () => {
        const result = lbsToLbsOz(8.75);
        expect(result.pounds).toBe(8);
        expect(result.ounces).toBe(12);
    });

    it('should handle 0 lbs', () => {
        const result = lbsToLbsOz(0);
        expect(result.pounds).toBe(0);
        expect(result.ounces).toBe(0);
    });

    it('should round ounces to nearest whole number', () => {
        const result = lbsToLbsOz(7.33); // 7 lbs 5.28 oz
        expect(Number.isInteger(result.ounces)).toBe(true);
    });
});

describe('formatWeight', () => {
    it('should format kg weight', () => {
        expect(formatWeight(7.5, 'kg')).toBe('7.5 kg');
    });

    it('should format lbs weight with pounds and ounces', () => {
        const formatted = formatWeight(10, 'lbs');
        expect(formatted).toContain('lbs');
        expect(formatted).toContain('oz');
    });

    it('should format 10.5 lbs as "10 lbs 8 oz"', () => {
        expect(formatWeight(10.5, 'lbs')).toBe('10 lbs 8 oz');
    });

    it('should format 7.25 lbs as "7 lbs 4 oz"', () => {
        expect(formatWeight(7.25, 'lbs')).toBe('7 lbs 4 oz');
    });
});

describe('formatLength', () => {
    it('should format cm length', () => {
        expect(formatLength(67.5, 'cm')).toBe('67.5 cm');
    });

    it('should format inches as feet and inches when > 12', () => {
        const formatted = formatLength(76.2, 'inches'); // ~30 inches = 2'6"
        expect(formatted).toContain("'");
        expect(formatted).toContain('"');
    });

    it('should format small measurements in inches only', () => {
        const formatted = formatLength(25.4, 'inches'); // 10 inches
        expect(formatted).toMatch(/^10"/);
    });

    it('should handle exactly 12 inches as 1 foot', () => {
        const formatted = formatLength(30.48, 'inches'); // 12 inches
        expect(formatted).toContain("1'");
    });
});

describe('formatHeadCircumference', () => {
    it('should format cm head circumference', () => {
        expect(formatHeadCircumference(43.5, 'cm')).toBe('43.5 cm');
    });

    it('should format inches head circumference', () => {
        const formatted = formatHeadCircumference(43.5, 'inches');
        expect(formatted).toContain('"');
        expect(formatted).toMatch(/^\d+(\.\d+)?"/);
    });

    it('should convert 43.3 cm to ~17.05 inches', () => {
        const formatted = formatHeadCircumference(43.3, 'inches');
        expect(formatted).toContain('17.05');
    });
});
