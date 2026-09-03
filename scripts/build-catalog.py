# -*- coding: utf-8 -*-
"""
Builds the Zardasht Mahd Binaloud Trading product catalogue.

Content is pulled from the SAME sources the website renders from
(src/data/products.json, src/data/contact.json) so the PDF cannot drift out of
sync with the site. Run from the project root.
"""
import io
import json
import os
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = os.getcwd()
OUT = os.path.join(ROOT, "public", "downloads", "zardasht-product-catalog.pdf")

NAVY = (0x19 / 255, 0x26 / 255, 0x6A / 255)
NAVY_DEEP = (0x10 / 255, 0x18 / 255, 0x4A / 255)
YELLOW = (0xF3 / 255, 0xC6 / 255, 0x23 / 255)
SLATE = (0.35, 0.38, 0.45)
LIGHT = (0.97, 0.98, 0.99)
WHITE = (1, 1, 1)

W, H = A4
M = 18 * mm  # page margin

BRAND = "Zardasht Mahd Binaloud Trading"
SUBBRAND = "International Commodity Trading"
SITE = "www.zardasht-co.com"

with open(os.path.join(ROOT, "src", "data", "products.json"), encoding="utf-8") as f:
    GROUPS = json.load(f)["en"]
with open(os.path.join(ROOT, "src", "data", "contact.json"), encoding="utf-8") as f:
    CONTACT = json.load(f)["en"]

IMG = os.path.join(ROOT, "public", "images")
LOGO = os.path.join(ROOT, "public", "logo.png")

# One photo per commodity group, keyed by the group id used on the site.
GROUP_IMAGE = {
    "energy-bitumen": "02_bitumen.webp",
    "metals-steel": "03_metals_steel.webp",
    "agricultural-commodities": "04_agricultural_grain.webp",
    "textile-raw-materials": "05_textile_yarn.webp",
    "chemicals-petrochemicals": "08_warehouse_logistics.webp",
}


_img_cache = {}


def img(name):
    """ImageReader for a file in public/images, or None when absent.

    The source art is .webp, which ReportLab embeds as raw uncompressed
    samples — that alone pushed the catalogue past 2.6 MB. Re-encoding each
    photo to a right-sized JPEG first keeps it under a few hundred KB, which
    matters because this file is offered as a download from the site.
    """
    if name in _img_cache:
        return _img_cache[name]
    p = os.path.join(IMG, name)
    if not os.path.exists(p):
        _img_cache[name] = None
        return None
    im = Image.open(p).convert("RGB")
    im.thumbnail((1400, 1400), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=76, optimize=True)
    buf.seek(0)
    _img_cache[name] = ImageReader(buf)
    return _img_cache[name]


def wrap(c, text, font, size, max_w):
    """Greedy word wrap -> list of lines that each fit inside max_w."""
    c.setFont(font, size)
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        trial = (cur + " " + w_).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines


def para(c, text, x, y, max_w, font="Helvetica", size=9.5, leading=13.5, fill=SLATE):
    c.setFillColorRGB(*fill)
    for line in wrap(c, text, font, size, max_w):
        c.setFont(font, size)
        c.drawString(x, y, line)
        y -= leading
    return y


def cover_image(c, reader, x, y, w, h):
    """Draw an image cropped to fill (x,y,w,h) — object-fit: cover."""
    iw, ih = reader.getSize()
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.saveState()
    path = c.beginPath()
    path.rect(x, y, w, h)
    c.clipPath(path, stroke=0, fill=0)
    c.drawImage(reader, x - (dw - w) / 2, y - (dh - h) / 2, dw, dh, mask="auto")
    c.restoreState()


def footer(c, page_no):
    c.setFillColorRGB(*SLATE)
    c.setFont("Helvetica", 7.5)
    c.drawString(M, 11 * mm, BRAND)
    c.drawRightString(W - M, 11 * mm, "%s   |   %d" % (SITE, page_no))
    c.setStrokeColorRGB(0.85, 0.87, 0.91)
    c.setLineWidth(0.5)
    c.line(M, 15 * mm, W - M, 15 * mm)


def section_header(c, eyebrow, title):
    """Navy band across the top of an interior page. Returns next free y."""
    c.setFillColorRGB(*NAVY)
    c.rect(0, H - 34 * mm, W, 34 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*YELLOW)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(M, H - 15 * mm, eyebrow.upper())
    c.setFillColorRGB(*WHITE)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(M, H - 25 * mm, title)
    return H - 46 * mm


