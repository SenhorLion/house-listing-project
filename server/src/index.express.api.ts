import express from 'express';
// import bodyParser from "body-parser";

import { listings } from './listings';

const app = express();
const PORT = 9000; // TODO: set by .env config

// Copy of listings, so we can modify them "in memory" with our routes
let filteredListings = [...listings];

// app.use(bodyParser.json());
app.use(express.json());

app.get('/', (_req, res) => {
  return res.send('House Listings');
});

app.get('/listings', (_req, res) => {
  return res.send(filteredListings);
});

// DELETE
app.post('/delete-listing', (req, res) => {
  const id: string = req.body.id;

  const deletedListing = filteredListings.find(listing => listing._id === id);

  if (!deletedListing) {
    return res.send('Couldnt find listing');
  }

  // update in-memory listings
  filteredListings = filteredListings.filter(listing => listing._id !== id);

  // return the deleted listing
  return res.send(deletedListing);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
