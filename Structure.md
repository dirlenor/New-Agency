# โครงสร้างเว็บไซต์อย่างละเอียด: 6CAT Agency

เอกสารฉบับนี้ระบุโครงสร้าง องค์ประกอบ และรูปแบบของแต่ละหน้าในเว็บไซต์ 6CAT Agency อย่างเจาะลึก

---

## 1. หน้าหลัก (Home Page - `/`)
เน้นการนำเสนอความล้ำสมัยด้วยเทคโนโลยีและผลงานที่โดดเด่น

*   **ส่วนหัว (Hero Section):**
    *   **รูปแบบ:** Full-screen Visual Experience
    *   **องค์ประกอบ:**
        *   Interactive Canvas พื้นหลัง (ลำแสงเลเซอร์, ดวงดาว, เนบิวลาสีส้ม) ตอบสนองการขยับเมาส์
        *   ภาพพื้นหลัง bg-hero มีแอนิเมชันซูมเข้า/ออกแบบช้าๆ (นุ่มๆ)
        *   ข้อความเล็กตรงกลางเหนือหัวข้อ: "6CAT AGENCY 2026"
        *   หัวข้อหลัก 2 บรรทัด (ตัวหนา): "We think beyond design." และ "We build beyond development."
        *   แอนิเมชันเปลี่ยนสีทีละคำแบบวนลูป (ช้าและนุ่ม)
        *   ปุ่มกดแบบมีแสงเรือง (Glow Effect) พร้อมไอคอน ArrowRight
        *   ส่วนจำลอง Terminal (Code Window): แสดงโค้ด HTML/Brand metadata แบบพิมพ์อัตโนมัติ (6 บรรทัด) วางซ้อนที่ขอบล่างของหน้า
*   **ส่วนเกี่ยวกับเรา (About Section):**
    *   **รูปแบบ:** Intro แบบสองคอลัมน์ + การ์ด 3 ใบ + แถวสถิติ 4 ช่อง
    *   **องค์ประกอบ:**
        *   ส่วนบน: หัวข้อ “About 6CAT” + คำอธิบาย 2 ย่อหน้า
        *   แถวการ์ด 3 ใบ:
            1) การ์ดข้อมูล (ข้อความแนวคิด + สวิตช์เชิงภาพ)
            2) การ์ดภาพ (ภาพทีม/บรรยากาศ)
            3) การ์ดสถิติ (ตัวเลขใหญ่ + แถบ progress)
        *   แถวล่าง: ตัวเลขสรุป 4 ค่า (Hours delivered, Retention, Collaborations, Experiments)
*   **ส่วนบริการ (Services Section):**
    *   **รูปแบบ:** การ์ดแนวนอนซ้อน 3 ใบ (accordion) เต็มความกว้าง
    *   **องค์ประกอบ:**
        *   การ์ดบริการ 4 ใบ (UX/UI, Web Dev, Re-design, System Development) คลิกเพื่อขยายรายละเอียดแบบ accordion
        *   เอฟเฟกต์ Hover ใช้กับการ์ดบริการเท่านั้น
        *   ปุ่ม "View More" อยู่บรรทัดเดียวกับหัวข้อ Our Services
*   **ส่วนผลงานที่คัดสรร (Selected Works Section):**
    *   **รูปแบบ:** Masonry 2 คอลัมน์ (สไตล์ Pinterest) ความสูงภาพไม่เท่ากัน
    *   **องค์ประกอบ:**
        *   ส่วนหัวแบบ Flexible (Space-between) มีปุ่ม "View Project" ด้านขวา
        *   **การ์ดผลงาน (Work Cards): 4 ใบ**
            *   รูปภาพแสดงเต็มใบ + Overlay ไล่โทนดำ พร้อมชื่อโปรเจกต์ด้านล่าง
            *   เอฟเฟกต์ Hover: รูปขยายขึ้น (Scale 105%), แสดงไอคอนลูกศรเฉียง (ArrowUpRight)
