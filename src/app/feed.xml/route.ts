import { blogPosts } from "@/lib/blog-data";
import { CONTACT, SITE_URL } from "@/lib/constants";

/**
 * Generate an opengraph image URL for a blog post.
 * Next.js generates these via the opengraph-image route convention.
 */
function ogImageUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}/opengraph-image`;
}

/**
 * Estimate the word count of a post from its content array,
 * then return a short plain-text summary for the content:encoded body.
 */
function contentToHtml(post: (typeof blogPosts)[number]): string {
  const parts: string[] = [];
  // Intro paragraph
  if (post.content[0]) {
    parts.push(`<p>${post.content[0]}</p>`);
  }
  // Headings + paragraphs
  post.headings.forEach((heading, i) => {
    const paraIndex = i + 1;
    parts.push(`<h2>${heading.text}</h2>`);
    if (paraIndex < post.content.length) {
      parts.push(`<p>${post.content[paraIndex]}</p>`);
    }
  });
  return parts.join("\n      ");
}

export async function GET() {
  const items = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const imageUrl = ogImageUrl(post.slug);

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${contentToHtml(post)}]]></content:encoded>
      <author>${post.author} &lt;${CONTACT.email}&gt;</author>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${postUrl}</guid>
      <enclosure url="${imageUrl}" length="0" type="image/png" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Retech Solutions Blog</title>
    <link>${SITE_URL}</link>
    <description>Insights on custom software development, CMS, CRM, ERP solutions, AI-powered digital products, and IT outsourcing from Retech Solutions in Vietnam.</description>
    <language>en</language>
    <copyright>Copyright ${new Date().getFullYear()} Retech Solutions Co., Ltd.</copyright>
    <managingEditor>${CONTACT.email} (Retech Solutions)</managingEditor>
    <webMaster>${CONTACT.email} (Retech Solutions)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/og-image.png</url>
      <title>Retech Solutions Blog</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
