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
  return buildPageMetadata({ locale, path: "/privacy-policy", namespace: "pages.privacy" });
}

type L = { en: string; vi: string };

const sections: {
  id: string;
  title: L;
  content: { heading?: L; text?: L; list?: L[]; contact?: boolean }[];
}[] = [
  {
    id: "information-we-collect",
    title: { en: "1. Information We Collect", vi: "1. Thông tin chúng tôi Thu thập" },
    content: [
      {
        heading: { en: "Personal Information", vi: "Thông tin Cá nhân" },
        text: {
          en: "When you interact with us (such as by filling out a contact form, subscribing to our newsletter, or requesting a consultation), we may collect personal information including your name, email address, phone number, company name, and any other details you choose to provide.",
          vi: "Khi bạn tương tác với chúng tôi (chẳng hạn như điền vào biểu mẫu liên hệ, đăng ký nhận bản tin hoặc yêu cầu tư vấn), chúng tôi có thể thu thập thông tin cá nhân bao gồm họ tên, địa chỉ email, số điện thoại, tên công ty và bất kỳ thông tin khác mà bạn chọn cung cấp.",
        },
      },
      {
        heading: { en: "Usage Data", vi: "Dữ liệu Sử dụng" },
        text: {
          en: "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, links clicked, and the date and time of your visit. This data helps us understand how visitors use our site so we can improve the experience.",
          vi: "Chúng tôi tự động thu thập một số thông tin nhất định khi bạn truy cập website, bao gồm địa chỉ IP, loại trình duyệt, hệ điều hành, URL dẫn nguồn, các trang đã xem, các liên kết đã nhấp vào, cũng như ngày và giờ truy cập. Dữ liệu này giúp chúng tôi hiểu cách khách truy cập sử dụng website nhằm cải thiện trải nghiệm.",
        },
      },
      {
        heading: { en: "Cookies and Tracking Technologies", vi: "Cookie và Công nghệ Theo dõi" },
        text: {
          en: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences at any time.",
          vi: "Chúng tôi sử dụng Cookie và các công nghệ theo dõi tương tự để nâng cao trải nghiệm duyệt web, phân tích lưu lượng truy cập website và hiểu rõ sở thích của người dùng. Bạn có thể quản lý cài đặt Cookie thông qua tùy chọn trình duyệt của mình bất kỳ lúc nào.",
        },
      },
    ],
  },
  {
    id: "how-we-use",
    title: { en: "2. How We Use Your Information", vi: "2. Cách chúng tôi Sử dụng Thông tin của Bạn" },
    content: [
      {
        text: {
          en: "We use the information we collect for the following purposes:",
          vi: "Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:",
        },
      },
      {
        list: [
          {
            en: "Responding to your inquiries and providing requested services",
            vi: "Phản hồi các thắc mắc của bạn và cung cấp các dịch vụ theo yêu cầu",
          },
          {
            en: "Sending relevant updates, newsletters, or marketing communications (with your consent)",
            vi: "Gửi các bản cập nhật, bản tin hoặc thông tin truyền thông tiếp thị liên quan (có sự đồng ý của bạn)",
          },
          {
            en: "Improving our website, services, and overall user experience",
            vi: "Cải thiện website, dịch vụ và trải nghiệm người dùng tổng thể",
          },
          {
            en: "Analyzing usage trends and measuring the effectiveness of our content",
            vi: "Phân tích xu hướng sử dụng và đo lường hiệu quả của nội dung",
          },
          {
            en: "Ensuring the security and integrity of our website and systems",
            vi: "Đảm bảo an toàn và toàn vẹn của website và hệ thống của chúng tôi",
          },
          {
            en: "Complying with legal obligations and resolving disputes",
            vi: "Tuân thủ các nghĩa vụ pháp lý và giải quyết tranh chấp",
          },
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    title: { en: "3. Information Sharing", vi: "3. Chia sẻ Thông tin" },
    content: [
      {
        text: {
          en: "Retech Solutions does not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:",
          vi: "Retech Solutions không bán, trao đổi hoặc cho thuê Thông tin Cá nhân của bạn cho bên thứ ba. Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:",
        },
      },
      {
        list: [
          {
            en: "With trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements",
            vi: "Với các nhà cung cấp dịch vụ đáng tin cậy hỗ trợ chúng tôi vận hành website và hoạt động kinh doanh, theo các thỏa thuận bảo mật",
          },
          {
            en: "When required by law, regulation, or legal process",
            vi: "Khi được pháp luật, quy định hoặc thủ tục pháp lý yêu cầu",
          },
          {
            en: "To protect our rights, property, or safety, or that of our users or others",
            vi: "Để bảo vệ quyền, tài sản hoặc an toàn của chúng tôi, của người dùng hoặc của người khác",
          },
          {
            en: "In connection with a corporate transaction such as a merger, acquisition, or sale of assets",
            vi: "Trong giao dịch doanh nghiệp như sáp nhập, mua lại hoặc bán tài sản",
          },
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: { en: "4. Data Security", vi: "4. Bảo mật Dữ liệu" },
    content: [
      {
        text: {
          en: "We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
          vi: "Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức theo tiêu chuẩn ngành để bảo vệ Thông tin Cá nhân của bạn khỏi truy cập, thay đổi, tiết lộ hoặc phá hủy trái phép. Các biện pháp này bao gồm mã hóa, kiểm soát truy cập và đánh giá bảo mật định kỳ. Tuy nhiên, không có phương thức truyền tải qua Internet hay lưu trữ điện tử nào an toàn 100%, và chúng tôi không thể đảm bảo an toàn tuyệt đối.",
        },
      },
    ],
  },
  {
    id: "data-retention",
    title: { en: "5. Data Retention", vi: "5. Lưu giữ Dữ liệu" },
    content: [
      {
        text: {
          en: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. When your data is no longer needed, we will securely delete or anonymize it.",
          vi: "Chúng tôi chỉ lưu giữ Thông tin Cá nhân của bạn trong thời gian cần thiết để thực hiện các mục đích thu thập, bao gồm đáp ứng các yêu cầu pháp lý, kế toán hoặc báo cáo. Khi dữ liệu của bạn không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh dữ liệu đó một cách an toàn.",
        },
      },
    ],
  },
  {
    id: "your-rights",
    title: { en: "6. Your Rights", vi: "6. Quyền của Bạn" },
    content: [
      {
        text: {
          en: "Depending on your jurisdiction, you may have the following rights regarding your personal information:",
          vi: "Tùy thuộc vào khu vực pháp lý áp dụng, bạn có thể có các quyền sau đối với Thông tin Cá nhân của mình:",
        },
      },
      {
        list: [
          {
            en: "Access: Request a copy of the personal information we hold about you",
            vi: "Quyền truy cập: Yêu cầu cung cấp bản sao Thông tin Cá nhân mà chúng tôi lưu giữ về bạn",
          },
          {
            en: "Correction: Request that we correct any inaccurate or incomplete personal information",
            vi: "Quyền chỉnh sửa: Yêu cầu chúng tôi chỉnh sửa mọi Thông tin Cá nhân không chính xác hoặc không đầy đủ",
          },
          {
            en: "Deletion: Request that we delete your personal information, subject to certain legal exceptions",
            vi: "Quyền xóa: Yêu cầu chúng tôi xóa Thông tin Cá nhân của bạn, tùy thuộc vào một số ngoại lệ pháp lý nhất định",
          },
          {
            en: "Portability: Request a copy of your data in a structured, machine-readable format",
            vi: "Quyền chuyển dữ liệu: Yêu cầu cung cấp bản sao dữ liệu của bạn ở định dạng có cấu trúc, máy có thể đọc được",
          },
          {
            en: "Objection: Object to the processing of your personal information in certain circumstances",
            vi: "Quyền phản đối: Phản đối việc xử lý Thông tin Cá nhân của bạn trong một số trường hợp nhất định",
          },
          {
            en: "Withdrawal of Consent: Withdraw your consent at any time where we rely on consent to process your data",
            vi: "Quyền rút lại đồng ý: Rút lại sự đồng ý của bạn bất kỳ lúc nào khi chúng tôi xử lý dữ liệu dựa trên sự đồng ý",
          },
        ],
      },
      {
        text: {
          en: 'To exercise any of these rights, please contact us at the email address listed below in the "Contact Us" section.',
          vi: 'Để thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi qua địa chỉ email được nêu trong phần "Liên hệ với chúng tôi" dưới đây.',
        },
      },
    ],
  },
  {
    id: "third-party-services",
    title: { en: "7. Third-Party Services", vi: "7. Dịch vụ Bên thứ ba" },
    content: [
      {
        text: {
          en: "We use trusted third-party services to operate and improve our website. These services may collect information about your use of our site. The third-party services we use include:",
          vi: "Chúng tôi sử dụng các dịch vụ bên thứ ba đáng tin cậy để vận hành và cải thiện website. Các dịch vụ này có thể thu thập thông tin về cách bạn sử dụng website của chúng tôi. Các dịch vụ bên thứ ba chúng tôi sử dụng bao gồm:",
        },
      },
      {
        heading: { en: "Google Analytics", vi: "Google Analytics" },
        text: {
          en: "We use Google Analytics to analyze website traffic and understand how visitors interact with our site. Google Analytics collects information such as how often users visit, what pages they visit, and what other sites they used prior to coming to our site. Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. You can learn more about Google Analytics practices and opt out at https://tools.google.com/dlpage/gaoptout.",
          vi: "Chúng tôi sử dụng Google Analytics để phân tích lưu lượng truy cập website và hiểu cách khách truy cập tương tác với website. Google Analytics thu thập các thông tin như tần suất người dùng truy cập, những trang họ xem và những website khác họ đã sử dụng trước khi đến website của chúng tôi. Google Analytics chỉ thu thập địa chỉ IP được gán cho bạn vào ngày bạn truy cập website này, thay vì họ tên hoặc thông tin định danh khác của bạn. Bạn có thể tìm hiểu thêm về hoạt động của Google Analytics và chọn không tham gia tại https://tools.google.com/dlpage/gaoptout.",
        },
      },
      {
        heading: { en: "Vercel", vi: "Vercel" },
        text: {
          en: "Our website is hosted on Vercel's platform. Vercel may collect server logs containing IP addresses, browser types, and other standard web request data to deliver and optimize the hosting service. Vercel's data processing practices are governed by their own privacy policy available at https://vercel.com/legal/privacy-policy.",
          vi: "Website của chúng tôi được lưu trữ trên nền tảng Vercel. Vercel có thể thu thập nhật ký máy chủ chứa địa chỉ IP, loại trình duyệt và dữ liệu yêu cầu web tiêu chuẩn khác để cung cấp và tối ưu dịch vụ lưu trữ. Hoạt động xử lý dữ liệu của Vercel được điều chỉnh bởi chính sách bảo mật riêng của họ tại https://vercel.com/legal/privacy-policy.",
        },
      },
      {
        text: {
          en: "We do not sell, share, or trade the personal information collected through these third-party services. Each third-party service operates under its own privacy policy, and we encourage you to review them.",
          vi: "Chúng tôi không bán, chia sẻ hoặc trao đổi Thông tin Cá nhân thu thập được thông qua các dịch vụ bên thứ ba này. Mỗi dịch vụ bên thứ ba hoạt động theo chính sách bảo mật riêng của mình, và chúng tôi khuyến khích bạn xem xét các chính sách đó.",
        },
      },
    ],
  },
  {
    id: "cookies-detail",
    title: { en: "8. Cookies in Detail", vi: "8. Chi tiết về Cookie" },
    content: [
      {
        text: {
          en: "Cookies are small text files stored on your device when you visit our website. We use the following types of cookies:",
          vi: "Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập website. Chúng tôi sử dụng các loại Cookie sau:",
        },
      },
      {
        list: [
          {
            en: "Essential cookies: Required for the website to function properly, such as remembering your cookie consent preferences",
            vi: "Cookie thiết yếu: Cần thiết để website hoạt động bình thường, chẳng hạn như ghi nhớ tùy chọn đồng ý Cookie của bạn",
          },
          {
            en: "Analytics cookies: Used by Google Analytics to collect anonymous data about how visitors use our site (e.g., _ga, _ga_* cookies)",
            vi: "Cookie phân tích: Được Google Analytics sử dụng để thu thập dữ liệu ẩn danh về cách khách truy cập sử dụng website (ví dụ: Cookie _ga, _ga_*)",
          },
          {
            en: "Performance cookies: Help us understand which pages are most and least visited, how visitors navigate the site, and where we can improve the experience",
            vi: "Cookie hiệu suất: Giúp chúng tôi hiểu những trang được xem nhiều nhất và ít nhất, cách khách truy cập điều hướng website và nơi chúng tôi có thể cải thiện trải nghiệm",
          },
        ],
      },
      {
        text: {
          en: "You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website. Our Cookie Consent banner allows you to accept or decline non-essential cookies when you first visit our site.",
          vi: "Bạn có thể quản lý hoặc tắt Cookie thông qua cài đặt trình duyệt của mình bất kỳ lúc nào. Xin lưu ý rằng việc tắt một số Cookie nhất định có thể ảnh hưởng đến chức năng của website. Biểu ngữ Đồng ý Cookie của chúng tôi cho phép bạn chấp nhận hoặc từ chối các Cookie không thiết yếu khi bạn truy cập website lần đầu.",
        },
      },
    ],
  },
  {
    id: "third-party-links",
    title: { en: "9. Third-Party Links", vi: "9. Liên kết Bên thứ ba" },
    content: [
      {
        text: {
          en: "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
          vi: "Website của chúng tôi có thể chứa các liên kết đến các website hoặc dịch vụ bên thứ ba. Chúng tôi không chịu trách nhiệm về hoạt động bảo mật hoặc nội dung của các trang web bên ngoài đó. Chúng tôi khuyến khích bạn xem xét chính sách bảo mật của bất kỳ trang web bên thứ ba nào mà bạn truy cập.",
        },
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: { en: "10. Children's Privacy", vi: "10. Quyền riêng tư của Trẻ em" },
    content: [
      {
        text: {
          en: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a child, we will take steps to delete that information promptly.",
          vi: "Các dịch vụ của chúng tôi không dành cho cá nhân dưới 18 tuổi. Chúng tôi không cố ý thu thập Thông tin Cá nhân từ trẻ em. Nếu chúng tôi nhận thấy đã vô tình thu thập dữ liệu cá nhân từ một trẻ em, chúng tôi sẽ thực hiện các bước để xóa thông tin đó một cách kịp thời.",
        },
      },
    ],
  },
  {
    id: "updates",
    title: { en: "11. Changes to This Policy", vi: "11. Thay đổi Chính sách" },
    content: [
      {
        text: {
          en: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will post the revised policy on this page with an updated \"Last Updated\" date. We encourage you to review this policy periodically.",
          vi: "Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian để phản ánh các thay đổi về hoạt động, công nghệ hoặc yêu cầu pháp lý. Chúng tôi sẽ đăng chính sách đã sửa đổi trên trang này kèm theo ngày \"Cập nhật lần cuối\" mới. Chúng tôi khuyến khích bạn định kỳ xem lại chính sách này.",
        },
      },
    ],
  },
  {
    id: "contact",
    title: { en: "12. Contact Us", vi: "12. Liên hệ với chúng tôi" },
    content: [
      {
        text: {
          en: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
          vi: "Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu nào liên quan đến Chính sách Bảo mật này hoặc hoạt động xử lý dữ liệu của chúng tôi, vui lòng liên hệ:",
        },
      },
      {
        contact: true,
      },
    ],
  },
];

export default async function PrivacyPolicyPage({
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
          { name: "Privacy Policy", url: `${SITE_URL}/${locale}/privacy-policy` },
        ]}
      />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, isEn ? { label: "Privacy Policy" } : { label: "Chính sách Bảo mật" }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {isEn ? "Privacy Policy" : "Chính sách Bảo mật"}
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
                    ? 'Retech Solutions Co., Ltd. ("Retech Solutions," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at retech.asia or engage with our services.'
                    : 'Công ty TNHH Retech Solutions ("Retech Solutions", "chúng tôi") cam kết bảo vệ quyền riêng tư và bảo mật Thông tin Cá nhân của bạn. Chính sách Bảo mật này mô tả cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập website retech.asia hoặc sử dụng dịch vụ của chúng tôi.'}
                </p>

                {/* Sections */}
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {tr(section.title)}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((block, i) => {
                        if (block.heading && block.text) {
                          return (
                            <div key={i}>
                              <h3 className="text-base font-semibold text-foreground mb-2">
                                {tr(block.heading)}
                              </h3>
                              <p className="text-foreground-secondary leading-relaxed">
                                {tr(block.text)}
                              </p>
                            </div>
                          );
                        }
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
                                <strong className="text-foreground">{isEn ? "Email:" : "Email:"}</strong>{" "}
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
