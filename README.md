

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
    > **Note Importante (Live vs Test) :** Une fois votre compte activé, vous avez accès à deux types de clés : "Test" (pour le développement) et "Live" (pour les vrais paiements). Assurez-vous que la clé que vous copiez est bien votre **Clé Secrète LIVE** (elle commence par `sk_live_...`). Vous pouvez basculer entre les modes Test et Live avec l'interrupteur en haut à droite de votre tableau de bord Stripe.
4.  In your Stripe Dashboard, go to the **Products** section and click **"+ Add product"**.
    > **Attention : Vérifier que vous êtes en "Mode Production" (Live)**
    > Avant de créer votre produit, il est **crucial** de vous assurer que vous n'êtes pas en "Mode Test". Les produits créés en mode test ne sont pas valables pour de vrais paiements.
    >
    > Il y a deux façons simples de vérifier :
    > 1.  **L'indicateur Visuel :** Cherchez en haut de votre tableau de bord. Le "Mode Test" est généralement indiqué par une **bannière orange** ou un texte très visible. Si vous ne voyez rien de tel, vous êtes probablement en Mode Production.
    > 2.  **Vérification par les Clés API (méthode infaillible) :**
    >     *   Allez dans l'onglet **Développeurs > Clés API**.
    >     *   Regardez vos "Clés standard".
    >     *   Si elles commencent par `pk_live_...` et `sk_live_...`, vous êtes bien en **Mode Production**.
    >     *   Si elles commencent par `pk_test_...` et `sk_test_...`, vous êtes en **Mode Test**.
    >
    > Assurez-vous d'être en Mode Production avant de continuer.
