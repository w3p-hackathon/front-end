/**
 * 23andMe Genetic Data Parser for Browser
 * Processes 23andMe TSV data and returns encoded genetic markers
 * Requires ethers.js for Keccak256 hashing
 */

/**
 * Calculate genetic data quality metrics using encoded alleles
 * @param {Array} markers - Array of genetic markers
 * @returns {Object} Object with call_rate, heterozygosity_rate, ti_tv_ratio
 */
import { ethers } from "ethers";

function calculateQualityMetrics(markers: any) {
  if (!markers || markers.length === 0) {
    return { call_rate: 0.0, heterozygosity_rate: 0.0, ti_tv_ratio: 0.0 };
  }

  const totalMarkers = markers.length;
  let missingCalls = 0;
  let heterozygous = 0;
  let transitions = 0;
  let transversions = 0;

  for (const marker of markers) {
    const allele1 = marker.allele1;
    const allele2 = marker.allele2;

    // Count missing calls (0 indicates missing data)
    if (allele1 === 0 || allele2 === 0) {
      missingCalls++;
    } else if ([1, 2, 3, 4].includes(allele1) && [1, 2, 3, 4].includes(allele2)) {
      // Count heterozygous calls
      if (allele1 !== allele2) {
        heterozygous++;

        // Count transitions vs transversions
        const [a1, a2] = [allele1, allele2].sort((a, b) => a - b);

        // Transitions: A<->G (1<->3), C<->T (2<->4)
        if ((a1 === 1 && a2 === 3) || (a1 === 2 && a2 === 4)) {
          transitions++;
          // Transversions: all other combinations
        } else if (
          [
            [1, 2],
            [1, 4],
            [2, 3],
            [3, 4],
          ].some(pair => pair[0] === a1 && pair[1] === a2)
        ) {
          transversions++;
        }
      }
    }
  }

  // Calculate rates
  const validCalls = totalMarkers - missingCalls;
  const callRate = totalMarkers > 0 ? validCalls / totalMarkers : 0.0;
  const heterozygosityRate = validCalls > 0 ? heterozygous / validCalls : 0.0;
  const tiTvRatio = transversions > 0 ? transitions / transversions : 0.0;

  return {
    call_rate: callRate,
    heterozygosity_rate: heterozygosityRate,
    ti_tv_ratio: tiTvRatio,
  };
}

/**
 * Generate a deterministic challenge hash from the encoded genetic data using Keccak256
 * @param {Array} data - Array of genetic markers
 * @returns {string} Keccak256 hash
 */
function generateChallengeHash(data: any) {
  // Create a string representation of the encoded data for hashing
  let dataString = "";
  for (const marker of data) {
    dataString += `${marker.rsid}${marker.chromosome}${marker.position}${marker.allele1}${marker.allele2}`;
  }

  // Generate Keccak256 hash using ethers.js
  const hash = ethers.keccak256(ethers.toUtf8Bytes(dataString));
  return hash;
}

/**
 * Encode allele character to number for circuit computation
 * A=1, T=2, G=3, C=4, 0/-/D/I=0 (missing)
 * @param {string} allele - Allele character
 * @returns {number} Encoded allele
 */
function encodeAllele(allele: any) {
  const alleleEncoding = {
    A: 1,
    T: 2,
    G: 3,
    C: 4,
    "0": 0,
    "-": 0,
    D: 0,
    I: 0,
  };
  return alleleEncoding[allele.toUpperCase() as keyof typeof alleleEncoding] || 0;
}

/**
 * Encode chromosome to number
 * 1-22=1-22, X=23, Y=24, MT/M=25
 * @param {string} chromosome - Chromosome string
 * @returns {number} Encoded chromosome
 */
function encodeChromosome(chromosome: any) {
  if (/^\d+$/.test(chromosome)) {
    const chrNum = parseInt(chromosome);
    if (chrNum >= 1 && chrNum <= 22) {
      return chrNum;
    }
  } else if (chromosome.toUpperCase() === "X") {
    return 23;
  } else if (chromosome.toUpperCase() === "Y") {
    return 24;
  } else if (["MT", "M"].includes(chromosome.toUpperCase())) {
    return 25;
  }

  return 0; // Invalid chromosome
}

/**
 * Validate that a genetic marker has proper format
 * @param {Array} fields - Array of field values
 * @returns {boolean} True if valid
 */
