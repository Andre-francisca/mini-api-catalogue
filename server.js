const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

app.get('/', (req, res) => res.send('Mini API Catalogue - OK'));

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
