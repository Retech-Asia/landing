import type {
  Article,
  Collection,
  EditorialEvent,
  FormaData,
  PublicationDestination,
  StaffMember,
} from "./types";

/**
 * Forma Studio — deterministic synthetic fixtures (Wave 2B handoff). The 8
 * seed titles, the lead-article summary/opening and the visual system come
 * verbatim from the handoff; remaining copy is completed in the same
 * editorial style with natural Vietnamese translations.
 */

const staff: StaffMember[] = [
  { id: "st-elena", name: "Elena Voss", role: "Editor-in-chief", initials: "EV", hue: 258 },
  { id: "st-marcus", name: "Marcus Chen", role: "Senior writer", initials: "MC", hue: 205 },
  { id: "st-amara", name: "Amara Diallo", role: "Managing editor", initials: "AD", hue: 150 },
  { id: "st-jonas", name: "Jonas Weber", role: "Contributing writer", initials: "JW", hue: 25 },
];

const collections: Collection[] = [
  { id: "col-materials", name: { en: "Materials & Craft", vi: "Vật liệu & thủ công" }, hue: 258 },
  { id: "col-spaces", name: { en: "Spaces & Living", vi: "Không gian & sống" }, hue: 20 },
  { id: "col-tech", name: { en: "Technology & People", vi: "Công nghệ & con người" }, hue: 170 },
];

const destinations: PublicationDestination[] = [
  {
    id: "dest-web",
    name: { en: "Web magazine", vi: "Tạp chí trực tuyến" },
    cadence: { en: "Continuous", vi: "Liên tục" },
  },
  {
    id: "dest-newsletter",
    name: { en: "Sunday newsletter", vi: "Bản tin chủ nhật" },
    cadence: { en: "Weekly", vi: "Hằng tuần" },
  },
  {
    id: "dest-quarterly",
    name: { en: "Quarterly collection", vi: "Tuyển tập quý" },
    cadence: { en: "Quarterly", vi: "Hằng quý" },
  },
];

