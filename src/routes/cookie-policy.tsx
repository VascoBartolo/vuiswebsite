import { createFileRoute, Link } from "@tanstack/react-router";
import { useCookieConsent } from "@/lib/cookie-consent";
import { useCopy } from "@/lib/i18n";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — VUIS" },
      {
        name: "description",
        content:
          "How VUIS uses cookies: strictly necessary, analytics and marketing categories, and how to change your choices at any time.",
      },
    ],
  }),
  component: CookiePolicy,
});

const copy = {
  en: {
    eyebrow: "Policy",
    title: "Cookie Policy",
    introBefore:
      "This page explains the cookies and similar browser storage VUIS uses, why we use them, and how to change your mind at any point. It sits alongside our",
    introLink: "privacy policy",
    currentChoice: "Your current choice",
    analytics: "Analytics",
    marketing: "Marketing",
    on: "on",
    off: "off",
    noChoice: "No choice recorded yet.",
    manage: "Manage cookie preferences",
    whatHeading: "What a cookie is",
    whatBody:
      "A cookie is a small file a site stores in your browser. We also use local storage, which works the same way for our purposes — your bag, for example, lives there so it survives a refresh. Everything below applies to both.",
    categoriesHeading: "The categories we use",
    alwaysOn: "Always on",
    optIn: "Opt in",
    examples: "Examples:",
    categories: [
      {
        name: "Strictly necessary",
        always: true,
        purpose:
          "Keeps your bag between visits, holds your sign-in session once accounts go live, and protects forms against abuse.",
        examples: "vuis-cart, vuis-cookie-consent, sign-in session token",
      },
      {
        name: "Analytics",
        always: false,
        purpose:
          "Anonymous, aggregated statistics about which pages and frames people look at, so we know what to photograph and stock next.",
        examples: "Page views, product views, referral source",
      },
      {
        name: "Marketing",
        always: false,
        purpose:
          "Measures whether a campaign led to a purchase. Set only if you opt in, and never used to build a profile of you across other sites.",
        examples: "Campaign attribution identifiers",
      },
    ],
    accountsHeading: "Accounts and sign-in",
    accountsBody:
      "When accounts launch you will be able to sign in with an email and password, or with Google or Apple. Signing in sets a strictly necessary session cookie so the site can recognise you between pages. That cookie only exists once you choose to sign in, and it is removed when you sign out.",
    changeHeading: "Changing or withdrawing consent",
    changeBody:
      "Use the button above to reopen the preferences panel at any time. You can also clear cookies and site data in your browser settings, which resets your choice and makes the banner appear again on your next visit.",
    questionsHeading: "Questions",
    questionsBefore: "Write to",
    questionsAfter: "and we will answer within two working days.",
  },
  pt: {
    eyebrow: "Política",
    title: "Política de Cookies",
    introBefore:
      "Esta página explica os cookies e o armazenamento semelhante no navegador que a VUIS utiliza, por que razão os utilizamos e como pode alterar a sua decisão em qualquer momento. Complementa a nossa",
    introLink: "política de privacidade",
    currentChoice: "A sua escolha atual",
    analytics: "Análise",
    marketing: "Marketing",
    on: "ativado",
    off: "desativado",
    noChoice: "Ainda não foi registada qualquer escolha.",
    manage: "Gerir preferências de cookies",
    whatHeading: "O que é um cookie",
    whatBody:
      "Um cookie é um pequeno ficheiro que um site guarda no seu navegador. Utilizamos também o armazenamento local, que, para os nossos fins, funciona da mesma forma — o seu saco, por exemplo, é aí guardado para não se perder quando atualiza a página. Tudo o que se segue aplica-se a ambos.",
    categoriesHeading: "As categorias que utilizamos",
    alwaysOn: "Sempre ativos",
    optIn: "Mediante consentimento",
    examples: "Exemplos:",
    categories: [
      {
        name: "Estritamente necessários",
        always: true,
        purpose:
          "Mantêm o seu saco entre visitas, guardam a sua sessão iniciada quando as contas ficarem disponíveis e protegem os formulários contra abusos.",
        examples: "vuis-cart, vuis-cookie-consent, token da sessão iniciada",
      },
      {
        name: "Análise",
        always: false,
        purpose:
          "Estatísticas anónimas e agregadas sobre as páginas e as armações que as pessoas consultam, para sabermos o que fotografar e que stock ter a seguir.",
        examples:
          "Visualizações de páginas, visualizações de produtos, origem da visita",
      },
      {
        name: "Marketing",
        always: false,
        purpose:
          "Medem se uma campanha conduziu a uma compra. Só são definidos se der o seu consentimento e nunca são utilizados para criar um perfil seu noutros sites.",
        examples: "Identificadores de atribuição de campanhas",
      },
    ],
    accountsHeading: "Contas e início de sessão",
    accountsBody:
      "Quando as contas forem lançadas, poderá iniciar sessão com um email e uma palavra-passe, ou com a Google ou a Apple. Ao iniciar sessão, é definido um cookie de sessão estritamente necessário para que o site o reconheça entre páginas. Esse cookie só existe depois de optar por iniciar sessão e é removido quando termina a sessão.",
    changeHeading: "Alterar ou retirar o consentimento",
    changeBody:
      "Utilize o botão acima para reabrir o painel de preferências em qualquer momento. Pode também limpar os cookies e os dados do site nas definições do seu navegador, o que repõe a sua escolha e faz com que o aviso volte a aparecer na sua próxima visita.",
    questionsHeading: "Questões",
    questionsBefore: "Escreva para",
    questionsAfter: "e responderemos no prazo de dois dias úteis.",
  },
};

