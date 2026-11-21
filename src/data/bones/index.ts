import { BoneStructure } from '../../types/anatomy';

export const BONES_DATA: BoneStructure[] = [
  // --- SKULL ---
  {
    id: 'bone_frontal',
    name: 'Frontal Bone',
    latinName: 'Os frontale',
    commonName: 'Forehead bone',
    system: 'skeletal',
    region: 'skull',
    meshId: 'bone_frontal',
    classification: 'Flat bone',
    location: 'Anterior and superior portion of the cranium',
    description: 'A shell-shaped, pneumatic bone that forms the forehead, the superior margins and roofs of the orbits, and the anterior part of the cranial fossa.',
    anatomicalLandmarks: ['Supraorbital margin', 'Supraorbital notch/foramen', 'Glabella', 'Frontal sinus', 'Zygomatic process of frontal bone'],
    articulations: ['Parietal bones (coronal suture)', 'Nasal bones', 'Maxillae', 'Zygomatic bones', 'Sphenoid bone', 'Ethmoid bone'],
    functions: ['Protects the frontal lobes of the brain', 'Houses frontal paranasal sinuses', 'Forms the roof of the eye orbits'],
    bloodSupply: 'Supraorbital and supratrochlear arteries (branches of ophthalmic artery)',
    clinicalNotes: [
      'Frontal sinus fractures can result in CSF rhinorrhea if the cribriform plate or posterior table is compromised.',
      'Frontal bossing is observed in congenital disorders such as achondroplasia and rickets.'
    ],
    tags: ['skull', 'neurocranium', 'forehead', 'orbit', 'cranial vault']
  },
  {
    id: 'bone_parietal_left',
    name: 'Parietal Bone (Left)',
    latinName: 'Os parietale sinister',
    commonName: 'Left parietal skull bone',
    system: 'skeletal',
    region: 'skull',
    meshId: 'bone_parietal_left',
    classification: 'Flat bone',
    location: 'Superolateral aspect of the skull (left)',
    description: 'Forms the sides and roof of the cranium. Each parietal bone has a quadrangular shape with internal grooves etched by the middle meningeal artery.',
    anatomicalLandmarks: ['Superior and inferior temporal lines', 'Parietal eminence', 'Parietal foramen', 'Sulcus for superior sagittal sinus'],
    articulations: ['Frontal bone (coronal suture)', 'Contralateral parietal bone (sagittal suture)', 'Occipital bone (lambdoid suture)', 'Temporal bone (squamosal suture)'],
    functions: ['Encloses and shields the parietal lobes of the cerebral cortex', 'Provides attachment for temporal muscle fascia'],
    bloodSupply: 'Middle meningeal artery (internal surface groove), superficial temporal artery (external surface)',
    clinicalNotes: [
      'A blow to the pterion (where parietal, frontal, sphenoid, and temporal bones meet) can lacerate the middle meningeal artery, causing an epidural (extradural) hematoma.'
    ],
    tags: ['skull', 'neurocranium', 'parietal', 'vault', 'cranial']
  },
  {
    id: 'bone_parietal_right',
    name: 'Parietal Bone (Right)',
    latinName: 'Os parietale dexter',
    commonName: 'Right parietal skull bone',
    system: 'skeletal',
    region: 'skull',
    meshId: 'bone_parietal_right',
    classification: 'Flat bone',
    location: 'Superolateral aspect of the skull (right)',
    description: 'Paired quadrilateral cranial bone forming the calvaria dome on the right side.',
    anatomicalLandmarks: ['Superior and inferior temporal lines', 'Parietal eminence', 'Groove for middle meningeal artery'],
    articulations: ['Frontal bone', 'Left parietal bone', 'Occipital bone', 'Right temporal bone'],
    functions: ['Protects right parietal lobe', 'Attachment for temporalis muscle and cranial aponeurosis'],
    bloodSupply: 'Middle meningeal artery',
    clinicalNotes: ['Fractures across the squamosal suture can cause significant subdural or epidural bleeds.'],
    tags: ['skull', 'neurocranium', 'parietal', 'vault']
  },
  {
    id: 'bone_occipital',
    name: 'Occipital Bone',
    latinName: 'Os occipitale',
    commonName: 'Back of head bone',
    system: 'skeletal',
    region: 'skull',
    meshId: 'bone_occipital',
    classification: 'Flat bone',
    location: 'Posterior and inferior part of the cranium',
    description: 'Saucer-shaped bone forming the posterior cranial fossa and posterior base of the skull, punctured centrally by the foramen magnum.',
    anatomicalLandmarks: ['Foramen magnum', 'External occipital protuberance (inion)', 'Occipital condyles', 'Superior and inferior nuchal lines', 'Hypoglossal canal'],
    articulations: ['Atlas (C1 vertebra via occipital condyles)', 'Parietal bones', 'Temporal bones', 'Sphenoid bone (spheno-occipital synchondrosis)'],
    functions: ['Allows passage of medulla oblongata and vertebral arteries through foramen magnum', 'Articulates with spinal column allowing head nodding', 'Attachment for neck nuchal muscles'],
    bloodSupply: 'Occipital artery, posterior meningeal branch of ascending pharyngeal artery',
    clinicalNotes: [
      'Chiari malformations involve downward herniation of cerebellar tonsils through the foramen magnum.',
      'Occipital condyle fractures are unstable injuries requiring cervical spine immobilization.'
    ],
    tags: ['skull', 'foramen magnum', 'inion', 'craniocervical']
  },
  {
    id: 'bone_mandible',
    name: 'Mandible',
    latinName: 'Mandibula',
    commonName: 'Lower jaw bone',
    system: 'skeletal',
    region: 'skull',
    meshId: 'bone_mandible',
    classification: 'Irregular bone',
    location: 'Inferior aspect of the face',
    description: 'The strongest and largest bone of the human face. It is the only mobile bone of the skull (excluding the middle ear ossicles) and houses the lower dentition.',
    anatomicalLandmarks: ['Mental protuberance', 'Mandibular condyle (head)', 'Coronoid process', 'Mandibular angle (gonion)', 'Mental foramen', 'Mandibular foramen'],
    articulations: ['Temporal bones bilaterally at the Temporomandibular Joints (TMJ)'],
    functions: ['Mastication and speech articulation', 'Holds lower teeth within alveolar process', 'Attachment site for muscles of mastication (masseter, temporalis, pterygoids)'],
    bloodSupply: 'Inferior alveolar artery (branch of maxillary artery)',
    clinicalNotes: [
      'The mental nerve exits via the mental foramen; local dental anesthesia targets the inferior alveolar nerve at the mandibular lingula.',
      'Mandible fractures most commonly occur at the neck of the condyle, angle, and parasymphysis.'
    ],
    tags: ['jaw', 'facial skeleton', 'viscerocranium', 'TMJ', 'teeth']
  },

  // --- VERTEBRAL COLUMN ---
  {
    id: 'bone_vertebra_c1',
    name: 'Atlas (C1 Vertebra)',
    latinName: 'Atlas',
    commonName: 'First cervical vertebra',
    system: 'skeletal',
    region: 'vertebral_column',
    meshId: 'bone_vertebra_c1',
    classification: 'Irregular bone',
    location: 'Topmost cervical spine at the skull base',
    description: 'Ring-shaped cervical vertebra that lacks a vertebral body and spinous process. It directly supports the globe of the head.',
    anatomicalLandmarks: ['Anterior and posterior arches', 'Lateral masses', 'Superior articular facets (kidney-shaped)', 'Transverse foramina'],
    articulations: ['Occipital condyles (atlanto-occipital joint)', 'Axis / C2 dens (atlanto-axial joint)'],
    functions: ['Supports cranium weight', 'Facilitates flexion and extension of the head ("yes" nod)'],
    bloodSupply: 'Vertebral artery',
    clinicalNotes: [
      'A burst fracture of the C1 ring resulting from axial compressive loading is termed a "Jefferson fracture".'
    ],
    tags: ['spine', 'cervical', 'neck', 'c1', 'atlas']
  },
  {
    id: 'bone_vertebra_c2',
    name: 'Axis (C2 Vertebra)',
    latinName: 'Axis',
    commonName: 'Second cervical vertebra',
    system: 'skeletal',
    region: 'vertebral_column',
    meshId: 'bone_vertebra_c2',
    classification: 'Irregular bone',
    location: 'Upper cervical spine directly beneath the Atlas',
    description: 'Characterized by the odontoid process (dens), a tooth-like vertical projection that serves as a pivot around which the atlas turns.',
    anatomicalLandmarks: ['Odontoid process (dens)', 'Bifid spinous process', 'Superior and inferior articular facets', 'Transverse foramina'],
    articulations: ['Atlas (C1) anterior arch and transverse ligament', 'C3 vertebra'],
    functions: ['Acts as a pivot axis allowing head rotation ("no" rotation, ~50% of cervical rotation)'],
    bloodSupply: 'Vertebral arteries, anterior and posterior spinal arteries',
    clinicalNotes: [
      'Hangman fracture is a bilateral fracture of the pars interarticularis of the axis produced by violent hyperextension.',
      'Type II odontoid fractures through the base of the dens have a high nonunion rate due to precarious vascularity.'
    ],
    tags: ['spine', 'cervical', 'axis', 'dens', 'c2']
  },
  {
    id: 'bone_vertebra_lumbar',
    name: 'Lumbar Vertebrae (L1–L5)',
    latinName: 'Vertebrae lumbales',
    commonName: 'Lower back spine',
    system: 'skeletal',
    region: 'vertebral_column',
    meshId: 'bone_vertebra_lumbar',
    classification: 'Irregular bone',
    location: 'Lower back between thorax and sacrum',
    description: 'Five robust vertebrae characterized by large kidney-shaped vertebral bodies, thick laminae, and short hatchet-shaped spinous processes engineered to withstand heavy axial compressive forces.',
    anatomicalLandmarks: ['Massive kidney-shaped body', 'Mamillary process', 'Accessory process', 'Triangular vertebral foramen'],
    articulations: ['Adjacent lumbar vertebrae via intervertebral discs and zygapophysial (facet) joints', 'Sacrum (L5-S1)'],
    functions: ['Weight bearing of upper torso', 'Protection of cauda equina nerve roots', 'Flexion, extension, and lateral bending of trunk'],
    bloodSupply: 'Lumbar arteries originating from the abdominal aorta',
    clinicalNotes: [
      'Herniation of the nucleus pulposus most commonly occurs at L4-L5 or L5-S1, compressing the traversing nerve roots (sciatica).',
      'Spondylolisthesis is forward slippage of one lumbar vertebra relative to the one beneath it, often following pars defects (spondylolysis).'
    ],
    tags: ['spine', 'lumbar', 'lower back', 'sciatica', 'weight-bearing']
  },

  // --- THORACIC CAGE ---
  {
    id: 'bone_sternum',
    name: 'Sternum',
    latinName: 'Sternum',
    commonName: 'Breastbone',
    system: 'skeletal',
    region: 'thoracic_cage',
    meshId: 'bone_sternum',
    classification: 'Flat bone',
    location: 'Anterior midline of the thoracic cage',
    description: 'An elongated, flat bone divided into three distinct segments: manubrium, body (gladiolus), and xiphoid process. It anchors the rib cage and protects mediastinal organs.',
    anatomicalLandmarks: ['Jugular (suprasternal) notch', 'Clavicular notches', 'Sternal angle (Angle of Louis)', 'Xiphoid process', 'Costal facets'],
    articulations: ['Clavicles bilaterally (sternoclavicular joints)', 'True costal cartilages of ribs 1–7'],
    functions: ['Shields heart, ascending aorta, and mediastinal viscera', 'Anchors anterior rib cage during ventilatory mechanics', 'Primary site for bone marrow aspiration in adults'],
    bloodSupply: 'Internal thoracic (mammary) arteries',
    clinicalNotes: [
      'The sternal angle marks the level of the T4/T5 vertebral disk, bifurcation of trachea (carina), and start of aortic arch.',
      'Median sternotomy is the standard surgical entry for open-heart operations.'
    ],
    tags: ['chest', 'breastbone', 'thoracic cage', 'mediastinum', 'sternal angle']
  },
  {
    id: 'bone_ribs',
    name: 'Ribs (Costae 1–12)',
    latinName: 'Costae',
    commonName: 'Rib cage bones',
    system: 'skeletal',
    region: 'thoracic_cage',
    meshId: 'bone_ribs',
    classification: 'Flat bone',
    location: 'Thoracic wall encasing pleural and mediastinal cavities',
    description: 'Twelve pairs of curved, elastic bones forming the structural wall of the thorax: True ribs (1–7), False ribs (8–10), and Floating ribs (11–12).',
    anatomicalLandmarks: ['Head with articular demifacets', 'Neck', 'Tubercle', 'Costal groove (houses intercostal bundle VAN: Vein, Artery, Nerve)', 'Costal angle'],
    articulations: ['Thoracic vertebrae posteriorly (costovertebral & costotransverse joints)', 'Costal cartilages anteriorly'],
    functions: ['Dynamic expansion during inhalation and exhalation', 'Impact protection for lungs, heart, liver, and spleen'],
    bloodSupply: 'Posterior intercostal arteries (aorta) and anterior intercostal arteries (internal thoracic artery)',
    clinicalNotes: [
      'Flail chest occurs when 3 or more consecutive ribs are fractured in two or more places, causing paradoxical chest wall movement during breathing.',
      'Thoracocentesis needles are always inserted immediately superior to the lower rib margin to avoid lacerating the intercostal neurovascular bundle in the subcostal groove.'
    ],
    tags: ['chest', 'ribs', 'thorax', 'lungs', 'respiration']
  },

  // --- SHOULDER GIRDLE & UPPER LIMB ---
  {
    id: 'bone_clavicle',
    name: 'Clavicle',
    latinName: 'Clavicula',
    commonName: 'Collarbone',
    system: 'skeletal',
    region: 'shoulder_girdle',
    meshId: 'bone_clavicle',
    classification: 'Long bone',
    location: 'Superoanterior thorax connecting axial skeleton to shoulder',
    description: 'Double-curved S-shaped strut that props the shoulder joint away from the trunk, allowing maximum range of upper limb mobility. It is the first bone to ossify during human fetal development.',
    anatomicalLandmarks: ['Sternal end', 'Acromial end', 'Conoid tubercle', 'Trapezoid line', 'Subclavian groove'],
    articulations: ['Manubrium of sternum (sternoclavicular joint)', 'Acromion of scapula (acromioclavicular joint)'],
    functions: ['Transmits physical impacts from upper limb to axial skeleton', 'Maintains shoulder clearance from thorax for unimpeded arm swinging'],
    bloodSupply: 'Suprascapular, thoracoacromial, and internal thoracic arteries',
    clinicalNotes: [
      'The clavicle is one of the most frequently fractured bones in the human body, with 80% occurring at the junction of the middle and lateral thirds.',
      'Subclavian vessels and brachial plexus trunks lie immediately inferior to the middle third and are at risk during severe displaced fractures.'
    ],
    tags: ['shoulder', 'collarbone', 'pectoral girdle', 'strut']
  },
  {
    id: 'bone_scapula',
    name: 'Scapula',
    latinName: 'Scapula',
    commonName: 'Shoulder blade',
    system: 'skeletal',
    region: 'shoulder_girdle',
    meshId: 'bone_scapula',
    classification: 'Flat bone',
    location: 'Posterolateral aspect of the thoracic cage (ribs 2–7)',
    description: 'Large, flat, triangular bone forming the posterior aspect of the pectoral girdle. Houses the glenoid cavity for articulation with the humeral head.',
    anatomicalLandmarks: ['Glenoid cavity', 'Spine of scapula', 'Acromion', 'Coracoid process', 'Supraspinous and infraspinous fossae', 'Subscapular fossa'],
    articulations: ['Humeral head (glenohumeral joint)', 'Clavicle (acromioclavicular joint)', 'Thoracic cage posterior wall (scapulothoracic sliding joint)'],
    functions: ['Anchors 17 different muscle origins and insertions', 'Provides base of support for entire upper limb range of motion'],
    bloodSupply: 'Suprascapular artery, circumflex scapular artery (scapular collateral anastomosis)',
    clinicalNotes: [
      'Winged scapula is caused by injury to the long thoracic nerve, paralyzing the serratus anterior muscle so the medial border lifts off the thorax.',
      'Impingement syndrome involves the supraspinatus tendon becoming pinched under the acromion process.'
    ],
    tags: ['shoulder', 'shoulder blade', 'glenoid', 'rotator cuff']
  },
  {
    id: 'bone_humerus',
    name: 'Humerus',
    latinName: 'Humerus',
    commonName: 'Upper arm bone',
    system: 'skeletal',
    region: 'upper_limb',
    meshId: 'bone_humerus',
    classification: 'Long bone',
    location: 'Arm (brachium)',
    description: 'The longest and largest bone of the upper limb. Articulates proximally with the glenoid cavity of the scapula and distally with the radius and ulna at the elbow.',
    anatomicalLandmarks: ['Humeral head', 'Anatomical neck', 'Surgical neck', 'Greater and lesser tubercles', 'Intertubercular (bicipital) groove', 'Deltoid tuberosity', 'Radial groove', 'Capitulum', 'Trochlea', 'Medial and lateral epicondyles'],
    articulations: ['Scapula (glenohumeral joint)', 'Radius (capitulum humeri)', 'Ulna (trochlea humeri)'],
    functions: ['Acts as lever arm for powerful upper extremity motions: pushing, lifting, throwing'],
    bloodSupply: 'Anterior and posterior humeral circumflex arteries, deep brachial (profunda brachii) artery',
    clinicalNotes: [
      'Fracture of the surgical neck endangers the axillary nerve and posterior circumflex humeral artery.',
      'Midshaft humeral spiral fractures in the radial groove frequently damage the radial nerve, presenting clinically as "wrist drop".',
      'Medial epicondyle fractures endanger the ulnar nerve ("funny bone").'
    ],
    tags: ['arm', 'humerus', 'elbow', 'shoulder', 'radial nerve']
  },
  {
    id: 'bone_radius',
    name: 'Radius',
    latinName: 'Radius',
    commonName: 'Lateral forearm bone',
    system: 'skeletal',
    region: 'upper_limb',
    meshId: 'bone_radius',
    classification: 'Long bone',
    location: 'Lateral (thumb side) aspect of the forearm',
    description: 'Prismatic long bone that pivots around the ulna to produce pronation and supination of the hand. It bears the majority of load at the radiocarpal wrist joint.',
    anatomicalLandmarks: ['Radial head (disc-shaped)', 'Radial neck', 'Radial tuberosity (biceps insertion)', 'Styloid process of radius', 'Lister tubercle'],
    articulations: ['Capitulum of humerus', 'Radial notch of ulna (proximal radioulnar joint)', 'Ulna head (distal radioulnar joint)', 'Scaphoid and lunate carpal bones'],
    functions: ['Supination and pronation of hand', 'Transmits mechanical force from hand to arm'],
    bloodSupply: 'Radial and anterior/posterior interosseous arteries',
    clinicalNotes: [
      'Colles fracture is a distal radial metaphyseal fracture with dorsal displacement resulting from a fall onto an outstretched hand (FOOSH), giving a "dinner fork" deformity.',
      'Nursemaid elbow is a subluxation of the radial head from the annular ligament in young children.'
    ],
    tags: ['forearm', 'radius', 'wrist', 'pronation', 'supination']
  },
  {
    id: 'bone_ulna',
    name: 'Ulna',
    latinName: 'Ulna',
    commonName: 'Medial forearm bone',
    system: 'skeletal',
    region: 'upper_limb',
    meshId: 'bone_ulna',
    classification: 'Long bone',
    location: 'Medial (pinky side) aspect of the forearm',
    description: 'Stabilizing bone of the forearm, larger proximally and tapering distally. Forms the primary hinge joint with the trochlea of the humerus.',
    anatomicalLandmarks: ['Olecranon process (elbow tip)', 'Coronoid process', 'Trochlear notch', 'Radial notch of ulna', 'Ulnar styloid process'],
    articulations: ['Trochlea of humerus', 'Radius head proximally and ulnar notch distally', 'Articular disc (TFCC) at wrist'],
    functions: ['Forms firm stable hinge at the elbow', 'Stabilizes forearm while radius rotates around it'],
    bloodSupply: 'Ulnar artery and common interosseous artery',
    clinicalNotes: [
      'Monteggia fracture is a fracture of the proximal third of the ulnar shaft accompanied by dislocation of the radial head.',
      'Nightstick fracture is an isolated midshaft ulnar fracture caused by direct defensive blow to forearm.'
    ],
    tags: ['forearm', 'ulna', 'olecranon', 'elbow']
  },

  // --- PELVIS & LOWER LIMB ---
  {
    id: 'bone_pelvis',
    name: 'Hip Bone (Os Coxae)',
    latinName: 'Os coxae',
    commonName: 'Pelvic bone',
    system: 'skeletal',
    region: 'pelvis',
    meshId: 'bone_pelvis',
    classification: 'Irregular bone',
    location: 'Pelvic girdle anchoring lower limbs to axial spine',
    description: 'Large, flaring irregular bone formed by the embryonic fusion of three distinct bones: Ilium (superior), Ischium (posteroinferior), and Pubis (anteroinferior) at the triradiate cartilage within the cup-like acetabulum.',
    anatomicalLandmarks: ['Acetabulum', 'Iliac crest', 'Anterior Superior Iliac Spine (ASIS)', 'Ischial tuberosity (sit bone)', 'Greater sciatic notch', 'Obturator foramen', 'Pubic symphysis'],
    articulations: ['Contralateral hip bone (pubic symphysis)', 'Sacrum (sacroiliac joint)', 'Femur head (acetabulofemoral hip joint)'],
    functions: ['Transfers body weight from vertebral column to lower limbs', 'Protects pelvic organs (bladder, reproductive viscera, rectum)', 'Birth canal formation in females'],
    bloodSupply: 'Internal and external iliac arteries, superior and inferior gluteal arteries, obturator artery',
    clinicalNotes: [
      'ASIS is the attachment site for the inguinal ligament and sartorius muscle; can undergo avulsion fracture in adolescent sprinters.',
      'Pelvic ring fractures ("open book") can cause life-threatening retroperitoneal hemorrhage from torn internal iliac venous plexus.'
    ],
    tags: ['pelvis', 'ilium', 'ischium', 'pubis', 'acetabulum', 'hip']
  },
  {
    id: 'bone_femur',
    name: 'Femur',
    latinName: 'Os femoris',
    commonName: 'Thigh bone',
    system: 'skeletal',
    region: 'lower_limb',
    meshId: 'bone_femur',
    classification: 'Long bone',
    location: 'Thigh',
    description: 'The longest, heaviest, and strongest bone in the human body. Designed to support massive static loads and kinetic forces generated during running, jumping, and upright bipedal locomotion.',
    anatomicalLandmarks: ['Femoral head', 'Femoral neck', 'Greater trochanter', 'Lesser trochanter', 'Linea aspera', 'Medial and lateral condyles', 'Medial and lateral epicondyles', 'Adductor tubercle', 'Intercondylar fossa'],
    articulations: ['Acetabulum of pelvis (hip joint)', 'Tibia condyles (tibiofemoral knee joint)', 'Patella (patellofemoral joint)'],
    functions: ['Carries full upper body weight during bipedal standing and locomotion', 'Acts as long mechanical lever arm for prime hip and knee musculature'],
    bloodSupply: 'Medial and lateral femoral circumflex arteries (crucial for femoral head viability), deep femoral (profunda femoris) perforating branches',
    clinicalNotes: [
      'Subcapital femoral neck fractures frequently tear retinacular arteries from the medial circumflex femoral artery, leading to avascular necrosis (AVN) of the femoral head.',
      'Femoral shaft fractures are high-energy injuries associated with severe internal blood loss (up to 1000–1500 mL).'
    ],
    tags: ['thigh', 'femur', 'hip', 'knee', 'strongest bone', 'bipedal']
  },
  {
    id: 'bone_patella',
    name: 'Patella',
    latinName: 'Patella',
    commonName: 'Kneecap',
    system: 'skeletal',
    region: 'lower_limb',
    meshId: 'bone_patella',
    classification: 'Sesamoid bone',
    location: 'Anterior aspect of the knee joint within the quadriceps tendon',
    description: 'The largest sesamoid bone in the human body. Heart-shaped, it embeds entirely within the tendon of the quadriceps femoris muscle and articulates with the trochlear groove of the distal femur.',
    anatomicalLandmarks: ['Apex (pointing inferiorly)', 'Base (superior margin)', 'Medial and lateral articular facets', 'Anterior subcutaneous surface'],
    articulations: ['Patellar surface of femur (patellofemoral joint)'],
    functions: ['Increases mechanical leverage and torque angle of the quadriceps muscle by up to 30%', 'Protects anterior knee structures from direct blunt trauma'],
    bloodSupply: 'Genicular arterial anastomosis surrounding the knee',
    clinicalNotes: [
      'Patellar dislocations most commonly occur laterally due to the physiological valgus Q-angle of the knee.',
      'Chondromalacia patellae ("runner’s knee") is softening and degeneration of the retro-patellar articular cartilage.'
    ],
    tags: ['knee', 'kneecap', 'patella', 'sesamoid', 'quadriceps']
  },
  {
    id: 'bone_tibia',
    name: 'Tibia',
    latinName: 'Tibia',
    commonName: 'Shinbone',
    system: 'skeletal',
    region: 'lower_limb',
    meshId: 'bone_tibia',
    classification: 'Long bone',
    location: 'Anteromedial aspect of the lower leg',
    description: 'The second largest bone in the human body. It is the primary weight-bearing column of the lower leg, transmitting force from the femur directly to the talus in the foot.',
    anatomicalLandmarks: ['Tibial plateau (medial and lateral condyles)', 'Intercondylar eminence', 'Tibial tuberosity (patellar tendon insertion)', 'Anterior subcutaneous crest (shin)', 'Medial malleolus'],
    articulations: ['Femur condyles', 'Fibula (proximal and distal tibiofibular joints)', 'Talus (talocrural ankle joint)'],
    functions: ['Primary weight-bearing strut of the lower leg (bears >85% of total axial load)', 'Attachment for patellar tendon and calf/shin muscles'],
    bloodSupply: 'Anterior tibial artery, posterior tibial artery, nutrient tibial artery (largest nutrient artery in body)',
    clinicalNotes: [
      'Because the anterior crest and medial surface are subcutaneous, open (compound) fractures are more common in the tibia than any other long bone.',
      'Tibial fractures are the most frequent cause of acute compartment syndrome in the lower leg.'
    ],
    tags: ['shin', 'tibia', 'lower leg', 'ankle', 'weight-bearing']
  },
  {
    id: 'bone_fibula',
    name: 'Fibula',
    latinName: 'Fibula',
    commonName: 'Calf bone',
    system: 'skeletal',
    region: 'lower_limb',
    meshId: 'bone_fibula',
    classification: 'Long bone',
    location: 'Posterolateral aspect of the lower leg, running parallel to the tibia',
    description: 'Slender, long bone running along the lateral aspect of the leg. Although it bears negligible direct axial weight (~10-15%), it provides crucial muscle attachments and lateral stability to the ankle mortise.',
    anatomicalLandmarks: ['Fibular head', 'Fibular neck', 'Shaft', 'Lateral malleolus (forms outer ankle bump)', 'Malleolar fossa'],
    articulations: ['Tibia proximally (superior tibiofibular joint) and distally (tibiofibular syndesmosis)', 'Talus at ankle mortise'],
    functions: ['Provides rigid lateral wall for ankle mortise preventing lateral talar tilt', 'Anchors origins for evertor muscles (fibularis longus and brevis)'],
    bloodSupply: 'Fibular (peroneal) artery',
    clinicalNotes: [
      'The common fibular (peroneal) nerve winds tightly around the neck of the fibula. Blunt trauma or tight casts here can cause foot drop (inability to dorsiflex).',
      'The lateral malleolus is fractured in supination-external rotation ankle injuries (Weber classification).'
    ],
    tags: ['calf', 'fibula', 'lateral malleolus', 'foot drop', 'peroneal nerve']
  }
];