# ---------------------------------------------------------------- cover ----
c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("%s - Product Catalogue" % BRAND)
c.setAuthor(BRAND)
c.setSubject("Raw material supply: agricultural, chemical, energy, metals and textiles")
c.setCreator(BRAND)

c.setFillColorRGB(*NAVY_DEEP)
c.rect(0, 0, W, H, stroke=0, fill=1)

hero = img("01_global_shipping_port.webp")
if hero:
    c.saveState()
    c.setFillAlpha(0.32)
    cover_image(c, hero, 0, H * 0.42, W, H * 0.58)
    c.restoreState()
    # Fade the photo into the panel below it. Each band is drawn at a low,
    # constant alpha and overlapped generously rather than stepped through
    # increasing alpha — stepping the alpha leaves visible contour lines.
    steps = 160
    band = (H * 0.58) * 0.5
    for i in range(steps):
        t = i / (steps - 1)
        c.setFillColorRGB(*NAVY_DEEP)
        c.setFillAlpha(0.055 * (1 - t) ** 0.65)
        c.rect(0, H * 0.42 + band * t, W, band / steps * 3.2, stroke=0, fill=1)
    c.setFillAlpha(1)

if os.path.exists(LOGO):
    c.drawImage(ImageReader(LOGO), M, H - 42 * mm, 24 * mm, 24 * mm, mask="auto")

c.setFillColorRGB(*YELLOW)
c.setFont("Helvetica-Bold", 9)
c.drawString(M, H * 0.30 + 32 * mm, SUBBRAND.upper())

c.setFillColorRGB(*WHITE)
c.setFont("Helvetica-Bold", 30)
c.drawString(M, H * 0.30 + 18 * mm, "Product")
c.drawString(M, H * 0.30 + 6 * mm, "Catalogue")

c.setFillColorRGB(*YELLOW)
c.rect(M, H * 0.30 - 2 * mm, 28 * mm, 1.6 * mm, stroke=0, fill=1)

y = H * 0.30 - 14 * mm
c.setFillColorRGB(1, 1, 1)
c.setFont("Helvetica-Bold", 12)
c.drawString(M, y, BRAND)
y -= 16
c.setFillColorRGB(0.75, 0.78, 0.86)
y = para(
    c,
    "We buy raw materials at origin and deliver them to your door - freight, "
    "customs and settlement included.",
    M, y, W - 2 * M - 30 * mm, size=10.5, leading=15, fill=(0.75, 0.78, 0.86),
)

c.setFillColorRGB(0.62, 0.66, 0.76)
c.setFont("Helvetica", 9)
c.drawString(M, 24 * mm, CONTACT["phone"] + "   |   " + CONTACT["email"])
c.setFillColorRGB(*YELLOW)
c.setFont("Helvetica-Bold", 9)
c.drawString(M, 17 * mm, SITE)
c.showPage()

# ------------------------------------------------------------- company ----
y = section_header(c, "About us", "An Iran-based raw material trading company")
col = W - 2 * M

y = para(
    c,
    "We supply raw materials to manufacturers and wholesale buyers abroad. "
    "We buy at origin, arrange freight, clear customs and deliver at destination - "
    "so what you receive is the goods, not a file of documents to resolve yourself.",
    M, y, col, size=10, leading=15,
)
y -= 10 * mm

c.setFillColorRGB(*NAVY)
c.setFont("Helvetica-Bold", 12)
c.drawString(M, y, "Why buyers work with us")
y -= 9 * mm

