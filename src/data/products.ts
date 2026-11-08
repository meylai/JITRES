import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // T-SHIRTS
  {
    id: 'tee-001',
    slug: 'faith-over-fear-tee',
    name: 'Faith Over Fear Tee',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    price: 25000,
    currency: 'MWK',
    description: 'A contemporary everyday heavyweight essential carrying a timeless message. Crafted with 240 GSM organic combed cotton for an oversized, tailored streetwear drape that endures daily wear.',
    details: {
      material: '100% Organic Combed Cotton (240 GSM)',
      fit: 'Relaxed Streetwear Drape / Drop Shoulder',
      care: 'Machine wash cold inside out with similar colors. Line dry in shade. Do not iron directly on print.',
      origin: 'Designed with Purpose & Ethically Manufactured',
    },
    features: [
      'Pre-shrunk vintage wash fabric',
      'Minimalist "JESUS IS THE REAL SATISFACTION" nape print',
      'Reinforced double-needle collar and seams',
      'Breathable, ultra-soft hand feel'
    ],
    images: [
      '/images/products/faith-over-fear-tee-front.jpg',
      '/images/products/faith-over-fear-tee-back.jpg',
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717', imageIndex: 0 },
      { name: 'Pure Chalk', hex: '#FFFFFF', imageIndex: 1 },
      { name: 'Desert Dune', hex: '#D7CDBE', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'fof-blk-s', color: 'Onyx Black', size: 'S', stock: 12, sku: 'FOF-BLK-S' },
      { id: 'fof-blk-m', color: 'Onyx Black', size: 'M', stock: 18, sku: 'FOF-BLK-M' },
      { id: 'fof-blk-l', color: 'Onyx Black', size: 'L', stock: 20, sku: 'FOF-BLK-L' },
      { id: 'fof-blk-xl', color: 'Onyx Black', size: 'XL', stock: 10, sku: 'FOF-BLK-XL' },
      { id: 'fof-blk-xxl', color: 'Onyx Black', size: 'XXL', stock: 4, sku: 'FOF-BLK-XXL' },
      { id: 'fof-wht-s', color: 'Pure Chalk', size: 'S', stock: 8, sku: 'FOF-WHT-S' },
      { id: 'fof-wht-m', color: 'Pure Chalk', size: 'M', stock: 15, sku: 'FOF-WHT-M' },
      { id: 'fof-wht-l', color: 'Pure Chalk', size: 'L', stock: 14, sku: 'FOF-WHT-L' },
      { id: 'fof-wht-xl', color: 'Pure Chalk', size: 'XL', stock: 6, sku: 'FOF-WHT-XL' },
      { id: 'fof-wht-xxl', color: 'Pure Chalk', size: 'XXL', stock: 0, sku: 'FOF-WHT-XXL' }, // Out of stock example
      { id: 'fof-dune-m', color: 'Desert Dune', size: 'M', stock: 9, sku: 'FOF-DUNE-M' },
      { id: 'fof-dune-l', color: 'Desert Dune', size: 'L', stock: 7, sku: 'FOF-DUNE-L' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    badge: 'NEW',
    relatedProductIds: ['hoodie-001', 'cap-001', 'tee-002', 'golf-001']
  },
  {
    id: 'tee-002',
    slug: 'eternal-message-tee',
    name: 'Eternal Message Tee',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    price: 24000,
    currency: 'MWK',
    description: 'Understated elegance meets contemporary urban apparel. Featuring an embossed typography graphic affirming our rooted identity in Jesus Christ.',
    details: {
      material: '100% Ring-spun Heavy Cotton (220 GSM)',
      fit: 'True to Size Boxy Fit',
      care: 'Wash cold, hang to dry. Iron low heat.',
      origin: 'Ethically Sourced'
    },
    features: [
      'Subtle chest statement typography',
      'Heavyweight ribbed collar',
      'Silicone washed for supreme smoothness'
    ],
    images: [
      '/images/products/eternal-message-tee.jpg',
      '/images/products/faith-over-fear-tee-back.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717' },
      { name: 'Olive Shadow', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { id: 'emt-blk-s', color: 'Onyx Black', size: 'S', stock: 5, sku: 'EMT-BLK-S' },
      { id: 'emt-blk-m', color: 'Onyx Black', size: 'M', stock: 12, sku: 'EMT-BLK-M' },
      { id: 'emt-blk-l', color: 'Onyx Black', size: 'L', stock: 10, sku: 'EMT-BLK-L' },
      { id: 'emt-blk-xl', color: 'Onyx Black', size: 'XL', stock: 8, sku: 'EMT-BLK-XL' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    badge: 'ESSENTIAL',
    relatedProductIds: ['tee-001', 'hoodie-001', 'cap-002']
  },
  {
    id: 'tee-003',
    slug: 'grace-alone-heavy-tee',
    name: 'Grace Alone Heavy Tee',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    price: 26000,
    currency: 'MWK',
    description: 'Constructed from dense, premium jersey with an architectural drop-shoulder cut. A modern declaration of grace.',
    details: {
      material: '100% Combed Compact Cotton',
      fit: 'Oversized Boxy',
      care: 'Gentle cycle, cold water. Tumble dry low.',
      origin: 'Ethically Manufactured'
    },
    features: [
      'High-density screenprint',
      'Thick 1-inch collar ribbing',
      'Raw natural organic hue'
    ],
    images: [
      '/images/products/grace-alone-heavy-tee.jpg'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#EBE7DE' },
      { name: 'Onyx Black', hex: '#171717' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { id: 'gah-ecru-m', color: 'Natural Ecru', size: 'M', stock: 10, sku: 'GAH-ECR-M' },
      { id: 'gah-ecru-l', color: 'Natural Ecru', size: 'L', stock: 14, sku: 'GAH-ECR-L' },
      { id: 'gah-ecru-xl', color: 'Natural Ecru', size: 'XL', stock: 5, sku: 'GAH-ECR-XL' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    relatedProductIds: ['tee-001', 'hoodie-002']
  },

  // HOODIES
  {
    id: 'hoodie-001',
    slug: 'satisfied-boxy-hoodie',
    name: 'Satisfied Boxy Hoodie',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    price: 48000,
    currency: 'MWK',
    description: 'Our flagship 450 GSM heavyweight French terry hoodie. Structured architectural silhouette with no drawstrings for a refined, modern streetwear look.',
    details: {
      material: '100% French Terry Cotton (450 GSM)',
      fit: 'Boxy, Dropped Shoulder, Cropped Waistline',
      care: 'Dry clean recommended or machine wash cold inside out. Flat dry.',
      origin: 'Ethically Crafted'
    },
    features: [
      'Dense 450 GSM fleece warmth',
      'Seamless double-layered hood',
      'Blind stitch finishings with hidden side pockets',
      'Tonal branded embroidery'
    ],
    images: [
      '/images/products/satisfied-boxy-hoodie.jpg',
      '/images/products/cross-rooted-hoodie.jpg'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#262626' },
      { name: 'Oatmeal Heather', hex: '#DFDDD7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { id: 'sbh-chr-s', color: 'Washed Charcoal', size: 'S', stock: 6, sku: 'SBH-CHR-S' },
      { id: 'sbh-chr-m', color: 'Washed Charcoal', size: 'M', stock: 12, sku: 'SBH-CHR-M' },
      { id: 'sbh-chr-l', color: 'Washed Charcoal', size: 'L', stock: 15, sku: 'SBH-CHR-L' },
      { id: 'sbh-chr-xl', color: 'Washed Charcoal', size: 'XL', stock: 7, sku: 'SBH-CHR-XL' },
      { id: 'sbh-oat-m', color: 'Oatmeal Heather', size: 'M', stock: 8, sku: 'SBH-OAT-M' },
      { id: 'sbh-oat-l', color: 'Oatmeal Heather', size: 'L', stock: 10, sku: 'SBH-OAT-L' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    badge: 'ESSENTIAL',
    relatedProductIds: ['tee-001', 'cap-001', 'hoodie-002']
  },
  {
    id: 'hoodie-002',
    slug: 'cross-rooted-hoodie',
    name: 'Cross Rooted Hoodie',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    price: 46000,
    currency: 'MWK',
    description: 'Deep comfort and bold Christian presence. Features clean geometric cross-embroidery on the forearm and central brand message across the spine.',
    details: {
      material: '80% Heavy Cotton, 20% Poly-blend (420 GSM)',
      fit: 'Relaxed Urban Cut',
      care: 'Cold wash, tumble dry low.',
      origin: 'Ethically Manufactured'
    },
    features: [
      'Brushed fleece interior for cold seasons',
      'Kangaroo pocket with reinforced bartacks',
      'Custom woven identity label'
    ],
    images: [
      '/images/products/cross-rooted-hoodie.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { id: 'crh-blk-m', color: 'Onyx Black', size: 'M', stock: 11, sku: 'CRH-BLK-M' },
      { id: 'crh-blk-l', color: 'Onyx Black', size: 'L', stock: 16, sku: 'CRH-BLK-L' },
      { id: 'crh-blk-xl', color: 'Onyx Black', size: 'XL', stock: 4, sku: 'CRH-BLK-XL' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    relatedProductIds: ['hoodie-001', 'cap-002']
  },

  // CAPS
  {
    id: 'cap-001',
    slug: 'satisfaction-signature-cap',
    name: 'Satisfaction Signature Cap',
    category: 'caps',
    categoryLabel: 'Caps',
    price: 18000,
    currency: 'MWK',
    description: 'An unstructured 6-panel dad cap in heavyweight washed cotton twill. Embroidered with the brand manifesto signature on the crown and custom antique brass buckle.',
    details: {
      material: '100% Washed Cotton Chino Twill',
      fit: 'Adjustable Unstructured Low Profile',
      care: 'Spot clean only with damp cloth.',
      origin: 'Crafted with Precision'
    },
    features: [
      'Custom antique brass closure slider',
      'Matching under-visor tone',
      'High-stitch precision 3D micro-embroidery'
    ],
    images: [
      '/images/products/satisfaction-signature-cap.jpg',
      '/images/products/living-water-vintage-cap.jpg'
    ],
    colors: [
      { name: 'Vintage Taupe', hex: '#8A7658' },
      { name: 'Pitch Black', hex: '#171717' },
      { name: 'Stone Grey', hex: '#9E9D98' }
    ],
    sizes: ['One Size'],
    variants: [
      { id: 'ssc-tau-os', color: 'Vintage Taupe', size: 'One Size', stock: 25, sku: 'SSC-TAU-OS' },
      { id: 'ssc-blk-os', color: 'Pitch Black', size: 'One Size', stock: 30, sku: 'SSC-BLK-OS' },
      { id: 'ssc-stn-os', color: 'Stone Grey', size: 'One Size', stock: 15, sku: 'SSC-STN-OS' }
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    badge: 'BESTSELLER',
    relatedProductIds: ['tee-001', 'hoodie-001', 'golf-001']
  },
  {
    id: 'cap-002',
    slug: 'living-water-vintage-cap',
    name: 'Living Water Vintage Cap',
    category: 'caps',
    categoryLabel: 'Caps',
    price: 18500,
    currency: 'MWK',
    description: 'Vintage pigment-dyed cotton silhouette with arched text: "Satisfied in Christ". Everyday durability with streetwear character.',
    details: {
      material: '100% Pigment-dyed Cotton Twill',
      fit: 'One Size with Strapback Buckle',
      care: 'Spot clean only.',
      origin: 'Ethically Sourced'
    },
    features: [
      'Strapback leather enclosure',
      'Breathable embroidered eyelets',
      'Pre-curved visor'
    ],
    images: [
      '/images/products/living-water-vintage-cap.jpg'
    ],
    colors: [
      { name: 'Faded Olive', hex: '#5E604F' },
      { name: 'Espresso', hex: '#3B2F2F' }
    ],
    sizes: ['One Size'],
    variants: [
      { id: 'lwc-olv-os', color: 'Faded Olive', size: 'One Size', stock: 18, sku: 'LWC-OLV-OS' },
      { id: 'lwc-esp-os', color: 'Espresso', size: 'One Size', stock: 12, sku: 'LWC-ESP-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    relatedProductIds: ['cap-001', 'tee-001']
  },

  // GOLF SHIRTS
  {
    id: 'golf-001',
    slug: 'presence-knit-golf-shirt',
    name: 'Presence Knit Golf Shirt',
    category: 'golf-shirts',
    categoryLabel: 'Golf Shirts',
    price: 34000,
    currency: 'MWK',
    description: 'Elevated luxury meets sporty sophistication. Built from double-mercerized organic cotton knit with a refined camp collar and mother-of-pearl buttons.',
    details: {
      material: '100% Double-Mercerized Combed Cotton',
      fit: 'Tailored Athletic Fit',
      care: 'Delicate wash cold, dry flat. Do not tumble dry.',
      origin: 'Artisanal Assembly'
    },
    features: [
      'Silky smooth breathable knit structure',
      'Genuine mother-of-pearl collar buttons',
      'Embroidered brand insignia on left chest'
    ],
    images: [
      '/images/products/presence-knit-golf-shirt.jpg',
      '/images/products/disciple-pique-polo.jpg'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F0ECE1' },
      { name: 'Deep Forest', hex: '#2A342B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { id: 'pkg-crm-s', color: 'Warm Cream', size: 'S', stock: 6, sku: 'PKG-CRM-S' },
      { id: 'pkg-crm-m', color: 'Warm Cream', size: 'M', stock: 14, sku: 'PKG-CRM-M' },
      { id: 'pkg-crm-l', color: 'Warm Cream', size: 'L', stock: 12, sku: 'PKG-CRM-L' },
      { id: 'pkg-crm-xl', color: 'Warm Cream', size: 'XL', stock: 5, sku: 'PKG-CRM-XL' },
      { id: 'pkg-fst-m', color: 'Deep Forest', size: 'M', stock: 8, sku: 'PKG-FST-M' },
      { id: 'pkg-fst-l', color: 'Deep Forest', size: 'L', stock: 9, sku: 'PKG-FST-L' }
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    badge: 'LIMITED',
    relatedProductIds: ['tee-001', 'cap-001', 'golf-002']
  },
  {
    id: 'golf-002',
    slug: 'disciple-pique-polo',
    name: 'Disciple Piqué Polo',
    category: 'golf-shirts',
    categoryLabel: 'Golf Shirts',
    price: 32000,
    currency: 'MWK',
    description: 'Classic heavyweight piqué polo engineered with structured rib cuffs, side-split seams, and an understated monogram.',
    details: {
      material: '100% Organic Piqué Cotton',
      fit: 'Modern Regular Fit',
      care: 'Machine wash cold with like colors.',
      origin: 'Ethically Produced'
    },
    features: [
      'Anti-curl ribbed collar',
      'High breathability weave',
      'Signature side slit design'
    ],
    images: [
      '/images/products/disciple-pique-polo.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717' },
      { name: 'Heather Sand', hex: '#C7BFB3' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { id: 'dpp-blk-m', color: 'Onyx Black', size: 'M', stock: 10, sku: 'DPP-BLK-M' },
      { id: 'dpp-blk-l', color: 'Onyx Black', size: 'L', stock: 15, sku: 'DPP-BLK-L' },
      { id: 'dpp-snd-m', color: 'Heather Sand', size: 'M', stock: 7, sku: 'DPP-SND-M' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    relatedProductIds: ['golf-001', 'cap-001']
  },

  // MUGS
  {
    id: 'mug-001',
    slug: 'morning-manna-stoneware-mug',
    name: 'Morning Manna Stoneware Mug',
    category: 'mugs',
    categoryLabel: 'Mug Cups',
    price: 14000,
    currency: 'MWK',
    description: 'Hand-thrown artisanal ceramic stoneware mug with unglazed textured base. A grounding companion for quiet morning devotionals.',
    details: {
      material: 'High-fire Durable Ceramic Stoneware',
      fit: 'Capacity: 380ml / 13 oz',
      care: 'Microwave and dishwasher safe.',
      origin: 'Artisanal Studio Batch'
    },
    features: [
      'Ergonomic comfortable handle',
      'Engraved brand message on reverse',
      'Matte exterior with glossy easy-clean interior'
    ],
    images: [
      '/images/products/morning-manna-stoneware-mug.jpg',
      '/images/products/satisfied-soul-ceramic-mug.jpg'
    ],
    colors: [
      { name: 'Speckled Clay', hex: '#D1C7BD' },
      { name: 'Matte Charcoal', hex: '#262626' }
    ],
    variants: [
      { id: 'mmm-cly-os', color: 'Speckled Clay', stock: 22, sku: 'MMM-CLY-OS' },
      { id: 'mmm-chr-os', color: 'Matte Charcoal', stock: 18, sku: 'MMM-CHR-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    relatedProductIds: ['mug-002', 'tee-001']
  },
  {
    id: 'mug-002',
    slug: 'satisfied-soul-ceramic-mug',
    name: 'Satisfied Soul Ceramic Mug',
    category: 'mugs',
    categoryLabel: 'Mug Cups',
    price: 13500,
    currency: 'MWK',
    description: 'Sleek minimalist diner-style heavy ceramic mug carrying the brand creed: "In His Presence is Fullness of Joy".',
    details: {
      material: 'Durable Vitrified Porcelain',
      fit: 'Capacity: 350ml / 12 oz',
      care: 'Dishwasher & Microwave safe.',
      origin: 'Imported Quality'
    },
    features: [
      'Heavyweight thermal heat retention',
      'Debossed gloss typography',
      'Chip-resistant rim'
    ],
    images: [
      '/images/products/satisfied-soul-ceramic-mug.jpg'
    ],
    colors: [
      { name: 'Warm Off-White', hex: '#F7F5F0' }
    ],
    variants: [
      { id: 'ssm-wht-os', color: 'Warm Off-White', stock: 28, sku: 'SSM-WHT-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    relatedProductIds: ['mug-001', 'cap-001']
  },

  // ACCESSORIES: Pouches (porcher), Headbands, Bangles, Umbrellas (urmblera)
  {
    id: 'acc-001',
    slug: 'covenant-canvas-pouch',
    name: 'Covenant Canvas Pouch',
    category: 'accessories',
    categoryLabel: 'Accessories & Pouches',
    price: 16000,
    currency: 'MWK',
    description: 'Heavyweight organic canvas utility pouch for stationery, personal scripture journals, tech cords, or daily travel essentials.',
    details: {
      material: '18 oz Heavy Washed Cotton Canvas',
      fit: 'Dimensions: 22cm x 15cm',
      care: 'Spot clean with mild soap.',
      origin: 'Ethically Handcrafted'
    },
    features: [
      'Smooth brass YKK zipper with leather pull',
      'Water-repellent interior lining',
      'Woven brand label'
    ],
    images: [
      '/images/products/covenant-canvas-pouch.jpg'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#D8CFBC' },
      { name: 'Pitch Black', hex: '#171717' }
    ],
    variants: [
      { id: 'ccp-snd-os', color: 'Natural Sand', stock: 20, sku: 'CCP-SND-OS' },
      { id: 'ccp-blk-os', color: 'Pitch Black', stock: 15, sku: 'CCP-BLK-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    badge: 'NEW',
    relatedProductIds: ['mug-001', 'tee-001']
  },
  {
    id: 'acc-002',
    slug: 'rooted-street-headband',
    name: 'Rooted Street Headband',
    category: 'accessories',
    categoryLabel: 'Accessories & Headbands',
    price: 9500,
    currency: 'MWK',
    description: 'Performance-grade moisture-wicking ribbed streetwear headband with woven Jesus Is The Real Satisfaction badge.',
    details: {
      material: 'Organic Elastic Ribbed Cotton Blend',
      fit: 'Comfort Stretch One Size',
      care: 'Machine wash cold.',
      origin: 'Imported'
    },
    features: [
      'Non-slip grip interior texture',
      'Breathable sweat absorbing fabric',
      'Minimalist front patch'
    ],
    images: [
      '/images/products/rooted-street-headband.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717' },
      { name: 'Chalk White', hex: '#FFFFFF' }
    ],
    variants: [
      { id: 'rsh-blk-os', color: 'Onyx Black', stock: 35, sku: 'RSH-BLK-OS' },
      { id: 'rsh-wht-os', color: 'Chalk White', stock: 25, sku: 'RSH-WHT-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    relatedProductIds: ['cap-001', 'tee-001']
  },
  {
    id: 'acc-003',
    slug: 'truth-cuff-bangle',
    name: 'Truth Cuff Bangle',
    category: 'accessories',
    categoryLabel: 'Accessories & Bangles',
    price: 22000,
    currency: 'MWK',
    description: 'Matte stainless steel cuff bangle subtly laser-inscribed with "JESUS IS THE SATISFACTION" on the inner curve.',
    details: {
      material: '316L Marine-Grade Stainless Steel',
      fit: 'Semi-adjustable Open Cuff (Unisex)',
      care: 'Wipe with microfiber cloth. Waterproof and tarnish resistant.',
      origin: 'Precision Laser Cut'
    },
    features: [
      'Hypoallergenic & nickel free',
      'Secret inward-facing scripture coordinate',
      'Brushed tactile matte finish'
    ],
    images: [
      '/images/products/truth-cuff-bangle.jpg'
    ],
    colors: [
      { name: 'Brushed Silver', hex: '#C0C0C0' },
      { name: 'Matte Black', hex: '#222222' }
    ],
    variants: [
      { id: 'tcb-slv-os', color: 'Brushed Silver', stock: 16, sku: 'TCB-SLV-OS' },
      { id: 'tcb-blk-os', color: 'Matte Black', stock: 14, sku: 'TCB-BLK-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    relatedProductIds: ['tee-001', 'hoodie-001']
  },
  {
    id: 'acc-004',
    slug: 'shelter-storm-umbrella',
    name: 'Shelter In The Storm Umbrella',
    category: 'accessories',
    categoryLabel: 'Accessories & Umbrellas',
    price: 29000,
    currency: 'MWK',
    description: 'Wind-resistant 8-rib reinforced storm umbrella with natural maple wood crook handle and discreet tonal message.',
    details: {
      material: 'Pongee 210T Waterproof Repellent Fabric with Fiberglass Ribs',
      fit: 'Diameter: 105cm, Automatic Open Button',
      care: 'Leave open to dry before folding.',
      origin: 'Engineered Precision'
    },
    features: [
      'Solid wooden ergonomic hooked handle',
      'Windproof inverted-resistance dual canopy',
      'Matching protective travel sheath'
    ],
    images: [
      '/images/products/shelter-storm-umbrella.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171717' }
    ],
    variants: [
      { id: 'ssu-blk-os', color: 'Onyx Black', stock: 12, sku: 'SSU-BLK-OS' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    relatedProductIds: ['hoodie-001', 'cap-001']
  }
];

export const CATEGORIES = [
  {
    id: 'caps',
    name: 'Caps',
    slug: 'caps',
    description: 'Unstructured dad caps and vintage silhouettes made for everyday statement.',
    image: '/images/categories/caps.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 'caps').length
  },
  {
    id: 't-shirts',
    name: 'T-shirts',
    slug: 't-shirts',
    description: 'Heavyweight organic cotton tees featuring contemporary boxy cuts.',
    image: '/images/categories/t-shirts.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 't-shirts').length
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Dense 450 GSM French terry hoodies with clean architectural draping.',
    image: '/images/categories/hoodies.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 'hoodies').length
  },
  {
    id: 'golf-shirts',
    name: 'Golf Shirts',
    slug: 'golf-shirts',
    description: 'Double-mercerized cotton knits and organic piqué collars.',
    image: '/images/categories/golf-shirts.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 'golf-shirts').length
  },
  {
    id: 'mugs',
    name: 'Mugs',
    slug: 'mugs',
    description: 'Handcrafted stoneware and vitrified ceramic diner mugs.',
    image: '/images/categories/mugs.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 'mugs').length
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Pouches, headbands, stainless cuffs, and storm umbrellas.',
    image: '/images/products/covenant-canvas-pouch.jpg',
    itemCount: PRODUCTS.filter(p => p.category === 'accessories').length
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all' || !category) return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

export function formatPrice(price: number, currency: string = 'MWK'): string {
  return `${currency} ${price.toLocaleString('en-US')}`;
}
