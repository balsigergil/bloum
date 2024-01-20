/**
 * Generate a random string ID of 8 characters.
 */
export function randomId(length = 8) {
  // TODO: add tests
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomValues = new Uint32Array(length);

  window.crypto.getRandomValues(randomValues);

  let randomString = "";
  for (let i = 0; i < randomValues.length; i++) {
    const randomIndex = randomValues[i] % characters.length;
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