5.  Give your product a name, for example, "CalcAI Pro". Pour la description, vous pouvez mettre `Abonnement mensuel à CalcAI Pro`.
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
14. **Remplir vos informations publiques (Crucial)**
    Stripe vous demandera de remplir des informations qui seront visibles par vos clients. C'est très important pour qu'ils reconnaissent leurs achats et pour éviter les contestations de paiement.
    *   **Nom affiché / Nom du profil :** C'est le nom public de votre entreprise ou produit.
        *   **Suggestion :** `CalcAI Pro`
    *   **ID du réseau :** Un identifiant unique pour votre profil sur Stripe (comme un nom d'utilisateur). Il doit être court, en minuscules et ne contenir que des lettres, des chiffres et des tirets bas (_).
        *   **Suggestion :** `calcai_app`
    *   **Libellé de relevé bancaire :** C'est le nom qui apparaîtra sur le relevé de carte bancaire de votre client. Il doit être **court et très facile à reconnaître**.
        *   **Exemples :** `CALCAI.APP` ou `CALCAI PRO`.
    *   **Libellé abrégé :** Une version encore plus courte du nom pour les relevés qui ont peu d'espace.
        *   **Exemple :** `CALCAI`.
    *   **Description de l'entreprise :** Si un champ plus long est demandé, décrivez simplement votre service.
        *   **Exemple :** `CalcAI : L'Omni-Calculatrice Intelligente.`
    *   **Numéro de téléphone de contact :**
        *   **Idéalement, ce champ est optionnel.** Si Stripe vous permet de le laisser vide, c'est la meilleure option pour commencer et protéger votre vie privée.
        *   **Si le champ est obligatoire :** Dans certains pays, Stripe exige un numéro de téléphone pour l'activation. Si vous ne pouvez pas continuer sans en fournir un, voici la meilleure solution :
            *   **Option 1 (Recommandée) : Utiliser un numéro VoIP.** Vous pouvez obtenir un numéro de téléphone gratuit ou très bon marché via des services comme Google Voice ou Skype. C'est la meilleure façon de protéger votre numéro personnel.
            *   **Option 2 : Utiliser votre numéro personnel.** Pour un petit projet qui démarre, le risque de recevoir des appels est très faible. Vous pouvez utiliser votre numéro pour passer cette étape d'activation et souvent le modifier ou le supprimer plus tard dans les paramètres de votre compte Stripe.
15. **Ignorer les étapes facultatives**
    Pendant le processus d'activation, Stripe peut vous proposer des services supplémentaires comme `Stripe Tax` ou `Stripe Climate`. Ces fonctionnalités sont utiles mais **ne sont pas nécessaires** pour que l'application fonctionne. Vous pouvez cliquer sur **"Ignorer pour l'instant"** ou **"Non merci"** pour passer ces étapes en toute sécurité et terminer la configuration plus rapidement.
16. **Sécuriser votre compte (2FA)**
    Lors de la création de votre compte, Stripe vous demandera de configurer l'authentification à deux facteurs (2FA) pour sécuriser votre compte. C'est une étape obligatoire et très importante.
    *   **Option recommandée : "Application d'authentification"**. C'est la méthode la plus sûre et la plus pratique. Vous devrez installer une application sur votre téléphone (comme Google Authenticator, Microsoft Authenticator, ou Authy). Stripe affichera un code QR que vous scannerez avec l'application pour la lier à votre compte.
    *   **Clé de sécurité (USB) :** C'est une autre option, mais elle n'est pas nécessaire si vous utilisez une application d'authentification.
    *   **SMS :** Une option moins sécurisée, mais qui peut dépanner.

### 4. Obtenir une URL Publique pour l'Activation de Stripe

Pour activer votre compte Stripe, vous avez besoin d'une URL de site web publique. Voici comment en obtenir une gratuitement avec Vercel.

**Étape A : Mettre votre projet sur GitHub**
1.  Créez un nouveau dépôt (repository) sur [GitHub.com](https://github.com/new).
2.  Donnez-lui un nom (ex: `calc-ai-app`) et gardez-le public. La description est facultative.
3.  **Ouvrez un terminal DANS le dossier `workspace`** de votre projet (Menu -> Terminal -> Nouveau Terminal). Puis, tapez ces commandes une par une :
    ```bash
    # (Si la commande 'git init' échoue, supprimez l'ancien dossier .git pour recommencer proprement)
    rm -rf .git
    
    # Initialise Git
    git init -b main

    # Ajoute tous vos fichiers pour le suivi
    git add .

    # Sauvegarde vos fichiers avec un message descriptif
    git commit -m "Première version de CalcAI"

    # Lie votre dossier local au dépôt en ligne sur GitHub
    # Remplacez l'URL ci-dessous par celle de votre propre dépôt !
    git remote add origin https://github.com/VOTRE_NOM/calc-ai-app.git
    ```
    *(Note: la commande `git remote add` peut afficher une erreur `remote origin already exists` si elle a déjà été exécutée. Ce n'est pas grave, vous pouvez continuer.)*

4.  **Authentification auprès de GitHub (Très Important)**
    Pour envoyer ("push") votre code, vous ne pouvez pas utiliser votre mot de passe GitHub directement dans le terminal. Vous devez utiliser un **"Personal Access Token"** (un mot de passe d'application).

    a. **Générez votre Token :**
       - Allez sur la page de création de token : [**github.com/settings/tokens/new**](https://github.com/settings/tokens/new) et choisissez **"Generate new token (classic)"**.
       - **Note :** Donnez un nom à votre token (ex: `firebase-studio-token`).
       - **Expiration :** Choisissez `30 days`.
       - **Scopes :** Cochez la case principale **`repo`**. C'est la seule permission nécessaire.
       - Cliquez sur **"Generate token"**.
    
    b. **Copiez votre Token :**
       - GitHub va vous montrer un token qui commence par `ghp_...`. Copiez-le immédiatement et gardez-le en sécurité. **C'est la seule fois que vous le verrez.**

5.  **Envoyer le code (Push)**
    Lancez la commande pour envoyer le code :
    ```bash
    git push -u origin main
    ```
    Le terminal peut vous demander votre `Username` et votre `Password` :
    - **Username:** Entrez votre nom d'utilisateur GitHub.
    - **Password:** **Collez le token `ghp_...`** que vous venez de copier. (Le texte ne s'affichera pas pendant que vous collez, c'est normal).

    **Si ça ne fonctionne pas (erreur `Authentication failed`) :**
    C'est un bug connu du gestionnaire d'identifiants. Utilisez cette méthode plus directe, qui est souvent plus fiable.

    **MÉTHODE ALTERNATIVE (RECOMMANDÉE)**
    1. Assurez-vous d'avoir un token **nouvellement généré** avec la permission `repo`.
    2. Construisez la commande suivante en remplaçant `VOTRE_NOM` et `VOTRE_TOKEN` :
    ```bash
    # Modèle : git remote set-url origin https://VOTRE_NOM:VOTRE_TOKEN@github.com/VOTRE_NOM/calc-ai-app.git
    git remote set-url origin https://Ange4-eng:ghp_xxxxxxxx@github.com/Ange4-eng/calc-ai-app.git
    ```
    3. Collez cette commande complète dans le terminal et appuyez sur Entrée.
    4. Maintenant, envoyez le code. Il ne devrait plus vous demander de mot de passe :
    ```bash
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
    > **Note importante :** Cette URL est utilisée **uniquement** pour le champ "Site Web de l'entreprise" sur le site de Stripe. Vous ne devez **pas** la mettre dans votre fichier `.env`.

### 5. Publier Votre Application (Mise à Jour Finale)

**Votre Lien Public :**

Votre application est en ligne et accessible à l'adresse suivante. C'est le seul lien que vous devez utiliser et partager :

**https://calc-ai-app.vercel.app**

---

**Instructions pour mettre à jour l'application :**

Chaque fois que vous voulez publier de nouvelles modifications, suivez ces 3 étapes.

1.  **Ouvrez le Terminal :**
    *   Dans le menu en haut, allez à **Terminal > Nouveau Terminal**.

2.  **Copiez-collez ces 3 commandes, une par une :**
    Appuyez sur `Entrée` après chaque commande.

    *   **Commande 1 : Préparer les fichiers**
        ```bash
        git add .
        ```

    *   **Commande 2 : Sauvegarder les changements** (vous pouvez changer le message)
        ```bash
        git commit -m "Nouvelle mise à jour"
        ```

    *   **Commande 3 : Envoyer et publier**
        ```bash
        git push origin main
        ```

Après la troisième commande, attendez une minute ou deux, et votre site sera à jour sur votre lien public.

### 6. Faire connaître votre application (SEO)

Pour que votre application soit visible sur Google, il est fortement recommandé de l'enregistrer sur la **Google Search Console**.

1.  **Allez sur Google Search Console :**
    *   Connectez-vous avec votre compte Google et allez sur [Google Search Console](https://search.google.com/search-console).

2.  **Ajoutez votre site :**
    *   Dans le menu à gauche, cliquez sur le sélecteur de propriété (il affiche probablement "Search Console" au début), puis sur **"+ Ajouter la propriété"**.
    *   Choisissez le type de propriété **"Préfixe de l'URL"**.
    *   Entrez l'URL complète de votre application : **`https://calc-ai-app.vercel.app`**
    *   Cliquez sur **"CONTINUER"**.

3.  **Vérifiez que vous êtes bien le propriétaire :**
    *   Google va vous proposer plusieurs méthodes de validation. Choisissez **"Balise HTML"**.
    *   Google vous donnera une ligne de code qui ressemble à : `<meta name="google-site-verification" content="VOTRE_CODE_UNIQUE" />`
    *   **Copiez cette balise complète.**

4.  **Ajoutez la balise à votre code :**
    *   Revenez dans votre projet ici.
    *   Ouvrez le fichier : **`src/app/layout.tsx`**.
    *   Collez la balise que vous avez copiée de Google juste en dessous de la ligne où il est écrit `<head>`.
    *   Le fichier `layout.tsx` a déjà un emplacement préparé pour vous.

5.  **Publiez à nouveau les changements :**
    *   Utilisez les 3 commandes `git` habituelles (`add`, `commit`, `push`) pour mettre votre site à jour avec la nouvelle balise.

6.  **Finalisez la vérification :**
    *   Retournez sur la page de Google Search Console et cliquez sur le bouton **"VALIDER"**.

Une fois cette opération effectuée, votre site sera officiellement connu de Google, ce qui accélérera grandement son apparition dans les résultats de recherche.