*   **ส่วนปิดท้าย (CTA Section):**
    *   **รูปแบบ:** Center-aligned พร้อมเอฟเฟกต์พื้นหลังเรืองแสง (Gradient Glow)
    *   **องค์ประกอบ:**
        *   หัวข้อขนาดใหญ่ (H2) 5xl-8xl ใช้ Gradient text (ขาวไปเทา)
        *   ปุ่ม "Start a Project" ขนาดใหญ่พิเศษ (px-12 py-6)

---

## 2. หน้าเกี่ยวกับเรา (About Us Page - `/about`)
เน้นการเล่าเรื่องแบบมั่นใจ, เรียบหรู, และมีจังหวะการเลื่อน (Scroll) ที่ตั้งใจออกแบบ

*   **ระยะห่าง Section:** ทุก Section เว้นระยะห่างเท่ากัน 112px (ใช้ `space-y-28` ในคอนเทนเนอร์หลัก)
*   **Padding บน/ล่างของ Section:** ใช้ `py-16` (ประมาณ 64px) สำหรับทุก Section ในหน้า About ยกเว้น Section แรกที่ใช้ `pb-16` เพื่อให้หัวข้ออยู่สูงเทียบกับหน้าอื่น
*   **ส่วนหัว (About Hero):**
    *   **รูปแบบ:** Typography-driven Header (Full width)
    *   **องค์ประกอบ:**
        *   Label "About" สีเทา (text-white/55)
        *   หัวข้อใหญ่ (H1) แยกเป็นคำๆ (word-by-word)
        *   คำอธิบายสั้นสีเทา (text-white/80)
        *   แอนิเมชันเปลี่ยนสีคำเป็นส้มทีละคำแบบวนลูป (ช้าและนุ่ม)
        *   แอนิเมชัน Collaboration: เมาส์เล็กๆ พร้อมชื่อทีม (5 ชื่อ) วิ่งกระจายทั่วพื้นที่ Hero และเลื่อนตาม Scroll แบบนุ่มๆ (delay เล็กน้อย)
        *   Hover glow สีส้ม และพื้นหลัง SVG เส้นโค้งจางๆ แบบ Cosmic Line
*   **ส่วนเนื้อหา "Who we are":**
    *   **รูปแบบ:** Split Layout (ข้อความ 60% / Visual 40%)
    *   **องค์ประกอบ:**
        *   ข้อความอธิบายความเชื่อด้าน UX/UI และการทำเว็บที่ "intentional, functional, scalable"
        *   กราฟิก SVG Minimal + กรอบซ้อน (เมื่อ Hover จะเห็นเส้นกรอบด้านในเพิ่มขึ้น)
        *   มีเส้นคั่นแนวนอนแบบ Animated (`line-reveal`) ที่ขยายจากซ้ายเมื่อ Scroll เข้าถึง
*   **ส่วนปรัชญา (Our Philosophy):**
    *   **รูปแบบ:** 3-Column Grid
    *   **การ์ดปรัชญา: 3 ใบ**
        *   องค์ประกอบ: ไอคอน ✦, หัวข้อ, เนื้อหาสั้น
        *   เอฟเฟกต์: Hover เปลี่ยนขอบเป็นสีส้มและมี Glow นุ่มๆ
        *   มีเส้นคั่นแนวนอนแบบ Animated (`line-reveal`) ก่อนเริ่ม Grid
*   **ส่วนความแตกต่าง (What makes us different) — Sticky Feature:**
    *   **รูปแบบ:** 2-Column Sticky Layout
    *   **ฝั่งซ้าย (Sticky):** หัวข้อ + คำอธิบายสั้น + เส้นคั่นแนวนอนแบบ Animated
    *   **ฝั่งขวา (Scrollable List):**
        *   **การ์ดความแตกต่าง: 5 ใบ** (ข้อความ 1 บรรทัดต่อใบ)
        *   การ์ดมีเส้นขีดด้านบน (thin line) และเส้นขีดสีส้มด้านล่างที่ขยายเมื่อ Hover
*   **ส่วนความสามารถ (Our Capabilities):**
    *   **รูปแบบ:** 2 แถว x 3 คอลัมน์
    *   **การ์ดความสามารถ: 6 ใบ**
        *   องค์ประกอบ: ไอคอนแบบเรียบ (ช่องสี่เหลี่ยมเล็ก) + ชื่อความสามารถ
        *   เอฟเฟกต์: ไอคอนและเส้นใต้เปลี่ยนเป็นสีส้มเมื่อ Hover
        *   มีเส้นคั่นแนวนอนแบบ Animated (`line-reveal`) ก่อนเริ่ม Grid