const articles: Article[] = [
  {
    id: "art-01",
    title: { en: "The Materials Issue", vi: "Ấn bản Vật liệu" },
    summary: {
      en: "An exploration of how familiar materials influence the feel, function and longevity of everyday objects.",
      vi: "Khám phá cách những vật liệu quen thuộc ảnh hưởng đến cảm giác, công năng và tuổi thọ của các vật dụng thường ngày.",
    },
    body: {
      en: [
        "Every object tells a story through the materials it uses. A surface can communicate warmth, precision or durability before a person touches it. In this issue, we explore how thoughtful choices shape the experience of ordinary things.",
        "Brass ages into character. Oiled oak softens under the hand. Powder-coated steel stays patient through seasons of use. None of these behaviors appear on a specification sheet, yet they decide whether an object earns a permanent place on a desk or shelf.",
        "The articles in this issue follow makers who choose slower materials on purpose, and the quiet confidence those choices produce in the finished object.",
      ],
      vi: [
        "Mỗi vật thể đều kể một câu chuyện qua vật liệu tạo nên nó. Một bề mặt có thể truyền cảm giác ấm áp, chính xác hay bền bỉ trước khi ai đó chạm vào. Trong ấn bản này, chúng tôi khám phá cách những lựa chọn tinh tế định hình trải nghiệm của những vật dụng quen thuộc.",
        "Đồng thau cũ đi lại có hồn. Gỗ sồi ngâm dầu trở nên mềm mại dưới bàn tay. Thép phủ bột kiên nhẫn qua nhiều mùa sử dụng. Không đặc tính nào trong số đó xuất hiện trên bảng thông số, nhưng chính chúng quyết định một vật thể có xứng đáng có chỗ đứng lâu dài trên bàn làm việc hay kệ sách hay không.",
        "Những bài viết trong ấn bản này theo chân những người thợ chủ động chọn vật liệu mộc mạc, và sự tự tin thầm lặng mà những lựa chọn đó mang lại cho thành phẩm.",
      ],
    },
    authorId: "st-elena",
    collectionId: "col-materials",
    status: "published",
    updatedDaysAgo: 3,
    publishInDays: -3,
    destinationId: "dest-web",
  },
  {
    id: "art-02",
    title: { en: "Small Spaces, Better Living", vi: "Không gian nhỏ, sống tốt hơn" },
    summary: {
      en: "Compact homes reward deliberate design. We visit three small apartments where storage, light and flexible furniture do the quiet work of square meters.",
      vi: "Nhà nhỏ đòi hỏi thiết kế chủ động. Chúng tôi ghé thăm ba căn hộ compact nơi hệ thống lưu trữ, ánh sáng và nội thất linh hoạt đảm nhiệm vai trò của những mét vuông.",
    },
    body: {
      en: [
        "A small home is honest. It refuses to hide clutter, and it amplifies every design decision, good or bad. The three apartments in this story share a footprint under fifty square meters, and none of their owners describe the space as a compromise.",
        "In the first apartment, a full-height birch cabinet does the work of a hallway, a wardrobe and a home office. Its sliding doors never swing into the room, so every square meter stays usable at every hour of the day.",
        "The second home borrows its brightness from the staircase: replacing solid balusters with open steel cables pulled daylight two floors deep. The third treats furniture as software, on casters and foldable, updated each season as routines change.",
      ],
      vi: [
        "Một ngôi nhà nhỏ rất thật lòng. Nó không chịu che giấu sự bừa bộn, và khuếch đại mọi quyết định thiết kế, dù tốt hay xấu. Ba căn hộ trong câu chuyện này đều có diện tích dưới năm mươi mét vuông, và không chủ nhân nào gọi không gian của mình là một sự thỏa hiệp.",
        "Ở căn hộ đầu tiên, một chiếc tủ gỗ bạch dương cao hết tường đảm nhiệm vai trò hành lang, tủ quần áo và góc làm việc tại nhà. Cánh cửa trượt không bao giờ vướng vào phòng, nên từng mét vuông đều dùng được vào mọi thời điểm trong ngày.",
        "Ngôi nhà thứ hai mượn ánh sáng từ cầu thang: thay chắc lan can bằng dây thép hở kéo ánh sáng ngày sâu đến hai tầng. Ngôi nhà thứ ba coi nội thất như phần mềm: gắn bánh xe, có thể gấp gọn, cập nhật theo mùa khi thói quen thay đổi.",
      ],
    },
    authorId: "st-marcus",
    collectionId: "col-spaces",
    status: "scheduled",
    updatedDaysAgo: 1,
    publishInDays: 2,
    destinationId: "dest-newsletter",
  },
  {
    id: "art-03",
    title: { en: "Inside a Modern Workshop", vi: "Bên trong xưởng hiện đại" },
    summary: {
      en: "Tools change, but the rhythm of good craft does not. A photo essay from a workshop where hand tools and digital fabrication share one bench.",
      vi: "Công cụ thay đổi, nhưng nhịp điệu của nghề tốt thì không. Bộ ảnh từ một xưởng nơi dụng cụ thủ công và gia công số cùng chung một bàn làm việc.",
    },
    body: {
      en: [
        "The first thing you notice is the sound, not the machines. Chisels and hand planes still set the tempo here; the CNC router waits its turn like any other apprentice.",
        "Each piece starts as a full-scale drawing on the wall, checked by eye and by body reach before any file exists. Only when the drawing survives a week of daily use does it become a toolpath.",
        "The result is furniture that carries both kinds of precision: the machine's repeatable edges and the hand's corrections, recorded in faint tool marks that no render would think to include.",
      ],
      vi: [
        "Điều đầu tiên bạn cảm nhận được là âm thanh, chứ không phải những cỗ máy. Đục và máy bào thủ công vẫn giữ nhịp độ ở đây; máy CNC im lặng chờ đến lượt như một người học việc.",
        "Mỗi sản phẩm bắt đầu bằng một bản vẽ full-size trên tường, được kiểm tra bằng mắt và bằng tầm với của cơ thể trước khi bất kỳ tệp nào tồn tại. Chỉ khi bản vẽ vượt qua một tuần sử dụng thực tế, nó mới trở thành đường chạy dao.",
        "Kết quả là những món nội thất mang cả hai loại độ chính xác: đường nét lặp lại của máy và những chỉnh sửa bằng tay, được ghi lại trong vết dao mờ mà không một bản render nào nghĩ đến việc thể hiện.",
      ],
    },
    authorId: "st-jonas",
    collectionId: "col-materials",
    status: "scheduled",
    updatedDaysAgo: 4,
    publishInDays: 6,
    destinationId: "dest-web",
  },
  {
    id: "art-04",
    title: { en: "How Objects Become Interfaces", vi: "Vật thể trở thành giao diện như thế nào" },
    summary: {
      en: "Doorknobs, stove dials and light switches already follow interface rules. What product designers can learn from a century of unmarked controls.",
      vi: "Nắm cửa, núm bếp và công tắc đèn vốn đã tuân theo quy tắc giao diện. Nhà thiết kế sản phẩm có thể học được gì từ một thế kỷ điều khiển không nhãn.",
    },
    authorId: "st-marcus",
    collectionId: "col-tech",
    status: "in_review",
    updatedDaysAgo: 2,
    publishInDays: 9,
    destinationId: "dest-web",
  },
  {
    id: "art-05",
    title: { en: "Designing for Everyday Rituals", vi: "Thiết kế cho những nghi thức hằng ngày" },
    summary: {
      en: "Morning coffee, evening walks, Sunday cooking: the small repeated ceremonies our objects quietly support, and how to design for them.",
      vi: "Cà phê buổi sáng, dạo bộ buổi tối, nấu ăn chủ nhật: những nghi thức nhỏ lặp lại mà đồ vật âm thầm nâng đỡ, và cách thiết kế cho chúng.",
    },
    authorId: "st-amara",
    collectionId: "col-spaces",
    status: "in_review",
    updatedDaysAgo: 6,
    publishInDays: 13,
    destinationId: "dest-newsletter",
  },
  {
    id: "art-06",
    title: { en: "The Quiet Side of Technology", vi: "Chiều hướng tĩnh lặng của công nghệ" },
    summary: {
      en: "The best devices of the past decade got quieter, not louder. A case for calm software that waits to be useful instead of demanding attention.",
      vi: "Những thiết bị tốt nhất của thập kỷ qua ngày càng im lặng hơn, chứ không ồn ào hơn. Luận điểm cho phần mềm điềm tĩnh, chờ sẵn có ích thay vì đòi hỏi sự chú ý.",
    },
    authorId: "st-elena",
    collectionId: "col-tech",
    status: "draft",
    updatedDaysAgo: 5,
    publishInDays: 20,
    destinationId: "dest-web",
  },
  {
    id: "art-07",
    title: { en: "A Guide to Thoughtful Workspaces", vi: "Cẩm nang không gian làm việc tinh tế" },
    summary: {
      en: "Twelve workspaces, one question: what does this room help you ignore? Lighting, acoustics and storage examined as attention tools.",
      vi: "Mười hai không gian làm việc, một câu hỏi: căn phòng này giúp bạn lọc bỏ điều gì? Ánh sáng, âm học và lưu trữ được xem như công cụ nuôi dưỡng sự tập trung.",
    },
    authorId: "st-jonas",
    collectionId: "col-spaces",
    status: "draft",
    updatedDaysAgo: 8,
    publishInDays: 27,
    destinationId: "dest-quarterly",
  },
  {
    id: "art-08",
    title: { en: "What Makes a Digital Product Feel Human", vi: "Điều gì làm sản phẩm số trở nên nhân văn" },
    summary: {
      en: "Warmth in software is not gradients and rounded corners. It is honest empty states, reversible actions and copy that respects the reader.",
      vi: "Sự ấm áp trong phần mềm không nằm ở hiệu ứng màu hay góc bo tròn. Đó là những trạng thái trống trung thực, hành động có thể hoàn tác và lời văn tôn trọng người đọc.",
    },
    authorId: "st-amara",
    collectionId: "col-tech",
    status: "draft",
    updatedDaysAgo: 11,
    publishInDays: 34,
    destinationId: "dest-newsletter",
  },
];