function validateGeneticMarker(fields: any) {
  if (fields.length !== 5) {
    return false;
  }

  const [rsid, chromosome, position, allele1, allele2] = fields;

  // Validate rsid format (should start with 'rs' or 'i')
  if (!rsid.startsWith("rs") && !rsid.startsWith("i")) {
    return false;
  }

  // Validate chromosome (1-22, X, Y, MT)
  if (encodeChromosome(chromosome) === 0) {
    return false;
  }

  // Validate position (should be numeric)
  const pos = parseInt(position);
  if (isNaN(pos) || pos <= 0) {
    return false;
  }

  // Validate alleles (should be A, T, G, C, 0, -, D, or I)
  const validAlleles = new Set(["A", "T", "G", "C", "0", "-", "D", "I"]);
  if (!validAlleles.has(allele1) || !validAlleles.has(allele2)) {
    return false;
  }

  return true;
}

/**
 * Parse 23andMe data string and extract genetic markers
 * @param {string} fileContent - File content as string
 * @param {number} maxMarkers - Maximum number of markers to process
 * @param {boolean} verbose - Whether to log progress (default: false for browser)
 * @returns {Object} Object containing markers array, quality metrics, and challenge hash
 */
function parse23andMeData(fileContent: any, maxMarkers = 1000, verbose = false) {
  const markers = [];

  if (!fileContent || fileContent.trim().length === 0) {
    throw new Error("File content is empty");
  }

  const lines = fileContent.split("\n");

  // Skip header comments (lines starting with #)
  let dataStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith("#")) {
      dataStart = i;
      break;
    }
  }

  if (dataStart >= lines.length) {
    throw new Error("No data found in file");
  }

  // Parse header line
  const headerLine = lines[dataStart].trim();
  const headers = headerLine.split("\t").map((h: any) => h.trim());

  // Validate expected headers
  const expectedHeaders = ["rsid", "chromosome", "position", "allele1", "allele2"];
  if (!expectedHeaders.every(h => headers.includes(h))) {
    throw new Error(`Invalid headers. Expected: ${expectedHeaders.join(", ")}, Found: ${headers.join(", ")}`);
  }

  if (verbose) {
    console.log(`✅ Valid headers found: ${headers.join(", ")}`);
  }

  // Parse data lines
  let processedCount = 0;
  let skippedCount = 0;

  for (let i = dataStart + 1; i < lines.length; i++) {
    if (processedCount >= maxMarkers) {
      if (verbose) {
        console.log(`✅ Reached maximum limit of ${maxMarkers} markers`);
      }
      break;
    }

    const line = lines[i].trim();
    if (!line) {
      // Skip empty lines
      continue;
    }

    const fields = line.split("\t").map((f: any) => f.trim());

    // Validate marker format
    if (!validateGeneticMarker(fields)) {
      skippedCount++;
      if (verbose && skippedCount <= 10) {
        // Only show first 10 warnings
        console.log(`⚠️  Skipping invalid marker on line ${i}: ${fields.join("\t")}`);
      }
      continue;
    }

    const [rsid, chromosome, position, allele1, allele2] = fields;

    markers.push({
      rsid: rsid,
      chromosome: encodeChromosome(chromosome),
      position: parseInt(position),
      allele1: encodeAllele(allele1),
      allele2: encodeAllele(allele2),
      raw_chromosome: chromosome, // Keep original for reference
      raw_allele1: allele1, // Keep original for reference
      raw_allele2: allele2, // Keep original for reference
    });

    processedCount++;

    // Progress indicator
    if (verbose && processedCount % 100 === 0) {
      console.log(`📊 Processed ${processedCount} markers...`);
    }
  }

  if (verbose) {
    console.log(`✅ Successfully processed ${processedCount} markers`);
    if (skippedCount > 0) {
      console.log(`⚠️  Skipped ${skippedCount} invalid markers`);
    }
  }

  if (markers.length === 0) {
    throw new Error("No valid genetic markers found in data");
  }

  // Calculate quality metrics
  const qualityMetrics = calculateQualityMetrics(markers);

  // Generate challenge hash
  const challengeHash = generateChallengeHash(markers);

  return {
    markers: markers,
    quality_metrics: qualityMetrics,
    challenge_hash: challengeHash,
    total_processed: processedCount,
    total_skipped: skippedCount,
    encoding_info: {
      alleles: "A=1, T=2, G=3, C=4, Missing=0",
      chromosomes: "1-22=1-22, X=23, Y=24, MT=25",
      hash_function: "Keccak256",
    },
  };
}

/**
 * Simple wrapper function for basic usage
 * @param {string} fileContent - 23andMe file content as string
 * @param {number} maxMarkers - Maximum markers to process (default: 1000)
 * @returns {Array} Array of encoded genetic markers
 */
async function parseGeneticData(fileContent: any, maxMarkers = 1000) {
  console.log(fileContent, 1000);
  const result = parse23andMeData(fileContent, maxMarkers, false);
  return result;
}

export { parseGeneticData };
