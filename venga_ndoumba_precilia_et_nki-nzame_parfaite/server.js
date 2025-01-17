const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Pool } = require('pg'); // PostgreSQL client

dotenv.config();

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'gestion_campagnes',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 9999
});

// Test de la connexion à la base
pool.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données PostgreSQL.');
    }
});

// API : Récupérer toutes les campagnes
app.get('/api/campagnes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campagnes');
        res.json({ success: true, campagnes: result.rows });
    } catch (err) {
        console.error('Erreur lors de la récupération des campagnes :', err);
        res.status(500).json({ success: false, message: 'Erreur serveur. Impossible de récupérer les campagnes.' });
    }
});

// API : Ajouter une campagne
app.post('/api/campagnes', async (req, res) => {
    const { nom, statut, canal, budget_alloue, budget_depense } = req.body;

    // Validation côté serveur
    if (!nom || !statut || !canal || budget_alloue == null || budget_depense == null) {
        return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs requis.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO campagnes (nom, statut, canal, budget_alloue, budget_depense) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nom, statut, canal, budget_alloue, budget_depense]
        );
        res.status(201).json({ success: true, message: 'Campagne ajoutée avec succès.', campagne: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la campagne :', err);
        res.status(500).json({ success: false, message: 'Erreur serveur. Impossible d\'ajouter la campagne.' });
    }
});

// API : Supprimer une campagne
app.delete('/api/campagnes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM campagnes WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Campagne introuvable.' });
        }
        res.json({ success: true, message: 'Campagne supprimée avec succès.' });
    } catch (err) {
        console.error('Erreur lors de la suppression de la campagne :', err);
        res.status(500).json({ success: false, message: 'Erreur serveur. Impossible de supprimer la campagne.' });
    }
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
