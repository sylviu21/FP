export function randomId(): number {
  let id: number = 0;

  for (let i: number = 0; i < 6; i++) {
    const randomNumber: number = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
    id = id * 10 + randomNumber;
  }

  return id;
}
