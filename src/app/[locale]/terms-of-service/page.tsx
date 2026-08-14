import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SITE_URL, CONTACT } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/terms-of-service", namespace: "pages.terms" });
}

type L = { en: string; vi: string };

const sections: {
  id: string;
  title: L;
  content: { heading?: L; text?: L; list?: L[]; contact?: boolean }[];
}[] = [
  {
    id: "acceptance",
    title: { en: "1. Acceptance of Terms", vi: "1. Chấp nhận Điều khoản" },
    content: [
      {
        text: {
          en: 'By accessing or using the website at retech.asia (the "Site") or engaging the services of Retech Solutions Co., Ltd. ("Retech Solutions," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our Site or services.',
          vi: 'Khi truy cập hoặc sử dụng website tại retech.asia ("Website") hoặc sử dụng dịch vụ của Công ty TNHH Retech Solutions ("Retech Solutions", "chúng tôi"), bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này ("Điều khoản"). Nếu bạn không đồng ý với bất kỳ phần nào của các Điều khoản, bạn không được sử dụng Website hoặc dịch vụ của chúng tôi.',
        },
      },
      {
        text: {
          en: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Site or services after any changes constitutes your acceptance of the updated Terms.",
          vi: "Chúng tôi bảo lưu quyền sửa đổi các Điều khoản này bất kỳ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang này. Việc bạn tiếp tục sử dụng Website hoặc dịch vụ sau bất kỳ thay đổi nào đồng nghĩa với việc bạn chấp nhận các Điều khoản đã cập nhật.",
        },
      },
    ],
  },
  {
    id: "services",
    title: { en: "2. Services Description", vi: "2. Mô tả Dịch vụ" },
    content: [
      {
        text: {
          en: "Retech Solutions provides software development and IT outsourcing services, including but not limited to:",
          vi: "Retech Solutions cung cấp các dịch vụ phát triển phần mềm và thuê ngoài công nghệ thông tin, bao gồm nhưng không giới hạn ở:",
        },
      },
      {
        list: [
          {
            en: "Custom Content Management Systems (CMS)",
            vi: "Hệ thống Quản lý Nội dung (CMS) tùy chỉnh",
          },
          {
            en: "Customer Relationship Management (CRM) systems",
            vi: "Hệ thống Quản lý Quan hệ Khách hàng (CRM)",
          },
          {
            en: "Enterprise Resource Planning (ERP) solutions",
            vi: "Giải pháp Hoạch định Nguồn lực Doanh nghiệp (ERP)",
          },
          {
            en: "AI-powered digital products and integrations",
            vi: "Sản phẩm số ứng dụng AI và các tích hợp liên quan",
          },
          {
            en: "Web and mobile application development",
            vi: "Phát triển ứng dụng web và di động",
          },
          {
            en: "UI/UX design and consulting",
            vi: "Thiết kế và tư vấn UI/UX",
          },
          {
            en: "Dedicated development team services",
            vi: "Dịch vụ đội ngũ phát triển chuyên trách",
          },
        ],
      },
      {
        text: {
          en: "The specific scope, deliverables, timelines, and fees for any engagement will be outlined in a separate Statement of Work (SOW) or service agreement between Retech Solutions and the client.",
          vi: "Phạm vi cụ thể, sản phẩm bàn giao, tiến độ và phí cho mỗi dự án sẽ được nêu trong Bản thỏa thuận Công việc (SOW) hoặc hợp đồng dịch vụ riêng biệt giữa Retech Solutions và khách hàng.",
        },
      },
    ],
  },
  {
    id: "use-of-website",
    title: { en: "3. Use of Website", vi: "3. Sử dụng Website" },
    content: [
      {
        text: {
          en: "You agree to use our Site only for lawful purposes and in accordance with these Terms. You agree not to:",
          vi: "Bạn đồng ý chỉ sử dụng Website của chúng tôi cho các mục đích hợp pháp và tuân thủ các Điều khoản này. Bạn đồng ý không:",
        },
      },
      {
        list: [
          {
            en: "Use the Site in any way that violates applicable laws or regulations",
            vi: "Sử dụng Website theo bất kỳ cách nào vi phạm luật pháp hoặc quy định hiện hành",
          },
          {
            en: "Attempt to gain unauthorized access to any portion of the Site or its systems",
            vi: "Cố gắng truy cập trái phép vào bất kỳ phần nào của Website hoặc hệ thống của Website",
          },
          {
            en: "Interfere with or disrupt the Site's operation or servers",
            vi: "Cản trở hoặc làm gián đoạn hoạt động của Website hoặc máy chủ",
          },
          {
            en: "Transmit any malicious code, viruses, or harmful content",
            vi: "Truyền bất kỳ mã độc, vi-rút hoặc nội dung có hại nào",
          },
          {
            en: "Collect or harvest personal information of other users without consent",
            vi: "Thu thập hoặc khai thác thông tin cá nhân của người dùng khác mà không có sự đồng ý",
          },
          {
            en: "Reproduce, duplicate, or copy any part of the Site for commercial purposes without our written permission",
            vi: "Sao chép hoặc nhân bản bất kỳ phần nào của Website cho mục đích thương mại mà không có sự cho phép bằng văn bản của chúng tôi",
          },
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: { en: "4. Intellectual Property", vi: "4. Sở hữu Trí tuệ" },
    content: [
      {
        text: {
          en: "All content on this Site, including text, graphics, logos, images, software, and the overall design, is the property of Retech Solutions Co., Ltd. or its content suppliers and is protected by international copyright, trademark, and intellectual property laws.",
          vi: "Mọi nội dung trên Website này, bao gồm văn bản, đồ họa, logo, hình ảnh, phần mềm và thiết kế tổng thể, là tài sản của Công ty TNHH Retech Solutions hoặc các nhà cung cấp nội dung của công ty, và được bảo hộ bởi các quy định pháp luật quốc tế về bản quyền, nhãn hiệu và sở hữu trí tuệ.",
        },
      },
      {
        text: {
          en: "You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this Site without our prior written consent. The Retech Solutions name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Retech Solutions Co., Ltd.",
          vi: "Bạn không được sao chép, phân phối, sửa đổi, tạo tác phẩm phái sinh, hiển thị công khai hoặc khai thác thương mại bất kỳ nội dung nào từ Website này mà không có sự đồng ý bằng văn bản trước đó của chúng tôi. Tên gọi Retech Solutions, logo và tất cả các tên gọi, logo, tên sản phẩm và dịch vụ, thiết kế và khẩu hiệu liên quan là nhãn hiệu của Công ty TNHH Retech Solutions.",
        },
      },
      {
        text: {
          en: "For client projects, intellectual property ownership and licensing terms will be specified in the applicable service agreement or Statement of Work.",
          vi: "Đối với các dự án của khách hàng, quyền sở hữu và các điều khoản cấp phép sở hữu trí tuệ sẽ được quy định trong hợp đồng dịch vụ hoặc Bản thỏa thuận Công việc áp dụng.",
        },
      },
    ],
  },
  {
    id: "client-obligations",
    title: { en: "5. Client Obligations", vi: "5. Nghĩa vụ của Khách hàng" },
    content: [
      {
        text: {
          en: "When engaging our services, clients agree to:",
          vi: "Khi sử dụng dịch vụ của chúng tôi, khách hàng đồng ý:",
        },
      },
      {
        list: [
          {
            en: "Provide accurate and complete information necessary for project execution",
            vi: "Cung cấp thông tin chính xác và đầy đủ cần thiết cho việc thực hiện dự án",
          },
          {
            en: "Respond to requests for feedback, approvals, or information in a timely manner",
            vi: "Phản hồi kịp thời các yêu cầu về góp ý, phê duyệt hoặc cung cấp thông tin",
          },
          {
            en: "Ensure that any materials provided to Retech Solutions do not infringe on third-party intellectual property rights",
            vi: "Đảm bảo rằng mọi tài liệu cung cấp cho Retech Solutions không xâm phạm quyền sở hữu trí tuệ của bên thứ ba",
          },
          {
            en: "Make payments in accordance with the agreed-upon terms and schedule",
            vi: "Thanh toán theo các điều khoản và lịch trình đã thỏa thuận",
          },
        ],
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: { en: "6. Limitation of Liability", vi: "6. Giới hạn Trách nhiệm" },
    content: [
      {
        text: {
          en: "To the maximum extent permitted by applicable law, Retech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or related to your use of the Site or our services.",
          vi: "Trong phạm vi tối đa được pháp luật hiện hành cho phép, Retech Solutions không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính trừng phạt nào, bao gồm nhưng không giới hạn ở việc mất lợi nhuận, dữ liệu, quyền sử dụng hoặc uy tín, phát sinh từ hoặc liên quan đến việc bạn sử dụng Website hoặc dịch vụ của chúng tôi.",
        },
      },
      {
        text: {
          en: "Our total liability for any claim arising from or related to these Terms or our services shall not exceed the amount paid by you to Retech Solutions in the twelve (12) months preceding the claim.",
          vi: "Tổng trách nhiệm của chúng tôi đối với bất kỳ khiếu nại nào phát sinh từ hoặc liên quan đến các Điều khoản hoặc dịch vụ này sẽ không vượt quá số tiền bạn đã thanh toán cho Retech Solutions trong mười hai (12) tháng trước khi khiếu nại phát sinh.",
        },
      },
    ],
  },
  {
    id: "warranties",
    title: { en: "7. Warranties and Disclaimers", vi: "7. Bảo đảm và Tuyên bố Miễn trừ" },
    content: [
      {
        text: {
          en: 'Our Site is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.',
          vi: 'Website của chúng tôi được cung cấp trên cơ sở "nguyên trạng" và "khi khả dụng" mà không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý. Chúng tôi không bảo đảm rằng Website sẽ hoạt động liên tục, không có lỗi hoặc không chứa vi-rút hoặc các thành phần có hại khác.',
        },
      },
      {
        text: {
          en: "Any specific warranties related to our development services and project deliverables will be outlined in the applicable service agreement or Statement of Work.",
          vi: "Mọi bảo đảm cụ thể liên quan đến dịch vụ phát triển và sản phẩm bàn giao của chúng tôi sẽ được nêu trong hợp đồng dịch vụ hoặc Bản thỏa thuận Công việc áp dụng.",
        },
      },
    ],
  },
  {
    id: "confidentiality",
    title: { en: "8. Confidentiality", vi: "8. Bảo mật Thông tin" },
    content: [
      {
        text: {
          en: "Retech Solutions treats all client information, project details, and proprietary data as confidential. We implement appropriate measures to protect confidential information shared during the course of an engagement. Specific confidentiality obligations will be detailed in Non-Disclosure Agreements (NDAs) or service agreements as applicable.",
          vi: "Retech Solutions coi mọi thông tin khách hàng, chi tiết dự án và dữ liệu độc quyền là thông tin bảo mật. Chúng tôi áp dụng các biện pháp thích hợp để bảo vệ thông tin bảo mật được chia sẻ trong quá trình hợp tác. Các nghĩa vụ bảo mật cụ thể sẽ được quy định chi tiết trong Thỏa thuận Bảo mật (NDA) hoặc hợp đồng dịch vụ khi áp dụng.",
        },
      },
    ],
  },
  {
    id: "governing-law",
    title: { en: "9. Governing Law", vi: "9. Luật Áp dụng" },
    content: [
      {
        text: {
          en: "These Terms shall be governed by and construed in accordance with the laws of the Socialist Republic of Vietnam, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the competent courts of Ho Chi Minh City, Vietnam.",
          vi: "Các Điều khoản này được điều chỉnh và giải thích theo pháp luật của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, không tính đến các quy định về xung đột pháp luật. Mọi tranh chấp phát sinh từ các Điều khoản hoặc dịch vụ này phải được giải quyết thông qua thương lượng trên tinh thần thiện chí. Nếu thương lượng không thành, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền tại Thành phố Hồ Chí Minh, Việt Nam giải quyết.",
        },
      },
    ],
  },
  {
    id: "severability",
    title: { en: "10. Severability", vi: "10. Tính Tách biệt của Điều khoản" },
    content: [
      {
        text: {
          en: "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
          vi: "Nếu bất kỳ điều khoản nào của các Điều khoản này bị Tòa án có thẩm quyền tuyên là vô hiệu hoặc không thể thực thi, các điều khoản còn lại vẫn tiếp tục có hiệu lực đầy đủ. Điều khoản vô hiệu sẽ được sửa đổi ở mức tối thiểu cần thiết để trở nên hợp lệ và có thể thực thi.",
        },
      },
    ],
  },
  {
    id: "contact",
    title: { en: "11. Contact Us", vi: "11. Liên hệ với chúng tôi" },
    content: [
      {
        text: {
          en: "If you have any questions or concerns about these Terms of Service, please contact us:",
          vi: "Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về các Điều khoản Dịch vụ này, vui lòng liên hệ:",
        },
      },
      {
        contact: true,
      },
    ],
  },
];

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const tr = (l: L) => (isEn ? l.en : l.vi);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Terms of Service", url: `${SITE_URL}/${locale}/terms-of-service` },
        ]}
      />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, isEn ? { label: "Terms of Service" } : { label: "Điều khoản Dịch vụ" }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {isEn ? "Terms of Service" : "Điều khoản Dịch vụ"}
            </h1>
            <p className="text-foreground-secondary text-lg">
              {isEn ? "Last updated: May 19, 2026" : "Cập nhật lần cuối: 19/05/2026"}
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
                  {isEn
                    ? "Welcome to Retech Solutions. These Terms of Service govern your use of our website and our professional software development services. Please read them carefully before using our Site or engaging with our services."
                    : "Chào mừng bạn đến với Retech Solutions. Các Điều khoản Dịch vụ này điều chỉnh việc bạn sử dụng website và dịch vụ phát triển phần mềm chuyên nghiệp của chúng tôi. Vui lòng đọc kỹ trước khi sử dụng Website hoặc dịch vụ của chúng tôi."}
                </p>

                {/* Sections */}
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {tr(section.title)}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((block, i) => {
                        if (block.list) {
                          return (
                            <ul key={i} className="list-disc pl-6 space-y-2 text-foreground-secondary leading-relaxed">
                              {block.list.map((item, j) => (
                                <li key={j}>{tr(item)}</li>
                              ))}
                            </ul>
                          );
                        }
                        if ("contact" in block && block.contact) {
                          return (
                            <div key={i} className="space-y-2 text-foreground-secondary leading-relaxed">
                              <p>
                                <strong className="text-foreground">{isEn ? "Company:" : "Công ty:"}</strong> Retech Solutions Co., Ltd.
                              </p>
                              <p>
                                <strong className="text-foreground">Email:</strong>{" "}
                                <a href={CONTACT.emailHref} className="text-brand nav-active-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm">
                                  {CONTACT.email}
                                </a>
                              </p>
                              <p>
                                <strong className="text-foreground">{isEn ? "Address:" : "Địa chỉ:"}</strong> {CONTACT.address}
                              </p>
                            </div>
                          );
                        }
                        if (block.text) {
                          return (
                            <p key={i} className="text-foreground-secondary leading-relaxed">
                              {tr(block.text)}
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
