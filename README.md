<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚗 Parc Automobile Management 🚀</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; background-color: #f4f4f4; }
        h1, h2 { text-align: center; }
        pre { background: #222; color: #fff; padding: 10px; border-radius: 5px; }
        code { font-family: monospace; }
        ul { list-style: none; padding: 0; }
        ul li::before { content: "🔹"; margin-right: 5px; }
        .container { max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    </style>
</head>
<body>

    <div class="container">
        <h1>🚗 Parc Automobile Management 🚀</h1>
        <p align="center">
            <strong>Une plateforme complète pour la gestion d’un parc automobile</strong><br>
            📊 Gestion des véhicules, conducteurs et historiques<br>
            🔎 Suivi en temps réel des opérations<br>
            🛠️ Outils avancés pour optimiser la gestion
        </p>

        <hr>

        <h2>📌 Description</h2>
        <p><strong>Parc Automobile Management</strong> est une application web développée avec <strong>Laravel</strong> et <strong>React</strong> permettant aux entreprises et administrations de gérer efficacement leur flotte de véhicules.</p>

        <h2>⚙️ Fonctionnalités</h2>
        <ul>
            <li><strong>📑 Gestion des véhicules</strong> : Ajout, modification, suppression et suivi des entretiens.</li>
            <li><strong>👨‍💼 Gestion des conducteurs</strong> : Attribution de véhicules et suivi des activités.</li>
            <li><strong>📝 Suivi des interventions</strong> : Réparations, entretiens et coûts associés.</li>
            <li><strong>📍 Localisation des véhicules</strong> : Intégration possible avec un système GPS.</li>
            <li><strong>📊 Tableau de bord</strong> : Statistiques détaillées pour une meilleure prise de décision.</li>
        </ul>

        <h2>🛠️ Technologies Utilisées</h2>
        <ul>
            <li><strong>Back-end :</strong> Laravel</li>
            <li><strong>Front-end :</strong> React.js</li>
            <li><strong>Base de données :</strong> MySQL</li>
            <li><strong>Authentification :</strong> Laravel Breeze</li>
        </ul>

        <hr>

        <h2>🚀 Installation</h2>

        <h3>1⃣ Cloner le projet</h3>
        <pre><code>git clone https://github.com/MohammedDevX/parc-automobile-management.git</code></pre>

        <h3>2⃣ Configurer le serveur Laravel</h3>
        <pre><code>cd parc-automobile-management
composer install
cp .env.example .env
php artisan key:generate</code></pre>
        <p>⚠️ Pensez à configurer la base de données dans le fichier <code>.env</code> avant de lancer les migrations.</p>
        <pre><code>php artisan migrate
php artisan serve</code></pre>

        <h3>3⃣ Installer et lancer le front-end React</h3>
        <pre><code>cd front-end
npm install
npm run dev</code></pre>

        <hr>

        <h2>📜 Licence</h2>
        <p>Ce projet est sous licence <strong>MIT</strong>. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.</p>

        <h2>📩 Contact</h2>
        <p>📧 Pour toute question ou suggestion, vous pouvez me contacter via GitHub :  
        <a href="https://github.com/MohammedDevX" target="_blank">🔗 MohammedDevX</a></p>
    </div>

</body>
</html>
