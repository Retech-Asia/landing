import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SITE_URL, CONTACT } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Retech Solutions. Governs use of our website & software development services including CMS, CRM, ERP & AI solutions.",
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms governing use of Retech Solutions website & software services.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description:
      "Terms governing use of Retech Solutions website & software services."
  },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        text: 'By accessing or using the website at retech.asia (the "Site") or engaging the services of Retech Solutions Co., Ltd. ("Retech Solutions," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our Site or services.',
      },
      {
        text: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Site or services after any changes constitutes your acceptance of the updated Terms.",
      },
    ],
  },
  {
    id: "services",
    title: "2. Services Description",
    content: [
      {
        text: "Retech Solutions provides software development and IT outsourcing services, including but not limited to:",
      },
      {
        list: [
          "Custom Content Management Systems (CMS)",
          "Customer Relationship Management (CRM) systems",
          "Enterprise Resource Planning (ERP) solutions",
          "AI-powered digital products and integrations",
          "Web and mobile application development",
          "UI/UX design and consulting",
          "Dedicated development team services",
        ],
      },
      {
        text: "The specific scope, deliverables, timelines, and fees for any engagement will be outlined in a separate Statement of Work (SOW) or service agreement between Retech Solutions and the client.",
      },
    ],
  },
  {
    id: "use-of-website",
    title: "3. Use of Website",
    content: [
      {
        text: "You agree to use our Site only for lawful purposes and in accordance with these Terms. You agree not to:",
      },
      {
        list: [
          "Use the Site in any way that violates applicable laws or regulations",
          "Attempt to gain unauthorized access to any portion of the Site or its systems",
          "Interfere with or disrupt the Site's operation or servers",
          "Transmit any malicious code, viruses, or harmful content",
          "Collect or harvest personal information of other users without consent",
          "Reproduce, duplicate, or copy any part of the Site for commercial purposes without our written permission",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    content: [
      {
        text: "All content on this Site — including text, graphics, logos, images, software, and the overall design — is the property of Retech Solutions Co., Ltd. or its content suppliers and is protected by international copyright, trademark, and intellectual property laws.",
      },
      {
        text: "You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this Site without our prior written consent. The Retech Solutions name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Retech Solutions Co., Ltd.",
      },
      {
        text: "For client projects, intellectual property ownership and licensing terms will be specified in the applicable service agreement or Statement of Work.",
      },
    ],
  },
  {
    id: "client-obligations",
    title: "5. Client Obligations",
    content: [
      {
        text: "When engaging our services, clients agree to:",
      },
      {
        list: [
          "Provide accurate and complete information necessary for project execution",
          "Respond to requests for feedback, approvals, or information in a timely manner",
          "Ensure that any materials provided to Retech Solutions do not infringe on third-party intellectual property rights",
          "Make payments in accordance with the agreed-upon terms and schedule",
        ],
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "6. Limitation of Liability",
    content: [
      {
        text: "To the maximum extent permitted by applicable law, Retech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or related to your use of the Site or our services.",
      },
      {
        text: "Our total liability for any claim arising from or related to these Terms or our services shall not exceed the amount paid by you to Retech Solutions in the twelve (12) months preceding the claim.",
      },
    ],
  },
  {
    id: "warranties",
    title: "7. Warranties and Disclaimers",
    content: [
      {
        text: 'Our Site is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.',
      },
      {
        text: "Any specific warranties related to our development services and project deliverables will be outlined in the applicable service agreement or Statement of Work.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "8. Confidentiality",
    content: [
      {
        text: "Retech Solutions treats all client information, project details, and proprietary data as confidential. We implement appropriate measures to protect confidential information shared during the course of an engagement. Specific confidentiality obligations will be detailed in Non-Disclosure Agreements (NDAs) or service agreements as applicable.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    content: [
      {
        text: "These Terms shall be governed by and construed in accordance with the laws of the Socialist Republic of Vietnam, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the competent courts of Ho Chi Minh City, Vietnam.",
      },
    ],
  },
  {
    id: "severability",
    title: "10. Severability",
    content: [
      {
        text: "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
      },
    ],
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: [
      {
        text: "If you have any questions or concerns about these Terms of Service, please contact us:",
      },
      {
        contact: true,
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Terms of Service", url: `${SITE_URL}/terms-of-service` },
        ]}
      />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Terms of Service
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
                  Welcome to Retech Solutions. These Terms of Service govern your use of our website and our professional software development services. Please read them carefully before using our Site or engaging with our services.
                </p>

                {/* Sections */}
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((block, i) => {
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
