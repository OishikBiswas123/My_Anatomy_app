import { ConnectiveStructure } from '../../types/anatomy';

export const CONNECTIVE_DATA: ConnectiveStructure[] = [
  // --- TENDONS & APONEUROSES ---
  {
    id: 'connective_achilles_tendon',
    name: 'Calcaneal Tendon (Achilles Tendon)',
    latinName: 'Tendo calcaneus',
    commonName: 'Achilles tendon',
    system: 'connective',
    region: 'lower_limb',
    meshId: 't_calcaneal_tendon_l',
    meshIds: ['t_calcaneal_tendon_l', 't_calcaneal_tendon_r'],
    tissueType: 'Tendon',
    composition: 'Dense regular connective tissue (predominantly Type I Collagen, 90-95% parallel fibrils)',
    location: 'Posterior compartment of the distal lower leg and posterior hindfoot',
    description: 'The thickest, strongest, and most resilient tendon in the human body. It unites the gastrocnemius and soleus muscles (triceps surae) and the plantaris into a single powerful terminal insertion on the calcaneal tuberosity.',
    attachmentPoints: [
      'Proximal: Musculotendinous junction of gastrocnemius bellies (mid-calf) and deeper soleus aponeurosis',
      'Distal: Posterior surface of the calcaneal tuberosity of the calcaneus (heel bone)'
    ],
    biomechanicalFunction: [
      'Transfers tensile forces up to 10 times body weight during sprinting and jumping',
      'Acts as a dynamic biological spring, storing and returning elastic kinetic energy during locomotion to reduce the metabolic cost of walking by up to 50%',
      'Powers forceful plantarflexion of the talocrural ankle joint'
    ],
    jointOrStructureAssociation: 'Talocrural (ankle) joint and subtalar joint',
    vascularity: 'Hypovascular watershed zone approximately 2 to 6 cm proximal to the calcaneal insertion (site of highest rupture incidence)',
    commonPathologies: [
      'Acute Achilles tendon rupture: Sudden explosive dorsiflexion against a contracted triceps surae; diagnosed with positive Thompson squeeze test',
      'Achilles tendinopathy / tendinosis: Microtears and failed collagen healing response in the hypovascular midportion or insertional zone',
      'Retrocalcaneal bursitis: Inflammation of the synovial bursa separating the tendon from the superior calcaneus'
    ],
    clinicalNotes: [
      'The Achilles tendon undergoes a 90-degree internal spiral rotation as it descends, creating high tensile strength and energy storage capacity.',
      'Fluoroquinolone antibiotics (e.g. ciprofloxacin) and local corticosteroid injections carry an established risk of precipitating acute Achilles tendinopathy and rupture.'
    ],
    tags: ['achilles', 'tendon', 'calf', 'calcaneus', 'triceps surae', 'locomotion', 'spring']
  },
  {
    id: 'connective_it_band',
    name: 'Iliotibial Tract (IT Band)',
    latinName: 'Tractus iliotibialis',
    commonName: 'IT Band',
    system: 'connective',
    region: 'lower_limb',
    meshId: 't_it_band_l',
    meshIds: ['t_it_band_l', 't_it_band_r'],
    tissueType: 'Deep Fascia',
    composition: 'Dense fibrous connective tissue forming a thickened longitudinal reinforcement of the fascia lata',
    location: 'Lateral thigh running from iliac crest to anterolateral proximal tibia',
    description: 'A robust, wide fascial band running down the lateral aspect of the thigh. It acts as an anterolateral tension band that converts lateral bending moments on the femur into axial compressive loads.',
    attachmentPoints: [
      'Proximal: Tuber of the iliac crest; receives strong tendinous insertions from the Tensor Fasciae Latae (anteriorly) and Gluteus Maximus (posteriorly)',
      'Distal: Gerdy tubercle on the anterolateral condyle of the proximal tibia and lateral patellar retinaculum'
    ],
    biomechanicalFunction: [
      'Maintains lateral knee joint stability, resisting varus deformity and excessive internal tibial rotation',
      'Assists in hip abduction and acts as an extensor of the knee in the terminal 30 degrees of extension',
      'Shifts posterior to the lateral femoral epicondyle during knee flexion >30 degrees'
    ],
    jointOrStructureAssociation: 'Femoroacetabular (hip) joint and tibiofemoral (knee) joint',
    vascularity: 'Fibrous aponeurotic tissue with rich peripheral vascular supply from lateral circumflex femoral and superior lateral genicular arteries',
    commonPathologies: [
      'Iliotibial Band Friction Syndrome (ITBFS): Friction or compression of the deep innervated fat pad against the lateral femoral epicondyle; prominent overuse injury in long-distance runners and cyclists',
      'Trochanteric bursitis / Greater trochanteric pain syndrome: Repetitive friction over the greater trochanter'
    ],
    clinicalNotes: [
      'Ober test is the gold-standard clinical examination for evaluating contracture or tightness of the iliotibial band and tensor fasciae latae.',
      'Noble compression test reproduces localized pain over the lateral femoral condyle at approximately 30 degrees of knee flexion.'
    ],
    tags: ['it band', 'fascia lata', 'gerdy tubercle', 'runner knee', 'knee stability', 'tensor fasciae latae']
  },
  {
    id: 'connective_linea_alba',
    name: 'Linea Alba',
    latinName: 'Linea alba',
    commonName: 'Abdominal midline white line',
    system: 'connective',
    region: 'spine_trunk',
    meshId: 't_linea_alba',
    tissueType: 'Aponeurosis',
    composition: 'Dense regular connective tissue composed of crisscrossing collagen fibers derived from three flat abdominal aponeuroses',
    location: 'Anterior midline of the abdominal wall from xiphoid process to pubic symphysis',
    description: 'A tough, fibrous cord formed by the midline decussation and interlacing fibers of the aponeuroses of the external oblique, internal oblique, and transversus abdominis muscles. It separates the paired rectus abdominis muscles.',
    attachmentPoints: [
      'Superior: Xiphoid process of the sternum and adjacent 7th costal cartilages',
      'Inferior: Pubic symphysis and pubic crest'
    ],
    biomechanicalFunction: [
      'Anchors the contralateral abdominal muscle groups during torso rotation, lateral flexion, and forced expiration',
      'Maintains intra-abdominal pressure during Valsalva maneuvers (coughing, defecation, childbirth)',
      'Stabilizes the anterior trunk wall against distraction forces'
    ],
    jointOrStructureAssociation: 'Rectus sheath and anterior abdominal wall musculature',
    vascularity: 'Avascular in the midline, receiving microvascular diffusion from surrounding rectus sheath vessels',
    commonPathologies: [
      'Diastasis recti: Abnormal widening and thinning of the linea alba (>2 cm) without fascial disruption, frequent during late pregnancy or morbid obesity',
      'Epigastric hernia: Defect in the supraumbilical linea alba permitting preperitoneal fat or omentum protrusion',
      'Umbilical hernia: Herniation through the natural umbilical cicatricial ring defect within the linea alba'
    ],
    clinicalNotes: [
      'Because the linea alba is virtually bloodless and contains no major nerves, the midline laparotomy is the fastest, classic surgical entry to the peritoneal cavity in trauma surgery.'
    ],
    tags: ['linea alba', 'abdomen', 'aponeurosis', 'rectus sheath', 'laparotomy', 'diastasis recti']
  },
  {
    id: 'connective_epicranial_aponeurosis',
    name: 'Galea Aponeurotica (Epicranial Aponeurosis)',
    latinName: 'Galea aponeurotica',
    commonName: 'Scalp aponeurosis',
    system: 'connective',
    region: 'head_neck',
    meshId: 't_epicranial_aponeurosis_l',
    meshIds: ['t_epicranial_aponeurosis_l', 't_epicranial_aponeurosis_r'],
    tissueType: 'Aponeurosis',
    composition: 'Tough, dense, inelastic sheet of collagenous connective tissue',
    location: 'Superior calvaria beneath the hair-bearing scalp layers',
    description: 'A helmet-like fibrous sheet that forms the third layer of the scalp (S-C-A-L-P: Skin, Connective tissue, Aponeurosis, Loose areolar tissue, Pericranium). It bridges the frontal and occipital bellies of the occipitofrontalis muscle.',
    attachmentPoints: [
      'Posterior: External occipital protuberance (inion) and superior nuchal line',
      'Anterior: Extends into a narrow interval between the frontalis muscles, fusing with orbital subcutaneous tissue',
      'Lateral: Continues over the temporal fascia as a thin layer to the zygomatic arch'
    ],
    biomechanicalFunction: [
      'Transmits tension from the occipitalis to the frontalis, elevating the eyebrows and wrinkling the forehead',
      'Acts as a defensive helmet shielding the underlying cranial bones and meninges from blunt external impacts'
    ],
    jointOrStructureAssociation: 'Scalp layers and epicranial musculature',
    vascularity: 'Superficial temporal and occipital arterial networks traverse the dense connective tissue layer immediately superficial to the galea',
    commonPathologies: [
      'Scalp lacerations: Lacerations involving the galea gape widely due to the opposing coronal pull of the frontalis and occipitalis muscles, requiring mandatory layered suture closure',
      'Subgaleal hematoma: Rupture of emissary veins leading to blood accumulation in the loose areolar space beneath the galea, which can cross suture lines across the entire calvaria'
    ],
    clinicalNotes: [
      'The loose areolar tissue immediately beneath the galea aponeurotica is known clinically as the "danger zone of the scalp" because emissary veins can transport scalp infections into intracranial dural venous sinuses.'
    ],
    tags: ['scalp', 'galea', 'aponeurosis', 'cranium', 'frontalis', 'danger area']
  },
  {
    id: 'connective_inguinal_ligament',
    name: 'Inguinal Ligament (Poupart Ligament)',
    latinName: 'Ligamentum inguinale',
    commonName: 'Groin ligament',
    system: 'connective',
    region: 'pelvis_hip',
    meshId: 't_inguinal_ligament_l',
    meshIds: ['t_inguinal_ligament_l', 't_inguinal_ligament_r'],
    tissueType: 'Ligament',
    composition: 'Dense regular collagenous connective tissue formed by the thickened inferior border of the external oblique aponeurosis',
    location: 'Anterior inferior abdominal boundary demarcating the trunk from the thigh',
    description: 'A prominent oblique fibrous band spanning between the anterior superior iliac spine and the pubic tubercle. It forms the floor of the inguinal canal and marks the critical boundary between the abdominal cavity and femoral triangle.',
    attachmentPoints: [
      'Lateral: Anterior Superior Iliac Spine (ASIS)',
      'Medial: Pubic tubercle of the pubic bone; expands laterally as the lacunar ligament (Gimbernat) and pectineal ligament (Cooper)'
    ],
    biomechanicalFunction: [
      'Anchors the inferior anterior abdominal wall musculature and fascia transversalis',
      'Forms a natural retinacular arch protecting traversing neurovascular structures (Femoral Nerve, Femoral Artery, Femoral Vein, Psoas major muscle)'
    ],
    jointOrStructureAssociation: 'Pelvic girdle, inguinal canal, and femoral triangle',
    vascularity: 'Superficial and deep circumflex iliac vessels',
    commonPathologies: [
      'Inguinal hernia: Occurs superior to the inguinal ligament (indirect via deep inguinal ring, or direct through Hesselbach triangle)',
      'Femoral hernia: Protrusion of viscera inferior to the inguinal ligament through the femoral ring into the femoral canal (high strangulation risk)',
      'Meralgia paresthetica: Entrapment of the lateral femoral cutaneous nerve as it passes under the lateral attachment of the inguinal ligament'
    ],
    clinicalNotes: [
      'The midpoint of the inguinal ligament marks the surface landmark for palpating the femoral pulse and cannulating the femoral artery/vein during cardiac catheterization.'
    ],
    tags: ['groin', 'inguinal ligament', 'poupart', 'hernia', 'femoral triangle', 'asis']
  },

  // --- CARTILAGES ---
  {
    id: 'connective_costal_cartilage',
    name: 'Costal Cartilages (1–10)',
    latinName: 'Cartilagines costales',
    commonName: 'Rib cage cartilages',
    system: 'connective',
    region: 'thoracic_cage',
    meshId: 'b_cc1_l',
    meshIds: [
      'b_cc1_l', 'b_cc1_r', 'b_cc2_l', 'b_cc2_r', 'b_cc3_l', 'b_cc3_r',
      'b_cc4_l', 'b_cc4_r', 'b_cc5_l', 'b_cc5_r', 'b_cc6_l', 'b_cc6_r',
      'b_cc7_l', 'b_cc7_r', 'b_cc8_l', 'b_cc8_r', 'b_cc9_l', 'b_cc9_r',
      'b_cc10_l', 'b_cc10_r'
    ],
    tissueType: 'Cartilage',
    composition: 'Specialized Hyaline Cartilage composed of chondrocytes, Type II Collagen fibers, and chondroitin sulfate proteoglycan matrix',
    location: 'Anterior ends of ribs 1–10 articulating with the sternum',
    description: 'Segments of resilient hyaline cartilage that prolong the anterior ends of the ribs. Cartilages 1–7 articulate directly with the sternum (true ribs), while cartilages 8–10 articulate with the cartilage immediately above to form the costal arch (false ribs).',
    attachmentPoints: [
      'Lateral: Costochondral junction at the anterior cup of each rib',
      'Medial: Sternocostal facets along the lateral borders of the manubrium and sternal body (ribs 1–7)'
    ],
    biomechanicalFunction: [
      'Provides structural elasticity enabling thoracic cavity expansion and recoil during tidal and forced ventilation (pump-handle and bucket-handle breathing mechanics)',
      'Absorbs kinetic impact energy to shield the underlying heart, lungs, and mediastinal vessels from blunt trauma'
    ],
    jointOrStructureAssociation: 'Sternocostal, costochondral, and interchondral synovial joints',
    vascularity: 'Avascular; nourished entirely by perichondrial capillary diffusion and synovial fluid exchange',
    commonPathologies: [
      'Costochondritis: Benign inflammatory condition causing localized anterior chest pain and tenderness, often mimicking acute coronary syndrome',
      'Tietze syndrome: Painful swelling of the upper costochondral junctions (usually 2nd or 3rd ribs) with erythema and warmth',
      'Costochondral separation / dislocation: Traumatic detachment of the rib from its cartilage, characterized by severe localized breathing pain'
    ],
    clinicalNotes: [
      'Costal cartilage naturally undergoes progressive focal calcification with advancing age, which becomes visible on routine chest radiographs and reduces chest wall compliance in elderly patients.',
      'Autologous costal cartilage grafts are widely utilized in reconstructive plastic surgery for microtia ear reconstruction and complex rhinoplasty.'
    ],
    tags: ['costal cartilage', 'ribs', 'sternum', 'hyaline cartilage', 'costochondritis', 'respiration']
  },
  {
    id: 'connective_intervertebral_discs',
    name: 'Intervertebral Discs (C2–S1)',
    latinName: 'Disci intervertebrales',
    commonName: 'Spinal discs',
    system: 'connective',
    region: 'spine_trunk',
    meshId: 'b_disc_l4_l5',
    meshIds: [
      'b_disc_c2_c3', 'b_disc_c3_c4', 'b_disc_c4_c5', 'b_disc_c5_c6', 'b_disc_c6_c7', 'b_disc_c7_t1',
      'b_disc_t1_t2', 'b_disc_t2_t3', 'b_disc_t3_t4', 'b_disc_t4_t5', 'b_disc_t5_t6', 'b_disc_t6_t7',
      'b_disc_t7_t8', 'b_disc_t8_t9', 'b_disc_t9_t10', 'b_disc_t10_t11', 'b_disc_t11_t12', 'b_disc_t12_l1',
      'b_disc_l1_l2', 'b_disc_l2_l3', 'b_disc_l3_l4', 'b_disc_l4_l5', 'b_disc_l5_s1'
    ],
    tissueType: 'Cartilage',
    composition: 'Dual fibrocartilage structure: peripheral Anulus Fibrosus (concentric lamellae of Type I Collagen) and central Nucleus Pulposus (hydrated proteoglycan gel with Type II Collagen)',
    location: 'Between adjacent vertebral bodies from C2 to the sacrum (account for 25% of total spinal column length)',
    description: 'Twenty-three fibrocartilaginous symphyses uniting adjacent vertebral bodies. They provide mechanical shock absorption, permit multi-axial spinal movements, and prevent bone-on-bone abrasion.',
    attachmentPoints: [
      'Superior and Inferior: Hyaline cartilaginous vertebral endplates fused to subchondral bone of adjacent vertebral bodies',
      'Anterior and Posterior: Anchored to the Anterior and Posterior Longitudinal Ligaments'
    ],
    biomechanicalFunction: [
      'Hydraulic shock absorption: Distributes heavy axial compressive forces uniformly across the vertebral body endplates',
      'Permits multi-directional segmental flexibility (flexion, extension, lateral bending, axial rotation) while restraining excessive shear'
    ],
    jointOrStructureAssociation: 'Intervertebral symphyses (amphiarthroses)',
    vascularity: 'The largest avascular structures in the entire human body; nutrition occurs solely via passive solute diffusion across the vertebral endplates',
    commonPathologies: [
      'Herniated Nucleus Pulposus (HNP): Rupture of the posterior anulus fibrosus with protrusion of nuclear material into the spinal canal or intervertebral foramen, causing nerve root compression (radiculopathy / sciatica)',
      'Degenerative Disc Disease (DDD): Age-related dehydration and loss of proteoglycans leading to reduced disc height, osteophyte formation, and facet arthrosis',
      'Cauda equina syndrome: Massive central lumbar disc herniation compressing multiple lumbosacral roots, causing urinary retention, saddle anesthesia, and bilateral lower extremity weakness (surgical emergency)'
    ],
    clinicalNotes: [
      'Over 90% of all spinal disc herniations occur at the lower lumbar levels (L4–L5 and L5–S1) due to the immense mechanical torque concentrated at the lumbosacral transition zone.'
    ],
    tags: ['spine', 'intervertebral disc', 'annulus fibrosus', 'nucleus pulposus', 'sciatica', 'shock absorber']
  },
  {
    id: 'connective_pubic_symphysis',
    name: 'Pubic Symphysis Fibrocartilaginous Disc',
    latinName: 'Discus interpubicus',
    commonName: 'Pubic joint disc',
    system: 'connective',
    region: 'pelvis_hip',
    meshId: 'b_interpubic_disc',
    tissueType: 'Cartilage',
    composition: 'Thick fibrocartilaginous plate with a rudimentary non-synovial central fluid cleft',
    location: 'Anterior midline of the pelvic ring uniting the left and right pubic bodies',
    description: 'A nonsynovial amphiarthrodial joint connecting the pubic bones. The interpubic disc is firmly reinforced by the superior pubic ligament and the arcuate (inferior) pubic ligament.',
    attachmentPoints: [
      'Lateral margins: Thin layers of hyaline cartilage lining the articular surfaces of the left and right pubic symphyseal facets',
      'Periphery: Intertwines with the aponeurosis of the rectus abdominis and gracilis tendons'
    ],
    biomechanicalFunction: [
      'Resists tension, shear, and compression across the anterior pelvic ring during upright walking and weight-bearing',
      'Undergoes physiological widening and ligamentous laxity under relaxin hormone influence during late pregnancy and parturition'
    ],
    jointOrStructureAssociation: 'Pelvic ring and sacroiliac joint stability',
    vascularity: 'Avascular central zone with peripheral vascular plexus from obturator and internal pudendal arteries',
    commonPathologies: [
      'Osteitis pubis: Painful, non-infectious chronic inflammatory overuse condition of the pubic symphysis common in kicking athletes (soccer players)',
      'Pubic symphysis diastasis: Traumatic separation (>10 mm) of the joint during pelvic ring disruption fractures ("open-book" pelvis) or difficult operative vaginal deliveries'
    ],
    clinicalNotes: [
      'A pubic symphysis separation exceeding 2.5 cm indicates complete rupture of the anterior sacroiliac ligaments and unstable pelvic ring collapse.'
    ],
    tags: ['pubic symphysis', 'pelvis', 'fibrocartilage', 'relaxin', 'osteitis pubis', 'open book']
  }
];