REASONS = [
    ("Direct producer network", "We buy straight from producers, not intermediaries."),
    ("Checked before it ships", "We attend loading and inspect packing at origin."),
    ("Payment handled", "Settlement arranged even where banking channels are limited."),
]
for title, body in REASONS:
    c.setFillColorRGB(*YELLOW)
    c.rect(M, y - 1.5 * mm, 2.2 * mm, 7 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(M + 6 * mm, y + 2.6 * mm, title)
    para(c, body, M + 6 * mm, y - 2 * mm, col - 6 * mm, size=9.5, leading=13)
    y -= 15 * mm

y -= 2 * mm
c.setFillColorRGB(*NAVY)
c.setFont("Helvetica-Bold", 12)
c.drawString(M, y, "The chain we cover")
y -= 8 * mm

CHAIN = [
    ("01", "Sourcing at origin", "Bought direct from producers on quality, price and lead time."),
    ("02", "Pre-shipment inspection", "We attend loading and check packing against the specification."),
    ("03", "Freight & vehicle selection", "Route and vehicle chosen for the commodity - road, rail or multimodal."),
    ("04", "Customs clearance", "Export and import formalities handled on your behalf."),
    ("05", "Delivery at destination", "Followed through to the agreed delivery point."),
    ("06", "Payment & settlement", "Arranged per transaction, including hard-to-bank markets."),
]
cw = (col - 6 * mm) / 2
for i, (num, title, body) in enumerate(CHAIN):
    cx = M + (i % 2) * (cw + 6 * mm)
    cy = y - (i // 2) * 24 * mm
    c.setFillColorRGB(*LIGHT)
    c.roundRect(cx, cy - 18 * mm, cw, 20 * mm, 2.5 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*YELLOW)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(cx + 4 * mm, cy - 5.5 * mm, num)
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(cx + 14 * mm, cy - 5.5 * mm, title)
    para(c, body, cx + 14 * mm, cy - 10 * mm, cw - 18 * mm, size=8, leading=10.5)

footer(c, 2)
c.showPage()

# ------------------------------------------------------- product groups ----
page_no = 3
for g in GROUPS:
    y = section_header(c, "Commodity group", g["title"])

    photo = img(GROUP_IMAGE.get(g["id"], ""))
    if photo:
        cover_image(c, photo, M, y - 62 * mm, col, 62 * mm)
        c.setFillColorRGB(*NAVY_DEEP)
        c.setFillAlpha(0.18)
        c.rect(M, y - 62 * mm, col, 62 * mm, stroke=0, fill=1)
        c.setFillAlpha(1)
        y -= 72 * mm
    else:
        y -= 6 * mm

    y = para(c, g["description"], M, y, col, size=10.5, leading=15)
    y -= 11 * mm

    for p in g["products"]:
        # keep a row intact; start a fresh page if it would run into the footer
        if y < 42 * mm:
            footer(c, page_no)
            page_no += 1
            c.showPage()
            y = section_header(c, "Commodity group", g["title"] + " (continued)")

        c.setFillColorRGB(*LIGHT)
        c.roundRect(M, y - 18 * mm, col, 21 * mm, 2.5 * mm, stroke=0, fill=1)
        # yellow rule down the leading edge, echoing the site's list styling
        c.setFillColorRGB(*YELLOW)
        c.roundRect(M, y - 18 * mm, 1.6 * mm, 21 * mm, 0.8 * mm, stroke=0, fill=1)

        c.setFillColorRGB(*NAVY)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(M + 6 * mm, y - 0.5 * mm, p["name"])

        tag = p["tag"]
        tw = c.stringWidth(tag, "Helvetica-Bold", 7) + 6 * mm
        c.setFillColorRGB(*YELLOW)
        c.roundRect(W - M - 5 * mm - tw, y - 2.6 * mm, tw, 5.5 * mm, 2.75 * mm, stroke=0, fill=1)
        c.setFillColorRGB(*NAVY_DEEP)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(W - M - 5 * mm - tw / 2, y - 0.8 * mm, tag)

        para(c, p["description"], M + 6 * mm, y - 7 * mm, col - 36 * mm, size=9, leading=12)
        y -= 25 * mm

    footer(c, page_no)
    page_no += 1
    c.showPage()

# ------------------------------------------------------------- markets ----
y = section_header(c, "Our network", "Markets and representatives")

y = para(
    c,
    "Our trade is built on specific origin and destination relationships, with a local "
    "contact in each key market rather than a handoff to a stranger.",
    M, y, col, size=10, leading=14.5,
)
y -= 10 * mm

MARKETS = [
    ("Uzbekistan", "Destination market for our bitumen exports.", "flag-uz.webp"),
    ("Kazakhstan", "Steel exports and grain sourcing across the corridor.", "flag-kz.webp"),
    ("Russia", "Sourcing market for barley and agricultural commodities.", "flag-ru.webp"),
    ("Other regional markets", "Evaluated case by case on product, route and terms.", None),
]
mw = (col - 6 * mm) / 2
for i, (name, body, flag) in enumerate(MARKETS):
    mx = M + (i % 2) * (mw + 6 * mm)
    my = y - (i // 2) * 30 * mm
    c.setFillColorRGB(*LIGHT)
    c.roundRect(mx, my - 24 * mm, mw, 26 * mm, 2.5 * mm, stroke=0, fill=1)
    fr = img(flag) if flag else None
    if fr:
        c.drawImage(fr, mx + 5 * mm, my - 7.5 * mm, 9 * mm, 6 * mm, mask="auto")
    else:
        c.setFillColorRGB(*YELLOW)
        c.roundRect(mx + 5 * mm, my - 7.5 * mm, 9 * mm, 6 * mm, 1 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(mx + 17 * mm, my - 5.5 * mm, name)
    para(c, body, mx + 5 * mm, my - 13 * mm, mw - 10 * mm, size=8.5, leading=11.5)

y -= 30 * mm * ((len(MARKETS) + 1) // 2) + 6 * mm

c.setFillColorRGB(*NAVY)
c.setFont("Helvetica-Bold", 12)
c.drawString(M, y, "How a trade starts")
y -= 11 * mm

STEPS = [
    "You send the commodity, specification, quantity and destination.",
    "We find the supply and quote a delivered price.",
    "Price, payment and delivery terms agreed in writing.",
    "Loading inspected at origin, transport booked.",
    "Cleared through customs and handed over at destination.",
]
for i, s in enumerate(STEPS, 1):
    c.setFillColorRGB(*YELLOW)
    c.circle(M + 3.2 * mm, y + 1.2 * mm, 3.2 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*NAVY_DEEP)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(M + 3.2 * mm, y - 0.6 * mm, str(i))
    para(c, s, M + 11 * mm, y, col - 11 * mm, size=10, leading=13)
    if i < len(STEPS):
        c.setStrokeColorRGB(0.87, 0.89, 0.93)
        c.setLineWidth(0.8)
        c.line(M + 3.2 * mm, y - 2.4 * mm, M + 3.2 * mm, y - 10 * mm)
    y -= 14 * mm

footer(c, page_no)
page_no += 1
c.showPage()

# ------------------------------------------------------------- contact ----
c.setFillColorRGB(*NAVY_DEEP)
c.rect(0, 0, W, H, stroke=0, fill=1)

if os.path.exists(LOGO):
    c.drawImage(ImageReader(LOGO), M, H - 46 * mm, 26 * mm, 26 * mm, mask="auto")

c.setFillColorRGB(*YELLOW)
c.setFont("Helvetica-Bold", 9)
c.drawString(M, H - 60 * mm, "GET IN TOUCH")

c.setFillColorRGB(*WHITE)
c.setFont("Helvetica-Bold", 22)
c.drawString(M, H - 72 * mm, "Tell us what you need")
c.drawString(M, H - 84 * mm, "to buy or sell")

y = H - 100 * mm
y = para(
    c,
    "Send the commodity, required specification, quantity, destination and your target "
    "timeline, and our trade desk will come back with a delivered price.",
    M, y, col - 24 * mm, size=10.5, leading=15, fill=(0.75, 0.78, 0.86),
)

y -= 14 * mm
for label, value in (
    ("Phone / WhatsApp", CONTACT["phone"]),
    ("Email", CONTACT["email"]),
    ("Website", SITE),
    (CONTACT["addressLabel"], CONTACT["address"]),
):
    c.setFillColorRGB(*YELLOW)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(M, y, label.upper())
    c.setFillColorRGB(*WHITE)
    yy = para(c, value, M, y - 6 * mm, col - 30 * mm, font="Helvetica-Bold",
              size=11, leading=14, fill=WHITE)
    y = yy - 8 * mm

c.setStrokeColorRGB(0.25, 0.29, 0.42)
c.setLineWidth(0.6)
c.line(M, 26 * mm, W - M, 26 * mm)
c.setFillColorRGB(0.55, 0.60, 0.72)
c.setFont("Helvetica", 8)
c.drawString(M, 19 * mm, BRAND)
c.drawRightString(W - M, 19 * mm, SUBBRAND)

c.save()
print("wrote", OUT)
