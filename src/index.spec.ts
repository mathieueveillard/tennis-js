import { Game } from ".";

function toDeuceState() {
  return new Game()
    .score("PLAYER1")
    .score("PLAYER2")
    .score("PLAYER1")
    .score("PLAYER2")
    .score("PLAYER1")
    .score("PLAYER2");
}

it("Score should be blank on game initialisation", function() {
  const game = new Game();
  expect(game.displayScore()).toEqual("Love-Love");
});

it("1 point should be displayed as '15'", function() {
  const game = new Game().score("PLAYER1");
  expect(game.displayScore()).toEqual("15-Love");
});

it("2 points should be displayed as '30'", function() {
  const game = new Game().score("PLAYER1").score("PLAYER1");
  expect(game.displayScore()).toEqual("30-Love");
});

it("3 points should be displayed as '40'", function() {
  const game = new Game()
    .score("PLAYER1")
    .score("PLAYER1")
    .score("PLAYER1");
  expect(game.displayScore()).toEqual("40-Love");
});

it("If a player has scored 40 and they score next, they win the game", function() {
  const game = new Game()
    .score("PLAYER1")
    .score("PLAYER1")
    .score("PLAYER1")
    .score("PLAYER1");
  expect(game.displayScore()).toEqual("PLAYER1 wins");
});

it("If both players have scored 40, the game is said to be 'deuce'", function() {
  const game = toDeuceState();
  expect(game.displayScore()).toEqual("Deuce");
});

it("If the game is deuce, the next scoring player has 'advantage'", function() {
  const game = toDeuceState().score("PLAYER1");
  expect(game.displayScore()).toEqual("Advantage PLAYER1");
});

it("If the player with advantage scores next, they win the game", function() {
  const game = toDeuceState()
    .score("PLAYER1")
    .score("PLAYER1");
  expect(game.displayScore()).toEqual("PLAYER1 wins");
});

it("If the player without advantage scores next, the game is back to deuce", function() {
  const game = toDeuceState()
    .score("PLAYER1")
    .score("PLAYER2");
  expect(game.displayScore()).toEqual("Deuce");
});