const events: EditorialEvent[] = [
  {
    id: "ev-01",
    summary: {
      en: "Small Spaces, Better Living scheduled for the Sunday newsletter",
      vi: "Không gian nhỏ, sống tốt hơn đã được lên lịch cho bản tin chủ nhật",
    },
    daysAgo: 1,
  },
  {
    id: "ev-02",
    summary: {
      en: "How Objects Become Interfaces moved into review",
      vi: "Vật thể trở thành giao diện như thế nào được chuyển sang hạng duyệt",
    },
    daysAgo: 2,
  },
  {
    id: "ev-03",
    summary: {
      en: "The Materials Issue published to the web magazine",
      vi: "Ấn bản Vật liệu đã xuất bản trên tạp chí trực tuyến",
    },
    daysAgo: 3,
  },
  {
    id: "ev-04",
    summary: {
      en: "Inside a Modern Workshop photography session added",
      vi: "Bên trong xưởng hiện đại được bổ sung bộ ảnh",
    },
    daysAgo: 4,
  },
  {
    id: "ev-05",
    summary: {
      en: "A Guide to Thoughtful Workspaces draft started",
      vi: "Bắt đầu bản nháp Cẩm nang không gian làm việc tinh tế",
    },
    daysAgo: 5,
  },
  {
    id: "ev-06",
    summary: {
      en: "Designing for Everyday Rituals summary updated",
      vi: "Cập nhật tóm tắt Thiết kế cho những nghi thức hằng ngày",
    },
    daysAgo: 6,
  },
];

export function buildFormaSeed(): FormaData {
  return {
    staff: structuredClone(staff),
    collections: structuredClone(collections),
    destinations: structuredClone(destinations),
    articles: structuredClone(articles),
    events: structuredClone(events),
  };
}