function CookiePolicy() {
  const { consent, openPreferences } = useCookieConsent();
  const c = useCopy(copy);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
        {c.eyebrow}
      </div>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em]">
        {c.title}
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-neutral-500">
        {c.introBefore}{" "}
        <Link
          to="/privacy-policy"
          className="cursor-pointer font-semibold text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
        >
          {c.introLink}
        </Link>
        .
      </p>

      {/* Current choice + re-open the banner */}
      <div className="glass mt-10 rounded-2xl p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {c.currentChoice}
        </p>
        <p className="mt-2 text-sm font-medium text-neutral-700">
          {consent
            ? `${c.analytics} ${consent.analytics ? c.on : c.off} · ${c.marketing} ${
                consent.marketing ? c.on : c.off
              }`
            : c.noChoice}
        </p>
        <button
          type="button"
          onClick={openPreferences}
          className="mt-5 cursor-pointer rounded-full bg-neutral-900 px-6 py-3 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
        >
          {c.manage}
        </button>
      </div>

      <div className="mt-12 space-y-6 text-sm leading-relaxed text-neutral-500">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          {c.whatHeading}
        </h2>
        <p>{c.whatBody}</p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          {c.categoriesHeading}
        </h2>

        <div className="space-y-4">
          {c.categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold text-neutral-900">{cat.name}</p>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    cat.always
                      ? "bg-neutral-900 text-white"
                      : "bg-[#EAD9BC] text-neutral-800"
                  }`}
                >
                  {cat.always ? c.alwaysOn : c.optIn}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                {cat.purpose}
              </p>
              <p className="mt-2 text-xs text-neutral-400">
                <span className="font-semibold uppercase tracking-[0.2em]">
                  {c.examples}
                </span>{" "}
                {cat.examples}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          {c.accountsHeading}
        </h2>
        <p>{c.accountsBody}</p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          {c.changeHeading}
        </h2>
        <p>{c.changeBody}</p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          {c.questionsHeading}
        </h2>
        <p>
          {c.questionsBefore}{" "}
          <span className="font-semibold text-neutral-700">
            atelier@vuis.pt
          </span>{" "}
          {c.questionsAfter}
        </p>
      </div>
    </article>
  );
}
