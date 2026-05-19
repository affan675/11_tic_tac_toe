window.botAstro = {
  name: "Astro Navigator",
  avatar: "🚀",
  difficulty: "easy+",
  getMove(board, currentPlayer) {
    const empty = window.getEmptyCells(board);
    if (empty.length === 0) return null;
    if (empty.includes(4)) return 4;
    const corners = empty.filter(idx => [0,2,6,8].includes(idx));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
    return empty[Math.floor(Math.random() * empty.length)];
  },
  getQuote(type) {
    const quotes = {
      before: [
        "Coordinates locked. Engaging move.",
        "Navigating the grid...",
        "Star chart says: center is prime.",
        "Calculating optimal entry point."
      ],
      win: [
        "Mission accomplished!",
        "The stars aligned for me.",
        "Victory is in my orbit!",
        "Houston, we have a winner."
      ],
      lose: [
        "Orbit decay... I'll recalibrate.",
        "Gravity pulled me down.",
        "The black hole of defeat!",
        "I've lost my trajectory."
      ],
      draw: [
        "Stalemate in space.",
        "Neutral gravitational field.",
        "We've reached an equilibrium.",
        "No one escaped the event horizon."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};