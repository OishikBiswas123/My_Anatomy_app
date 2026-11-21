import { MuscleStructure } from '../../types/anatomy';

export const MUSCLES_DATA: MuscleStructure[] = [
  // --- HEAD & NECK ---
  {
    id: 'muscle_sternocleidomastoid',
    name: 'Sternocleidomastoid',
    latinName: 'Musculus sternocleidomastoideus',
    commonName: 'SCM neck muscle',
    system: 'muscular',
    region: 'head_neck',
    meshId: 'muscle_sternocleidomastoid',
    location: 'Anterolateral neck connecting sternum/clavicle to temporal bone',
    description: 'Prominent two-headed neck muscle that divides the neck into anterior and posterior triangles.',
    origin: ['Sternal head: Anterior surface of manubrium sterni', 'Clavicular head: Superior surface of medial third of clavicle'],
    insertion: ['Lateral surface of mastoid process of temporal bone', 'Lateral half of superior nuchal line of occipital bone'],
    action: [
      'Unilateral: Tilts head toward ipsilateral shoulder while rotating face toward contralateral side',
      'Bilateral: Flexes the cervical vertebral column and head forward; acts as accessory inspiratory muscle lifting thoracic cage'
    ],
    innervation: 'Spinal accessory nerve (CN XI, motor) and cervical plexus (C2–C3, proprioception)',
    bloodSupply: 'Occipital artery, superior thyroid artery, and suprascapular artery',
    antagonists: ['Splenius capitis (contralateral rotation)', 'Posterior deep cervical extensors'],
    synergists: ['Scalene muscles', 'Trapezius'],
    clinicalNotes: [
      'Congenital torticollis ("wry neck") is caused by shortening or fibromatosis of the SCM in infants, causing persistent lateral tilt and opposite face rotation.',
      'CN XI can be damaged during posterior triangle lymph node biopsy, leading to weakness turning head against resistance.'
    ],
    tags: ['neck', 'scm', 'accessory nerve', 'torticollis', 'triangles of neck']
  },
  {
    id: 'muscle_trapezius',
    name: 'Trapezius',
    latinName: 'Musculus trapezius',
    commonName: 'Traps',
    system: 'muscular',
    region: 'back',
    meshId: 'muscle_trapezius',
    location: 'Posterior aspect of neck and upper thorax',
    description: 'A large, flat, superficial diamond-shaped muscle covering the posterior neck and upper trunk.',
    origin: ['Medial third of superior nuchal line', 'External occipital protuberance', 'Ligamentum nuchae', 'Spinous processes of C7–T12 vertebrae'],
    insertion: ['Lateral third of clavicle', 'Acromion of scapula', 'Spine of scapula'],
    action: [
      'Descending (superior) fibers: Elevate the scapula and upwardly rotate glenoid cavity',
      'Transverse (middle) fibers: Retract (adduct) the scapula toward midline',
      'Ascending (inferior) fibers: Depress the scapula and assist upward rotation'
    ],
    innervation: 'Spinal accessory nerve (CN XI, motor) and ventral rami of C3–C4 (sensory/proprioception)',
    bloodSupply: 'Transverse cervical artery (cervicodorsal trunk)',
    clinicalNotes: [
      'Iatrogenic injury to CN XI during radical neck dissection produces severe shoulder drop, inability to shrug against resistance, and winged scapula during abduction.'
    ],
    tags: ['back', 'neck', 'shoulder shrug', 'cn xi', 'scapula']
  },

  // --- CHEST & ABDOMEN ---
  {
    id: 'muscle_pectoralis_major',
    name: 'Pectoralis Major',
    latinName: 'Musculus pectoralis major',
    commonName: 'Pecs / Chest muscle',
    system: 'muscular',
    region: 'chest',
    meshId: 'muscle_pectoralis_major',
    location: 'Anterior chest wall',
    description: 'Thick, fan-shaped muscle forming the bulk of the anterior chest and the anterior axillary fold.',
    origin: ['Clavicular head: Anterior surface of medial half of clavicle', 'Sternocostal head: Anterior sternum and costal cartilages 1–6', 'Abdominal head: Aponeurosis of external oblique'],
    insertion: ['Lateral lip of the intertubercular (bicipital) groove of the humerus'],
    action: [
      'Adducts and medially rotates the humerus at the glenohumeral joint',
      'Clavicular head: Flexes the humerus from extended position',
      'Sternocostal head: Extends the flexed humerus back toward anatomical position'
    ],
    innervation: 'Lateral pectoral nerve (C5–C7) and medial pectoral nerve (C8–T1)',
    bloodSupply: 'Pectoral branch of thoracoacromial artery and lateral thoracic artery',
    clinicalNotes: [
      'Rupture of the pectoralis major tendon occurs during heavy bench pressing, causing sharp pain, ecchymosis over anterior axilla, and loss of the anterior axillary fold.'
    ],
    tags: ['chest', 'bench press', 'humerus adduction', 'axilla', 'pectoral']
  },
  {
    id: 'muscle_rectus_abdominis',
    name: 'Rectus Abdominis',
    latinName: 'Musculus rectus abdominis',
    commonName: 'Abs / Six-pack',
    system: 'muscular',
    region: 'abdomen',
    meshId: 'muscle_rectus_abdominis',
    location: 'Anterior abdominal wall enclosed within rectus sheath',
    description: 'Long vertical strap muscle running the full length of the anterior abdominal wall, segmented by fibrous tendinous intersections.',
    origin: ['Pubic crest and pubic symphysis'],
    insertion: ['Xiphoid process and costal cartilages of ribs 5–7'],
    action: ['Flexes thoracic and lumbar vertebral column (curling trunk forward)', 'Compresses abdominal contents to assist expiration, defecation, and childbirth'],
    innervation: 'Thoracoabdominal nerves (ventral rami of T7–T11 spinal nerves) and subcostal nerve (T12)',
    bloodSupply: 'Superior epigastric artery (internal thoracic) and inferior epigastric artery (external iliac)',
    clinicalNotes: [
      'Diastasis recti is a separation of the left and right rectus abdominis muscles along the linea alba, frequently seen postpartum.',
      'Rectus sheath hematoma occurs when epigastric vessels tear after violent coughing or trauma.'
    ],
    tags: ['abdomen', 'abs', 'rectus sheath', 'core', 'trunk flexion']
  },

  // --- SHOULDER & ARM ---
  {
    id: 'muscle_deltoid',
    name: 'Deltoid',
    latinName: 'Musculus deltoideus',
    commonName: 'Shoulder cap muscle',
    system: 'muscular',
    region: 'shoulder',
    meshId: 'muscle_deltoid',
    location: 'Overlying shoulder joint like an epaulette',
    description: 'Triangular muscle with three distinct functional regions that gives the shoulder its rounded contour.',
    origin: ['Anterior fibers: Lateral third of clavicle', 'Middle fibers: Acromion of scapula', 'Posterior fibers: Spine of scapula'],
    insertion: ['Deltoid tuberosity on lateral midshaft of humerus'],
    action: [
      'Middle (acromial) fibers: Prime mover of arm abduction between 15° and 90°',
      'Anterior (clavicular) fibers: Flexes and medially rotates arm',
      'Posterior (spinal) fibers: Extends and laterally rotates arm'
    ],
    innervation: 'Axillary nerve (C5–C6)',
    bloodSupply: 'Posterior circumflex humeral artery and deltoid branch of thoracoacromial artery',
    clinicalNotes: [
      'Common site for intramuscular injections (given 2–3 fingerbreadths below acromion to avoid axillary nerve).',
      'Anterior shoulder dislocation can compress or avulse the axillary nerve, resulting in deltoid atrophy and sensory loss over the "sergeant’s patch".'
    ],
    tags: ['shoulder', 'abduction', 'axillary nerve', 'im injection']
  },
  {
    id: 'muscle_biceps_brachii',
    name: 'Biceps Brachii',
    latinName: 'Musculus biceps brachii',
    commonName: 'Biceps',
    system: 'muscular',
    region: 'upper_arm',
    meshId: 'muscle_biceps_brachii',
    location: 'Anterior compartment of the arm',
    description: 'Two-headed, two-joint muscle crossing both the glenohumeral and elbow joints.',
    origin: ['Long head: Supraglenoid tubercle of scapula (traverses joint capsule in bicipital groove)', 'Short head: Coracoid process of scapula'],
    insertion: ['Radial tuberosity and bicipital aponeurosis into deep fascia of forearm'],
    action: [
      'Powerful supinator of the flexed forearm ("tightening a screw with right hand")',
      'Primary flexor of the elbow joint',
      'Weak accessory flexor of the glenohumeral joint'
    ],
    innervation: 'Musculocutaneous nerve (C5–C6)',
    bloodSupply: 'Muscular branches of the brachial artery',
    clinicalNotes: [
      'Long head tendon rupture produces the classic "Popeye muscle" deformity in the anterior arm.',
      'Biceps tendon reflex tests the integrity of the C5–C6 spinal cord segments via the musculocutaneous nerve.'
    ],
    tags: ['arm', 'biceps', 'elbow flexion', 'supination', 'musculocutaneous']
  },
  {
    id: 'muscle_triceps_brachii',
    name: 'Triceps Brachii',
    latinName: 'Musculus triceps brachii',
    commonName: 'Triceps',
    system: 'muscular',
    region: 'upper_arm',
    meshId: 'muscle_triceps_brachii',
    location: 'Posterior compartment of the arm',
    description: 'Large three-headed muscle occupying the entirety of the posterior aspect of the brachium.',
    origin: [
      'Long head: Infraglenoid tubercle of scapula',
      'Lateral head: Posterior humeral shaft superior to radial groove',
      'Medial head: Posterior humeral shaft inferior to radial groove'
    ],
    insertion: ['Proximal surface of olecranon process of ulna'],
    action: ['Chief extensor of the elbow joint; long head also assists in arm adduction and extension at shoulder'],
    innervation: 'Radial nerve (C6–C8)',
    bloodSupply: 'Deep brachial (profunda brachii) artery',
    clinicalNotes: [
      'Triceps reflex tests C7–C8 spinal reflex arc.',
      'Because the medial head branches often exit proximal to the spiral groove, elbow extension may be partially preserved in midshaft humeral fractures despite radial nerve palsy.'
    ],
    tags: ['arm', 'triceps', 'elbow extension', 'radial nerve', 'olecranon']
  },

  // --- PELVIS, THIGH & LEG ---
  {
    id: 'muscle_gluteus_maximus',
    name: 'Gluteus Maximus',
    latinName: 'Musculus gluteus maximus',
    commonName: 'Glutes / Buttock muscle',
    system: 'muscular',
    region: 'hip_gluteal',
    meshId: 'muscle_gluteus_maximus',
    location: 'Posterior pelvic region forming the buttock prominence',
    description: 'The heaviest and most massive muscle in the human body. Crucial for human erect posture, climbing, and running.',
    origin: ['Outer slope of dorsal ilium behind posterior gluteal line', 'Dorsal surface of sacrum and coccyx', 'Sacrotuberous ligament'],
    insertion: ['Iliotibial tract (upper 75% of fibers)', 'Gluteal tuberosity of femur (lower 25% of fibers)'],
    action: [
      'Primary, powerful extensor of the hip joint (especially rising from seated position, climbing stairs, or sprinting)',
      'Lateral rotator and abductor of the thigh'
    ],
    innervation: 'Inferior gluteal nerve (L5–S2)',
    bloodSupply: 'Superior and inferior gluteal arteries',
    clinicalNotes: [
      'Gluteus maximus lurch (inferior gluteal nerve injury): the patient thrusts the trunk backward at heel strike to maintain hip extension.',
      'Intramuscular injections must be targeted strictly to the upper outer quadrant of the buttock to avoid injuring the sciatic nerve.'
    ],
    tags: ['buttock', 'glute', 'hip extension', 'inferior gluteal nerve', 'stairs']
  },
  {
    id: 'muscle_quadriceps_femoris',
    name: 'Quadriceps Femoris (Rectus Femoris & Vasti)',
    latinName: 'Musculus quadriceps femoris',
    commonName: 'Quads / Thigh extensor',
    system: 'muscular',
    region: 'thigh',
    meshId: 'muscle_quadriceps_femoris',
    location: 'Anterior compartment of the thigh',
    description: 'Massive four-headed muscle group consisting of Rectus Femoris, Vastus Lateralis, Vastus Medialis, and Vastus Intermedius.',
    origin: ['Rectus femoris: Anterior inferior iliac spine (AIIS) and superior acetabular rim', 'Vasti: Intertrochanteric line, linea aspera, and femoral shaft surfaces'],
    insertion: ['Common quadriceps tendon inserting into patella, continuing via patellar ligament into tibial tuberosity'],
    action: ['Great extensor of the knee joint; Rectus femoris also flexes the hip joint'],
    innervation: 'Femoral nerve (L2–L4)',
    bloodSupply: 'Lateral and medial femoral circumflex arteries and deep femoral artery',
    clinicalNotes: [
      'Patellar tendon reflex ("knee-jerk") tests the femoral nerve and spinal reflex roots L3–L4.',
      'Vastus medialis oblique (VMO) is essential for medial tracking of the patella; weakness promotes lateral patellar subluxation.'
    ],
    tags: ['thigh', 'quadriceps', 'knee extension', 'femoral nerve', 'knee jerk']
  },
  {
    id: 'muscle_hamstrings',
    name: 'Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus)',
    latinName: 'Musculi ischiocrurales',
    commonName: 'Hamstrings / Posterior thigh muscles',
    system: 'muscular',
    region: 'thigh',
    meshId: 'muscle_hamstrings',
    location: 'Posterior compartment of the thigh',
    description: 'Three long biarticular muscles extending between the ischial tuberosity and the bones of the lower leg.',
    origin: ['Ischial tuberosity (long head biceps femoris, semitendinosus, semimembranosus)', 'Short head biceps femoris: Linea aspera of femur'],
    insertion: ['Biceps femoris: Fibular head and lateral tibial condyle', 'Semitendinosus: Pes anserinus of medial proximal tibia', 'Semimembranosus: Posterior medial condyle of tibia'],
    action: ['Flex the knee joint', 'Extend the hip joint during walking and running', 'Medially and laterally rotate flexed leg'],
    innervation: 'Sciatic nerve (tibial division for ischial origins; common fibular division for short head biceps femoris)',
    bloodSupply: 'Perforating branches of deep femoral (profunda femoris) artery',
    clinicalNotes: [
      'Hamstring strain is the most common muscle tear among high-speed sprinters, commonly occurring during the terminal swing phase of running.',
      'Avulsion fractures of the ischial tuberosity can occur in adolescent athletes.'
    ],
    tags: ['hamstrings', 'posterior thigh', 'knee flexion', 'hip extension', 'sprinter']
  },
  {
    id: 'muscle_gastrocnemius',
    name: 'Gastrocnemius',
    latinName: 'Musculus gastrocnemius',
    commonName: 'Calf muscle',
    system: 'muscular',
    region: 'leg',
    meshId: 'muscle_gastrocnemius',
    location: 'Superficial posterior compartment of the leg',
    description: 'Two-headed superficial muscle forming the visible contour of the calf. Crosses knee and ankle joints.',
    origin: ['Medial head: Posterosuperior medial femoral condyle', 'Lateral head: Posterolateral lateral femoral condyle'],
    insertion: ['Calcaneus (heel bone) via the Achilles (calcaneal) tendon'],
    action: ['Powerful plantarflexion of the foot at the talocrural joint', 'Assists knee flexion'],
    innervation: 'Tibial nerve (S1–S2)',
    bloodSupply: 'Sural arteries (branches of popliteal artery)',
    clinicalNotes: [
      'Achilles tendon rupture occurs during explosive push-off; identified clinically by positive Thompson squeeze test (lack of plantarflexion on calf compression).',
      'Deep vein thrombosis (DVT) frequently develops in the intramuscular soleal and gastrocnemius venous sinuses.'
    ],
    tags: ['calf', 'achilles tendon', 'plantarflexion', 'jumping', 'tibial nerve']
  }
];
