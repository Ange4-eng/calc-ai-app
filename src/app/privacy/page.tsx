import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4 bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Politique de Confidentialité</CardTitle>
          <CardDescription>Dernière mise à jour : 19 juillet 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Introduction</h2>
            <p>Bienvenue sur CalcAI. Nous respectons votre vie privée et nous nous engageons à la protéger. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre application.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. Informations que nous collectons</h2>
            <p>Nous pouvons collecter des informations vous concernant de différentes manières. Les informations que nous pouvons collecter via l'Application dépendent du contenu et des matériaux que vous utilisez, et comprennent :</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Données personnelles :</strong> Les informations d'identification personnelle, telles que votre nom et votre adresse e-mail, que vous nous donnez volontairement lorsque vous vous inscrivez à l'Application.</li>
              <li><strong>Informations de paiement :</strong> Nous utilisons un processeur de paiement tiers (Stripe) pour gérer les paiements. Nous ne stockons pas les informations de votre carte de crédit.</li>
              <li><strong>Données d'utilisation :</strong> Les informations que votre appareil envoie lorsque vous utilisez l'application, telles que vos actions au sein de l'application.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Utilisation de vos informations</h2>
            <p>Avoir des informations précises sur vous nous permet de vous offrir une expérience fluide, efficace et personnalisée. Spécifiquement, nous pouvons utiliser les informations collectées à votre sujet via l'Application pour :</p>
             <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Créer et gérer votre compte.</li>
                <li>Traiter les paiements et les remboursements.</li>
                <li>Améliorer l'Application et personnaliser votre expérience.</li>
                <li>Communiquer avec vous concernant votre compte ou vos commandes.</li>
            </ul>
          </section>
           <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Contact</h2>
            <p>Si vous avez des questions ou des commentaires sur cette politique de confidentialité, veuillez nous contacter à : contact@calcai.app</p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
