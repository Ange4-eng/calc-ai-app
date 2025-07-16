import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4 bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Conditions Générales d'Utilisation</CardTitle>
          <CardDescription>Dernière mise à jour : 19 juillet 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Accord sur les conditions</h2>
            <p>En utilisant l'application CalcAI (le "Service"), vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder au Service.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. Abonnements</h2>
            <p>Certaines parties du Service sont facturées sur la base d'un abonnement ("Abonnement(s)"). Vous serez facturé à l'avance sur une base récurrente et périodique ("Cycle de facturation"). Les cycles de facturation sont définis sur une base mensuelle.</p>
             <p className="mt-2">À la fin de chaque Cycle de facturation, votre Abonnement sera automatiquement renouvelé dans les mêmes conditions, sauf si vous l'annulez ou si CalcAI l'annule. Vous pouvez annuler le renouvellement de votre Abonnement via votre page de gestion de compte en ligne ou en contactant le support client.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Comptes</h2>
            <p>Lorsque vous créez un compte chez nous, vous devez nous fournir des informations exactes, complètes et à jour à tout moment. Le non-respect de cette obligation constitue une violation des Conditions, qui peut entraîner la résiliation immédiate de votre compte sur notre Service.</p>
          </section>
           <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Modifications</h2>
            <p>Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous nous efforcerons de fournir un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions.</p>
          </section>
           <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Contact</h2>
            <p>Si vous avez des questions sur ces Conditions, veuillez nous contacter à : contact@calcai.app</p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
