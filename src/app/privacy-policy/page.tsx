import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SITE_URL, CONTACT } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Retech Solutions privacy policy: how we collect, use & protect your data. Your rights, data security practices & GDPR compliance.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How we collect, use & protect your data. Your rights & our security practices.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Retech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "How we collect, use & protect your data. Your rights & our security practices.",
    images: ["/images/og-image.png"],
  },
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        heading: "Personal Information",
        text: "When you interact with us — such as by filling out a contact form, subscribing to our newsletter, or requesting a consultation — we may collect personal information including your name, email address, phone number, company name, and any other details you choose to provide.",
      },
      {
        heading: "Usage Data",
        text: "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, links clicked, and the date and time of your visit. This data helps us understand how visitors use our site so we can improve the experience.",
      },
      {
        heading: "Cookies and Tracking Technologies",
        text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences at any time.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        text: "We use the information we collect for the following purposes:",
      },
      {
        list: [
          "Responding to your inquiries and providing requested services",
          "Sending relevant updates, newsletters, or marketing communications (with your consent)",
          "Improving our website, services, and overall user experience",
          "Analyzing usage trends and measuring the effectiveness of our content",
          "Ensuring the security and integrity of our website and systems",
          "Complying with legal obligations and resolving disputes",
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    title: "3. Information Sharing",
    content: [
      {
        text: "Retech Solutions does not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:",
      },
      {
        list: [
          "With trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements",
          "When required by law, regulation, or legal process",
          "To protect our rights, property, or safety, or that of our users or others",
          "In connection with a corporate transaction such as a merger, acquisition, or sale of assets",
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        text: "We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: [
      {
        text: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. When your data is no longer needed, we will securely delete or anonymize it.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    content: [
      {
        text: "Depending on your jurisdiction, you may have the following rights regarding your personal information:",
      },
      {
        list: [
          "Access: Request a copy of the personal information we hold about you",
          "Correction: Request that we correct any inaccurate or incomplete personal information",
          "Deletion: Request that we delete your personal information, subject to certain legal exceptions",
          "Portability: Request a copy of your data in a structured, machine-readable format",
          "Objection: Object to the processing of your personal information in certain circumstances",
          "Withdrawal of Consent: Withdraw your consent at any time where we rely on consent to process your data",
        ],
      },
      {
        text: 'To exercise any of these rights, please contact us at the email address listed below in the "Contact Us" section.',
      },
    ],
  },
  {
    id: "third-party-services",
    title: "7. Third-Party Services",
    content: [
      {
        text: "We use trusted third-party services to operate and improve our website. These services may collect information about your use of our site. The third-party services we use include:",
      },
      {
        heading: "Google Analytics",
        text: "We use Google Analytics to analyze website traffic and understand how visitors interact with our site. Google Analytics collects information such as how often users visit, what pages they visit, and what other sites they used prior to coming to our site. Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. You can learn more about Google Analytics practices and opt out at https://tools.google.com/dlpage/gaoptout.",
      },
      {
        heading: "Vercel",
        text: "Our website is hosted on Vercel's platform. Vercel may collect server logs containing IP addresses, browser types, and other standard web request data to deliver and optimize the hosting service. Vercel's data processing practices are governed by their own privacy policy available at https://vercel.com/legal/privacy-policy.",
      },
      {
        text: "We do not sell, share, or trade the personal information collected through these third-party services. Each third-party service operates under its own privacy policy, and we encourage you to review them.",
      },
    ],
  },
  {
    id: "cookies-detail",
    title: "8. Cookies in Detail",
    content: [
      {
        text: "Cookies are small text files stored on your device when you visit our website. We use the following types of cookies:",
      },
      {
        list: [
          "Essential cookies: Required for the website to function properly, such as remembering your cookie consent preferences",
          "Analytics cookies: Used by Google Analytics to collect anonymous data about how visitors use our site (e.g., _ga, _ga_* cookies)",
          "Performance cookies: Help us understand which pages are most and least visited, how visitors navigate the site, and where we can improve the experience",
        ],
      },
      {
        text: "You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website. Our Cookie Consent banner allows you to accept or decline non-essential cookies when you first visit our site.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "9. Third-Party Links",
    content: [
      {
        text: "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "10. Children's Privacy",
    content: [
      {
        text: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a child, we will take steps to delete that information promptly.",
      },
    ],
  },
  {
    id: "updates",
    title: "11. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will post the revised policy on this page with an updated \"Last Updated\" date. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: [
      {
        text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      },
      {
        contact: true,
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
        ]}
      />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-foreground-secondary text-lg">
              Last updated: May 19, 2026
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="space-y-10">
                {/* Intro */}
                <p className="text-foreground-secondary leading-relaxed">
                  Retech Solutions Co., Ltd. (&quot;Retech Solutions,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at retech.asia or engage with our services.
                </p>

                {/* Sections */}
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((block, i) => {
                        if ("heading" in block && "text" in block) {
                          return (
                            <div key={i}>
                              <h3 className="text-base font-semibold text-foreground mb-2">
                                {block.heading}
                              </h3>
                              <p className="text-foreground-secondary leading-relaxed">
                                {block.text}
                              </p>
                            </div>
                          );
                        }
                        if ("list" in block) {
                          return (
                            <ul key={i} className="list-disc pl-6 space-y-2 text-foreground-secondary leading-relaxed">
                              {block.list!.map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        if ("contact" in block) {
                          return (
                            <div key={i} className="space-y-2 text-foreground-secondary leading-relaxed">
                              <p>
                                <strong className="text-foreground">Company:</strong> Retech Solutions Co., Ltd.
                              </p>
                              <p>
                                <strong className="text-foreground">Email:</strong>{" "}
                                <a href={CONTACT.emailHref} className="text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm">
                                  {CONTACT.email}
                                </a>
                              </p>
                              <p>
                                <strong className="text-foreground">Address:</strong> {CONTACT.address}
                              </p>
                            </div>
                          );
                        }
                        if ("text" in block) {
                          return (
                            <p key={i} className="text-foreground-secondary leading-relaxed">
                              {block.text}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
