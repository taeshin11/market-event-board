import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Privacy Policy | MarketEventBoard",
    description:
      "Read the MarketEventBoard privacy policy to understand how we collect, use, and protect your data when you use our free economic calendar.",
    alternates: {
      canonical: `https://market-event-board.vercel.app/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        ko: "/ko/privacy",
        ja: "/ja/privacy",
        zh: "/zh/privacy",
        es: "/es/privacy",
        fr: "/fr/privacy",
        de: "/de/privacy",
        pt: "/pt/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Privacy Policy</h1>
      <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: April 13, 2026</p>

      <div className="space-y-8 text-[var(--text-muted)]">
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">1. Introduction</h2>
          <p>
            MarketEventBoard ("we", "our", or "us") operates the website located at
            https://market-event-board.vercel.app (the "Service"). This Privacy Policy explains what
            information we collect, how we use it, and your choices regarding that information. By using
            the Service you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            2. Information We Collect
          </h2>
          <p className="mb-2">
            <strong className="text-[var(--text-primary)]">Usage Data.</strong> When you visit the
            Service, we may automatically collect certain information sent by your browser or device,
            including your IP address (in anonymized form), browser type and version, pages visited,
            time and date of your visit, time spent on pages, and referring URLs. This data is used
            solely to understand aggregate usage patterns and improve the Service.
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Cookies &amp; Similar Technologies.</strong>{" "}
            We use cookies and similar tracking technologies to maintain session preferences (such as your
            selected locale) and to serve relevant advertising through Google AdSense. You can instruct
            your browser to refuse all cookies or to indicate when a cookie is being sent. However, some
            parts of the Service may not function properly without cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            3. Google AdSense &amp; Advertising
          </h2>
          <p>
            We use Google AdSense to display advertisements. Google and its partners may use cookies and
            web beacons to serve ads based on prior visits to our site or other sites on the internet.
            Google's use of advertising cookies enables it and its partners to serve ads based on your
            visit to our site and/or other sites on the Internet. You may opt out of personalized
            advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            4. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To operate and maintain the Service</li>
            <li>To analyze usage and improve content and user experience</li>
            <li>To serve relevant advertising through Google AdSense</li>
            <li>To detect and prevent technical issues or abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            5. Data Retention &amp; Security
          </h2>
          <p>
            We retain usage data only as long as necessary for the purposes described in this policy or
            as required by law. We implement reasonable technical and organizational measures to protect
            your information against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet or method of electronic storage is 100%
            secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            6. Third-Party Links
          </h2>
          <p>
            The Service may contain links to third-party websites, including official government data
            sources (BLS, Fed, BEA) and financial information providers. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any third-party
            sites. We encourage you to review the privacy policy of every site you visit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            7. Children's Privacy
          </h2>
          <p>
            The Service is not directed at anyone under the age of 13. We do not knowingly collect
            personally identifiable information from children under 13. If you are a parent or guardian
            and you believe your child has provided us with personal information, please contact us and
            we will take steps to remove that information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            8. Your Rights
          </h2>
          <p>
            Depending on your location, you may have rights under applicable privacy law (including GDPR
            or CCPA) to access, correct, or request deletion of personal data we hold about you. Because
            we collect minimal data and do not maintain user accounts, most requests can be satisfied by
            clearing your browser cookies. For other inquiries, please use the contact information below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant
            changes by posting the new policy on this page and updating the "Last updated" date at the
            top. Your continued use of the Service after changes are posted constitutes your acceptance
            of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out via the feedback link on
            the site or open an issue in the project repository.
          </p>
        </section>
      </div>
    </div>
  );
}
