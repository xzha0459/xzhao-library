/* eslint-env node */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated, onDocumentWritten } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// Match Firestore location (see firebase.json: australia-southeast1)
setGlobalOptions({ maxInstances: 10, region: "australia-southeast1" });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books:", error?.message || error);
      res.status(500).send("Error counting books");
    }
  });
});

// Return full list of books as JSON array
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get()
      const books = []
      snapshot.forEach((doc) => books.push({ id: doc.id, ...doc.data() }))
      res.status(200).send(books)
    } catch (error) {
      console.error("Error getting all books:", error?.message || error)
      res.status(500).send("Error getting all books")
    }
  })
})

// Capitalize all string fields when a doc is created or updated (idempotent)
exports.capitalizeBook = onDocumentWritten("books/{docId}", async (event) => {
  const afterSnap = event.data?.after;
  if (!afterSnap) return; // deleted event

  const data = afterSnap.data();
  if (!data) return;

  const updates = {};
  let changed = false;
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      const upper = value.toUpperCase();
      if (upper !== value) {
        updates[key] = upper;
        changed = true;
      }
    }
  }

  if (!changed) return; // nothing to change, avoid loops

  try {
    console.log(`capitalizeBook fired for doc ${afterSnap.id} in ${afterSnap.ref.path}`);
    await admin.firestore().doc(afterSnap.ref.path).set(updates, { merge: true });
    console.log(`Capitalized book ${afterSnap.id}`);
  } catch (error) {
    console.error("Error capitalizing book:", error?.message || error);
  }
});
