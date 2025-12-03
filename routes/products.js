const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

async function readData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}
async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET all (option: filter by categoryId ?category=1)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let products = await readData();
    if (category) products = products.filter(p => String(p.categoryId) === String(category));
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = await readData();
    const p = products.find(x => x.id === id);
    if (!p) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Name requis' });
    if (price == null || isNaN(Number(price))) return res.status(400).json({ error: 'Price requis' });
    if (categoryId == null || isNaN(Number(categoryId))) return res.status(400).json({ error: 'categoryId requis' });

    const products = await readData();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, name, price: Number(price), categoryId: Number(categoryId) };
    products.push(newProduct);
    await writeData(products);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, categoryId } = req.body;
    const products = await readData();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Produit non trouvé' });
    if (name) products[idx].name = name;
    if (price != null && !isNaN(Number(price))) products[idx].price = Number(price);
    if (categoryId != null && !isNaN(Number(categoryId))) products[idx].categoryId = Number(categoryId);
    await writeData(products);
    res.json(products[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let products = await readData();
    const lenBefore = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length === lenBefore) return res.status(404).json({ error: 'Produit non trouvé' });
    await writeData(products);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