*   **ส่วนกระบวนการทำงาน (Our Process):**
    *   **รูปแบบ:** Horizontal Timeline
    *   **องค์ประกอบ:**
        *   จุดบอกสถานะ 5 จุด เชื่อมด้วยเส้นแนวนอนจางๆ
        *   **ขั้นตอน: 5 ขั้น** (Discover, Design, Build, Refine, Launch)
        *   เอฟเฟกต์: เมื่อ Scroll ถึงตำแหน่ง จุด/ข้อความจะเปลี่ยนเป็นสีส้ม
        *   มีเส้นคั่นแนวนอนแบบ Animated (`line-reveal`) ก่อน Timeline
*   **ส่วนปิดท้าย:** ข้อความปลุกใจขนาดใหญ่ + ปุ่ม Outline "View Our Work" พร้อม Glow สีส้มเมื่อ Hover

---

## 3. หน้าบริการ (Services Page - `/services`)
เน้นการสื่อสารปัญหา + แนวคิด + วิธีแก้ + ผลลัพธ์อย่างชัดเจน

*   **Hero (Services Intro):**
    *   ข้อความใหญ่ 2 บรรทัด: "Beyond design." / "Beyond development."
    *   คำอธิบายสั้น: เน้นการแก้ปัญหาด้วย design + technology + systems
*   **Section 1: UX / UI Design**
    *   **เลย์เอาต์:** 2 คอลัมน์ (ซ้ายหัวข้อ, ขวาเนื้อหา)
    *   **โครงเนื้อหา:** Problem → Thinking → Solutions → Outcome
    *   **Solutions:** รายการ 5 ข้อแบบ 2 คอลัมน์
*   **Section 2: Web Development**
    *   โครงสร้างเดียวกับ UX/UI เพื่อความสม่ำเสมอ
    *   **Solutions:** 5 ข้อ (architecture, code structure, performance, SEO, CMS)
*   **Section 3: Re-design**
    *   เน้นปรับปรุงเชิงกลยุทธ์ ไม่ใช่แค่เปลี่ยนหน้าตา
    *   **Solutions:** 5 ข้อ (audit, content, visual refresh, performance, gradual transform)
*   **Section 4: System Development**
    *   เน้นระบบภายในและกระบวนการที่ scale ได้
    *   **Solutions:** 5 ข้อ (mapping, dashboards, CRM, API/data flow, architecture)
*   **Supporting Section: How we work**
    *   ขั้นตอนทำงาน 5 ขั้นในรูปแบบการ์ด
*   **CTA Section:**
    *   ข้อความ "Let’s solve the right problem."
    *   ปุ่ม "Start a conversation" แบบ outline + hover glow

---

## 4. หน้าผลงาน (Projects Page - `/projects`)
เน้นการแสดงภาพลักษณ์ผลงาน

*   **โครงสร้างหน้า:** PageShell
*   **ส่วนประกอบ:**
    *   **รูปแบบ:** 2-Column Grid (ขนาดใหญ่)
    *   **การ์ดไฮไลท์: 2 ใบ**
        *   ใบที่ 1 (Featured Project): เน้นความโดดเด่น
        *   ใบที่ 2 (Project Archive): เน้นการรวบรวมผลงานอื่นๆ

---

## 5. หน้าใบเสนอราคา (Quotation Page - `/quotation`)
เน้นความเรียบง่ายและการให้ข้อมูลที่รวดเร็ว

*   **โครงสร้างหน้า:** PageShell
*   **ส่วนประกอบ:**
    *   **รูปแบบ:** 2-Column Grid (Snapshot vs Estimate)
    *   **องค์ประกอบ:**
        *   ฝั่งซ้าย (Snapshot List): รายการขอบเขตงานแบบ List item
        *   ฝั่งขวา (Estimate Box): ตัวเลขราคาขนาดใหญ่ พร้อมปุ่ม "Request Full Quote" สีขาว

