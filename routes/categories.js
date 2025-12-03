const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'categories.json');

async function readData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}
async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET all
router.get('/', async (req, res) => {
  try {
    const categories = await readData();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const categories = await readData();
    const cat = categories.find(c => c.id === id);
    if (!cat) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Name requis' });
    const categories = await readData();
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCat = { id: newId, name };
    categories.push(newCat);
    await writeData(categories);
    res.status(201).json(newCat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Name requis' });
    const categories = await readData();
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Catégorie non trouvée' });
    categories[idx].name = name;
    await writeData(categories);
    res.json(categories[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let categories = await readData();
    const lenBefore = categories.length;
    categories = categories.filter(c => c.id !== id);
    if (categories.length === lenBefore) return res.status(404).json({ error: 'Catégorie non trouvée' });
    await writeData(categories);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
