const client = require("./client");
const util = require("util");

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    // Select all videogames from database
    const { rows: videoGames } = await client.query(
      `SELECT * FROM videogames;`
    );
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videogames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  // LOGIC GOES HERE
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    // add a new row to the videogames database
    const { rows } = await client.query(
      `
      INSERT INTO videogames (name, description, price, "inStock", "isPopular", "imgUrl")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [name, description, price, inStock, isPopular, imgUrl]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  // LOGIC GOES HERE
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        UPDATE videoGames
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  // LOGIC GOES HERE
  try {
    const {
      rows: [videoGames],
    } = await client.query(
      `
      DELETE FROM videogames 
        WHERE id=$1
        RETURNING *;`,
      [id]
    );
    return videoGames;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