---

## 6. หน้าติดต่อ (Contact Us Page - `/contact`)
เน้นการสื่อสารและการให้ข้อมูลการติดต่อ

*   **โครงสร้างหน้า:** `<main>` wrapper (เหมือน About/Services pages)
*   **ส่วนหัว (Hero Section):**
    *   **รูปแบบ:** Typography-driven Header พร้อม Container เดียวกับหน้า About/Services
    *   **องค์ประกอบ:**
        *   Label "Contact" สีเทา (text-white/55)
        *   หัวข้อใหญ่ 2 บรรทัด: "Let's create" / "something great."
        *   คำอธิบายสั้น: "Ready to start your next project? We'd love to hear from you."
*   **ส่วนเนื้อหา (Contact Content):**
    *   **รูปแบบ:** 2-Column Grid (Info vs Form)
    *   **ฝั่งซ้าย (Contact Info):**
        *   ส่วนหัว "Get in touch"
        *   **การ์ดติดต่อ 3 ใบ:**
            1. Email: hello@6cat.agency พร้อมไอคอน envelope (hover: ขอบส้ม + พื้นหลังส้มจาง)
            2. Phone: +66 000 000 000 พร้อมไอคอน phone (hover: ขอบส้ม + พื้นหลังส้มจาง)
            3. Location: Bangkok, Thailand พร้อมไอคอน location
        *   ส่วนหัว "Follow us"
        *   **Social Link Buttons:** 3 ปุ่ม (Instagram, Twitter, LinkedIn) รูปแบบ rounded-full (hover: ขอบส้ม + ข้อความส้ม)
    *   **ฝั่งขวา (Contact Form):**
        *   ส่วนหัว "Send a message"
        *   **ช่องกรอกข้อมูล:**
            - Name + Email (2 คอลัมน์)
            - Subject (เต็มความกว้าง)
            - Message (textarea 5 บรรทัด)
            - Budget range (4 ปุ่ม: < $5k, $5k - $15k, $15k - $50k, $50k+)
        *   **ปุ่ม "Send Message":** เต็มความกว้าง, พื้นหลังส้ม, มี gradient overlay เมื่อ hover + shadow glow
*   **ส่วนปิดท้าย (CTA Section):**
    *   ข้อความ "We typically respond within 24 hours." พร้อม subtext "Currently accepting new projects for Q1 2025."

---

## ส่วนประกอบส่วนกลาง (Global Components)
*   **Navbar:**
    *   **Desktop:** เมนูแนวนอน 6 ลิงก์ พร้อมจุดบอกสถานะ (Active dot) และปุ่ม "LET'S TALK" แบบ Outline
        - **ปุ่ม "LET'S TALK":** รูปแบบ rounded-full, padding px-6 py-3, hover: ขอบส้ม + ข้อความส้ม
    *   **Mobile:** ปุ่ม Toggle (Hamburger/X) พร้อม Overlay เต็มหน้าจอ
    *   **Behavior:** จะหดขนาดลงและเพิ่มพื้นหลังเบลอ (Backdrop Blur) พร้อมเงาสีดำเมื่อ Scroll ลง
*   **Footer:** แถวเดียว 3 ส่วน (Copyright / Social links / Credit) คั่นด้วยความว่าง
*   **Language Toggle:** ปุ่มสวิตช์แบบแคปซูล แสดง EN/TH พร้อมตัวเลื่อนสีส้ม
*   **Section Indicator (หน้าหลัก):** แถบจุดแนวตั้งด้านซ้ายล่าง แสดงชื่อ Section และสถานะปัจจุบัน (Home, About, Services, Work, Contact)
*   **Custom Cursor:** วงกลมโปร่งแสงวิ่งตามเมาส์แบบหน่วงนุ่มๆ (แสดงเฉพาะอุปกรณ์ที่มีเมาส์) และขยายคลุมปุ่ม "See our work" เมื่อ Hover
*   **Hover Cards (ทั้งเว็บ):** ทุกการ์ดเมื่อ Hover จะเปลี่ยนพื้นหลังเป็นสีส้มและตัวอักษรเป็นสีขาว
