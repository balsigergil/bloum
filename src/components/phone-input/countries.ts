export interface PhoneCountry {
  /**
   * ISO 3166-1 alpha-2 code, used for the flag and the localized name.
   */
  code: string;

  /**
   * Country calling code, without the leading `+`.
   */
  dialCode: string;

  /**
   * Display pattern of the national number, `#` standing for a digit. Give
   * several patterns when the length varies: the shortest one that fits the
   * typed digits is used, and only their exact lengths are valid.
   */
  format: string | string[];

  /**
   * National prefix dialed before the number inside the country (`0` in most
   * of Europe). Stripped when typed, as it is not part of the international
   * number.
   */
  trunkPrefix?: string;
}

/**
 * Countries known by the phone input. The order sets which country wins when
 * several share a calling code (`+1`, `+7`, …); the menu is sorted by name.
 */
export const COUNTRIES: PhoneCountry[] = [
  { code: "US", dialCode: "1", format: "(###) ###-####" },
  { code: "CA", dialCode: "1", format: "(###) ###-####" },
  { code: "RU", dialCode: "7", format: "### ###-##-##" },
  { code: "KZ", dialCode: "7", format: "### ###-##-##" },
  { code: "EG", dialCode: "20", format: "### ### ####", trunkPrefix: "0" },
  { code: "ZA", dialCode: "27", format: "## ### ####", trunkPrefix: "0" },
  { code: "GR", dialCode: "30", format: "### ### ####" },
  { code: "NL", dialCode: "31", format: "# ## ## ## ##", trunkPrefix: "0" },
  {
    code: "BE",
    dialCode: "32",
    format: ["# ### ## ##", "### ## ## ##"],
    trunkPrefix: "0",
  },
  { code: "FR", dialCode: "33", format: "# ## ## ## ##", trunkPrefix: "0" },
  { code: "ES", dialCode: "34", format: "### ## ## ##" },
  {
    code: "HU",
    dialCode: "36",
    format: ["# ### ####", "## ### ####"],
    trunkPrefix: "06",
  },
  { code: "IT", dialCode: "39", format: ["### ### ###", "### ### ####"] },
  { code: "RO", dialCode: "40", format: "### ### ###", trunkPrefix: "0" },
  { code: "CH", dialCode: "41", format: "## ### ## ##", trunkPrefix: "0" },
  {
    code: "AT",
    dialCode: "43",
    format: ["### ######", "### #######", "### ########"],
    trunkPrefix: "0",
  },
  { code: "GB", dialCode: "44", format: "#### ######", trunkPrefix: "0" },
  { code: "DK", dialCode: "45", format: "## ## ## ##" },
  { code: "SE", dialCode: "46", format: "##-### ## ##", trunkPrefix: "0" },
  { code: "NO", dialCode: "47", format: "### ## ###" },
  { code: "PL", dialCode: "48", format: "### ### ###" },
  {
    code: "DE",
    dialCode: "49",
    format: ["### ######", "### #######", "### ########"],
    trunkPrefix: "0",
  },
  { code: "MX", dialCode: "52", format: "## #### ####" },
  { code: "AR", dialCode: "54", format: "## ####-####", trunkPrefix: "0" },
  {
    code: "BR",
    dialCode: "55",
    format: ["(##) ####-####", "(##) #####-####"],
    trunkPrefix: "0",
  },
  { code: "CL", dialCode: "56", format: "# #### ####" },
  { code: "CO", dialCode: "57", format: "### ### ####" },
  {
    code: "MY",
    dialCode: "60",
    format: ["##-### ####", "##-#### ####"],
    trunkPrefix: "0",
  },
  { code: "AU", dialCode: "61", format: "### ### ###", trunkPrefix: "0" },
  {
    code: "ID",
    dialCode: "62",
    format: ["###-###-###", "###-####-###", "###-####-####"],
    trunkPrefix: "0",
  },
  { code: "PH", dialCode: "63", format: "### ### ####", trunkPrefix: "0" },
  {
    code: "NZ",
    dialCode: "64",
    format: ["## ### ###", "## ### ####", "## #### ####"],
    trunkPrefix: "0",
  },
  { code: "SG", dialCode: "65", format: "#### ####" },
  { code: "TH", dialCode: "66", format: "## ### ####", trunkPrefix: "0" },
  {
    code: "JP",
    dialCode: "81",
    format: ["# #### ####", "## #### ####"],
    trunkPrefix: "0",
  },
  {
    code: "KR",
    dialCode: "82",
    format: ["## ### ####", "## #### ####"],
    trunkPrefix: "0",
  },
  { code: "VN", dialCode: "84", format: "## ### ## ##", trunkPrefix: "0" },
  { code: "CN", dialCode: "86", format: "### #### ####" },
  { code: "TR", dialCode: "90", format: "### ### ## ##", trunkPrefix: "0" },
  { code: "IN", dialCode: "91", format: "##### #####", trunkPrefix: "0" },
  { code: "PK", dialCode: "92", format: "### #######", trunkPrefix: "0" },
  { code: "MA", dialCode: "212", format: "### ######", trunkPrefix: "0" },
  { code: "TN", dialCode: "216", format: "## ### ###" },
  { code: "SN", dialCode: "221", format: "## ### ## ##" },
  { code: "CI", dialCode: "225", format: "## ## ## ## ##" },
  { code: "CM", dialCode: "237", format: "# ## ## ## ##" },
  { code: "NG", dialCode: "234", format: "### ### ####", trunkPrefix: "0" },
  { code: "KE", dialCode: "254", format: "### ######", trunkPrefix: "0" },
  { code: "PT", dialCode: "351", format: "### ### ###" },
  {
    code: "LU",
    dialCode: "352",
    format: ["## ## ##", "## ## ## ##", "### ### ###"],
  },
  { code: "IE", dialCode: "353", format: "## ### ####", trunkPrefix: "0" },
  {
    code: "FI",
    dialCode: "358",
    format: ["## ### ###", "## ### ####"],
    trunkPrefix: "0",
  },
  { code: "UA", dialCode: "380", format: "## ### ## ##", trunkPrefix: "0" },
  {
    code: "HR",
    dialCode: "385",
    format: ["## ### ###", "## ### ####"],
    trunkPrefix: "0",
  },
  { code: "CZ", dialCode: "420", format: "### ### ###" },
  { code: "LI", dialCode: "423", format: "### ## ##" },
  { code: "HK", dialCode: "852", format: "#### ####" },
  { code: "AE", dialCode: "971", format: "## ### ####", trunkPrefix: "0" },
  { code: "IL", dialCode: "972", format: "##-###-####", trunkPrefix: "0" },
  { code: "SA", dialCode: "966", format: "## ### ####", trunkPrefix: "0" },
];

/**
 * Flag emoji of a country, built from its regional indicator symbols.
 */
export function countryFlag(code: string): string {
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0)),
  );
}

/**
 * Every pattern of a country, shortest first.
 */
export function countryFormats(country: PhoneCountry): string[] {
  const formats = Array.isArray(country.format)
    ? country.format
    : [country.format];
  return [...formats].sort((a, b) => digitCount(a) - digitCount(b));
}

/**
 * Number of digits a pattern holds.
 */
export function digitCount(pattern: string): number {
  return pattern.split("#").length - 1;
}

/**
 * Format the digits of a national number with the country's pattern.
 * Separators are only written when a digit follows them.
 */
export function formatNational(country: PhoneCountry, digits: string): string {
  if (digits === "") return "";
  const formats = countryFormats(country);
  const pattern =
    formats.find((format) => digitCount(format) >= digits.length) ??
    formats[formats.length - 1];

  let result = "";
  let index = 0;
  for (const char of pattern) {
    if (index >= digits.length) break;
    if (char === "#") {
      result += digits[index++];
    } else {
      result += char;
    }
  }
  return result;
}
