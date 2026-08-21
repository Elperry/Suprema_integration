/**
 * Card display helpers shared by the onboarding wizard steps.
 */

export const decodeHexToDecimal = (hexData) => {
  try {
    if (!hexData) return 'N/A'
    let cleanHex = hexData.replace(/\s/g, '').toUpperCase()
    if (cleanHex.length % 2 === 1) cleanHex = '0' + cleanHex
    let significant = cleanHex.replace(/^0+/, '') || '0'
    if (significant.length % 2 === 1) significant = '0' + significant
    return BigInt('0x' + significant).toString()
  } catch { return 'Error' }
}

/** Card number of an assignment row regardless of API field naming. */
export const assignmentCardNumber = (assignment) =>
  decodeHexToDecimal(assignment?.card_data ?? assignment?.cardData)
