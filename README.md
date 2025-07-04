# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To use all the features of this app, you'll need to configure a few services by getting API keys and adding them to the `.env` file.

### 1. Set up Firebase (for Authentication and Database)

This project uses Firebase for user authentication (signing in with Google) and Firestore to store user subscription data.

1.  Go to the **[Firebase Console](https://console.firebase.google.com/)**.
2.  Click **"Add project"** and follow the steps to create a new project.
3.  Go to the **Authentication** section. Click **"Get started"**. Under the "Sign-in method" tab, select **Google** from the list of providers, enable it, and save.
4.  Go to the **Firestore Database** section. Click **"Create database"**. Choose **Production mode** and select a location. Click **"Enable"**. In the "Rules" tab, leave the default secure rules for now.
5.  Go back to your Project Overview. Click the **web icon (`</>`)** to add a web app. Give your app a nickname and click **"Register app"**.
6.  Firebase will show you your web app configuration (the `firebaseConfig` object). You need these values.
7.  In the project root, open the `.env` file. Copy the corresponding values from your web app config into the `NEXT_PUBLIC_FIREBASE_...` variables.
8.  In your Firebase project settings, go to the **"Service accounts"** tab. Click **"Generate new private key"**. This will download a JSON file.
9.  Open the downloaded JSON file. Copy the `project_id`, `private_key`, and `client_email` values from this file into the corresponding `FIREBASE_...` variables in your `.env` file.

### 2. Set up Google AI (for AI features)

1.  Get your API key from **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2.  In the `.env` file, paste your key into the `GOOGLE_API_KEY` variable.

### 3. Set up Stripe (for Payments)

1.  Create an account on [Stripe](https://stripe.com).
2.  In your dashboard, go to the "Developers" section and find your API keys.
3.  Open the `.env` file in the project. Paste your **Secret Key** into `STRIPE_SECRET_KEY`.
4.  In your Stripe Dashboard, go to the **Products** section and click **"+ Add product"**.
5.  Give your product a name, for example, "CalcAI Pro".
6.  On the product's details page, find the "Pricing" section and click on **"+ Add new price"**.
7.  Set your desired price. The `6€/month` is just an example value. Make sure to select **Recurring** for the billing period. Click **"Add price"**.
    > **Note on Quantity:** When creating the price, Stripe might ask about quantity. For this application, which is designed for individual users, **the quantity should be fixed at 1**. You should not allow customers to change it.
8.  After the price is created, Stripe will show you its details. Find and copy the **Price ID**, which looks like `price_...`.
9.  Paste this ID into the `STRIPE_PRICE_ID` variable in your `.env` file.
10. **Install and Configure the Stripe CLI**

    The Stripe CLI is a command-line tool that helps you test your integration, especially webhooks.

    **Installation (Windows):**
    1.  Go to the [Stripe CLI releases page on GitHub](https://github.com/stripe/stripe-cli/releases/latest).
    2.  In the "Assets" section, find the file that ends with `_windows_x86_64.zip` and click to download it.
    3.  Extract the `.zip` file on your computer. It will create a folder containing a file named `stripe.exe`.
    4.  To verify it's installed, open a terminal (`cmd` or PowerShell), navigate into the extracted folder using the `cd` command, and type `stripe --version`. You should see a version number.

    **Installation (macOS):**
    If you use Homebrew, simply run:
    ```bash
    brew install stripe/stripe-cli/stripe
    ```
    Then, verify with `stripe --version`.

    **Connecting to your account:**
    Once installed, run `stripe login` in your terminal. This will open a browser window to connect the CLI to your Stripe account.

    > **Note on Windows SmartScreen:** The first time you run a `stripe` command, Windows might show a blue "Windows protected your PC" screen. This is normal. Click on **"More info"** and then on the **"Run anyway"** button to proceed.

    **Getting your Webhook Secret:**
    To test webhooks locally, navigate to your project's folder in the terminal and run:
    ```bash
    stripe listen --forward-to localhost:9002/api/stripe/webhook
    ```
    The CLI will give you a **Webhook Signing Secret** (it looks like `whsec_...`). Paste this into `STRIPE_WEBHOOK_SECRET` in your `.env` file. Keep this terminal running while you test payments.
    
    **Troubleshooting the Stripe CLI on Windows**
    *   **"Windows protected your PC" closes the terminal:** This is a rare issue. Try running the "Invite de commandes" (cmd) as an administrator. To do this, open the Start Menu, type `cmd`, right-click on "Invite de commandes", and select "Exécuter en tant qu'administrateur". Then, try the `cd` and `stripe listen` commands again.
    *   **Alternative Method (Manual):** If the CLI doesn't work, you can get a webhook secret manually from the Stripe Dashboard.
        1. Go to **Developers > Webhooks**.
        2. Click **"+ Add an endpoint"** (or "+ Ajouter une destination").
        3. For the "Endpoint URL", you can temporarily put `https://example.com`. The URL doesn't matter for generating the key. The description is also optional.
        4. Click **"Add endpoint"**.
        5. On the next page, under **"Signing secret"**, click **"Click to reveal"**.
        6. Copy this `whsec_...` key. This is your `STRIPE_WEBHOOK_SECRET`.
        7. *Note:* With this manual method, you won't actually receive webhook events in your local development environment, but it will allow you to start the app without errors.

11. In your Stripe Dashboard, go to **Settings > Customer portal**. You'll need to configure it.
    1.  Make sure that options like **"Allow customers to update their subscriptions"** are enabled.
    2.  For the **Redirect link**, you can put your application's homepage URL (e.g., `http://localhost:9002/` for local testing).
    3.  You must then click the **Save** (or **Enregistrer**) button at the bottom of the page.
    4.  **After the page reloads, the portal link will be displayed at the top of the configuration section.** This link will look like `https://billing.stripe.com/p/login/...`. Copy this link.
    5.  Paste it into the `NEXT_PUBLIC_STRIPE_PORTAL_URL` variable in your `.env` file.
12. **Activer les codes promotionnels (Optionnel)**
    L'application est prête à accepter des codes promotionnels pour offrir des réductions à vos utilisateurs. C'est un excellent outil marketing.
    1.  Dans votre Dashboard Stripe, allez dans **Produits > Codes promotionnels**.
    2.  Cliquez sur **+ Nouveau**.
    3.  Configurez votre code :
        *   **Nom ou code :** Entrez le code que les utilisateurs taperont (ex: `LANCEMENT20`).
        *   **Type de réduction :** Choisissez "Pourcentage" (ex: 20%) ou "Montant fixe" (ex: 5€).
        *   **Produits concernés :** Cochez "Appliquer à des produits spécifiques" et sélectionnez votre produit "CalcAI Pro".
        *   **Durée :** Décidez si la réduction est pour une seule fois, pour plusieurs mois, ou pour toujours.
    4.  Enregistrez. Le code que vous créez est celui que vos utilisateurs entreront lors du paiement.
13. **Activer votre compte Stripe**
    Pour accepter de vrais paiements, Stripe vous demandera d'activer votre compte en fournissant des informations sur votre entreprise.
    *   **Site Web de l'entreprise :** Stripe requiert un site web public. Une URL locale comme `http://localhost:9002` ne sera pas acceptée. Si vous n'avez pas encore de site, vous pouvez utiliser une solution temporaire comme un lien vers votre profil GitHub ou LinkedIn, ou déployer une page "Prochainement" comme expliqué dans la section suivante.


### 4. Obtenir une URL Publique pour l'Activation de Stripe

Pour activer votre compte Stripe, vous avez besoin d'une URL de site web publique. Voici comment en obtenir une gratuitement avec Vercel.

**Étape A : Mettre votre projet sur GitHub**
1.  Créez un nouveau dépôt (repository) sur [GitHub.com](https://github.com/new).
2.  Donnez-lui un nom (ex: `calc-ai-app`) et gardez-le public. La description est facultative mais peut être utile (ex: "CalcAI: Une application de calculatrice intelligente").
3.  Dans le terminal de votre projet, lancez ces commandes une par une pour initialiser Git et préparer vos fichiers :
    ```bash
    # (Si vous avez déjà essayé, supprimez l'ancien dossier .git pour recommencer proprement)
    rm -rf .git
    
    # Initialise Git
    git init -b main

    # Ajoute tous vos fichiers
    git add .

    # Sauvegarde vos fichiers
    git commit -m "Première version de CalcAI"

    # Lie votre projet local à votre dépôt GitHub distant
    # Remplacez l'URL par la vôtre !
    git remote add origin https://github.com/VOTRE_NOM/calc-ai-app.git
    ```
4.  **Authentification auprès de GitHub (Très Important)**
    Pour envoyer ("push") votre code, vous ne pouvez pas utiliser votre mot de passe GitHub directement dans le terminal. Vous devez utiliser un **"Personal Access Token"** (un mot de passe d'application).

    a. **Générez votre Token :**
       - Allez sur la page de création de token : [**github.com/settings/tokens/new**](https://github.com/settings/tokens/new).
       - **Note :** Donnez un nom à votre token (ex: `vercel-deploy-token`).
       - **Expiration :** Choisissez `30 days`.
       - **Scopes :** Cochez la case principale **`repo`**. C'est la seule nécessaire.
       - Cliquez sur **"Generate token"**.
    
    b. **Copiez votre Token :**
       - GitHub va vous montrer un token qui commence par `ghp_...`. Copiez-le immédiatement. **C'est la seule fois que vous le verrez.**

5.  **Envoyer votre code (Push)**
    Maintenant, lancez la commande pour envoyer le code :
    ```bash
    git push -u origin main
    ```
    Le terminal vous demandera votre `Username` et votre `Password` :
    - **Username:** Entrez votre nom d'utilisateur GitHub.
    - **Password:** **Collez le token `ghp_...`** que vous venez de copier. (Le texte ne s'affichera pas pendant que vous collez, c'est normal).
    
    Si cela ne fonctionne pas, il existe une méthode encore plus directe :
    ```bash
    # (Alternative) Remplacez V_USER, V_TOKEN, et V_REPO par vos informations
    git remote set-url origin https://V_USER:V_TOKEN@github.com/V_USER/V_REPO.git
    git push -u origin main
    ```

**Étape B : Déployer sur Vercel**
1.  Créez un compte sur [Vercel.com](https://vercel.com) en utilisant votre compte GitHub.
2.  Sur le tableau de bord Vercel, cliquez sur **"Add New..." -> "Project"**.
3.  Importez le dépôt GitHub que vous venez de créer en cliquant sur **"Import"**.
4.  Vercel détectera que c'est un projet Next.js. Vous n'avez rien besoin de changer dans les paramètres. Cliquez simplement sur **"Deploy"**.

**Étape C : Utiliser votre URL**
1.  Après le déploiement, Vercel vous donnera une URL publique (ex: `https://calc-ai-app-xyz.vercel.app`).
2.  Ajoutez `/soon` à la fin de cette URL pour pointer vers la page "Prochainement" : `https://calc-ai-app-xyz.vercel.app/soon`.
3.  Retournez sur Stripe, et dans le champ **"Site Web de l'entreprise"**, collez ce lien complet.
