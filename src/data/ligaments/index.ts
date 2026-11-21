import { LigamentStructure } from '../../types/anatomy';

export const LIGAMENTS_DATA: LigamentStructure[] = [
  // --- KNEE JOINT ---
  {
    id: 'ligament_acl',
    name: 'Anterior Cruciate Ligament (ACL)',
    latinName: 'Ligamentum cruciatum anterius',
    commonName: 'ACL',
    system: 'ligamentous',
    region: 'knee_joint',
    meshId: 'ligament_acl',
    location: 'Intracapsular (extrasynovial) center of the knee joint',
    description: 'A dense band of regular collagenous connective tissue that courses obliquely from the posterior femur to the anterior tibia.',
    attachmentPoints: [
      'Origin: Posteromedial aspect of the lateral femoral condyle in the intercondylar notch',
      'Insertion: Anterior intercondylar area of the tibial plateau, between anterior attachments of medial and lateral menisci'
    ],
    function: [
      'Primary restraint against anterior translation of the tibia relative to the femur (provides ~85% of total restraining force)',
      'Secondary restraint against internal tibial rotation and excessive hyperextension'
    ],
    jointAssociation: 'Tibiofemoral knee joint',
    stabilityProvided: 'Anteroposterior and rotational knee stability',
    commonInjuries: [
      'ACL tear: Typically occurs during non-contact deceleration, pivoting, or sudden change of direction with the foot planted (valgus-external rotation or hyperextension)',
      'Patients report an audible "pop", immediate joint swelling (hemarthrosis), and knee instability/giving way',
      'Clinical examination: Positive Lachman test (most sensitive), anterior drawer test, and pivot-shift test'
    ],
    clinicalNotes: [
      'Unhappy triad of O’Donoghue: High-energy valgus blow to the flexed knee causing simultaneous injury to the ACL, MCL, and medial meniscus (often lateral meniscus acutely).'
    ],
    tags: ['knee', 'acl', 'cruciate', 'lachman', 'pivot', 'sports injury']
  },
  {
    id: 'ligament_pcl',
    name: 'Posterior Cruciate Ligament (PCL)',
    latinName: 'Ligamentum cruciatum posterius',
    commonName: 'PCL',
    system: 'ligamentous',
    region: 'knee_joint',
    meshId: 'ligament_pcl',
    location: 'Intracapsular (extrasynovial) space of the knee joint',
    description: 'Thicker and stronger than the ACL, crossing posterior to it to prevent posterior displacement of the tibia.',
    attachmentPoints: [
      'Origin: Anterolateral aspect of the medial femoral condyle within intercondylar notch',
      'Insertion: Posterior intercondylar fossa of the tibia, approximately 1 cm below the articular joint line'
    ],
    function: [
      'Primary restraint against posterior translation of the tibia relative to the femur (resists ~95% of posterior displacement force)',
      'Acts as a central pivot axis for knee rotation'
    ],
    jointAssociation: 'Tibiofemoral knee joint',
    stabilityProvided: 'Posterior sagittal knee stability',
    commonInjuries: [
      'Dashboard injury: Impact to proximal anterior tibia with the knee flexed at 90° during motor vehicle collision',
      'Hyperflexion injury during athletic falls',
      'Clinical examination: Positive posterior drawer test and posterior sag sign (Godfrey test)'
    ],
    clinicalNotes: [
      'PCL injuries can often be managed non-operatively when isolated, unlike complete ACL ruptures in young, active patients.'
    ],
    tags: ['knee', 'pcl', 'dashboard injury', 'cruciate', 'posterior sag']
  },
  {
    id: 'ligament_mcl',
    name: 'Medial Collateral Ligament (MCL / Tibial Collateral)',
    latinName: 'Ligamentum collaterale tibiale',
    commonName: 'MCL / Inner knee ligament',
    system: 'ligamentous',
    region: 'knee_joint',
    meshId: 'ligament_mcl',
    location: 'Medial aspect of the knee joint',
    description: 'Broad, flat, two-layered ligament (superficial and deep) spanning between the medial femoral epicondyle and proximal tibia.',
    attachmentPoints: [
      'Origin: Medial epicondyle of the femur immediately distal to the adductor tubercle',
      'Insertion: Proximal medial surface of the tibia, 4–5 cm below the joint line (superficial layer); firmly attached to medial meniscus (deep layer)'
    ],
    function: ['Primary restraint to valgus (knock-knee) stress', 'Restrains external tibial rotation'],
    jointAssociation: 'Knee joint (medial compartment)',
    stabilityProvided: 'Medial coronal joint stability against valgus loading',
    commonInjuries: [
      'Valgus stress injury from a direct lateral blow to the knee (e.g. football clip)',
      'Graded I (microscopic strain), II (partial tear), and III (complete disruption)',
      'Clinical exam: Valgus stress test at 30° flexion (isolates MCL) and 0° extension'
    ],
    clinicalNotes: [
      'Due to rich vascularity from superior and inferior medial genicular arteries, isolated MCL tears have high non-operative healing potential with bracing.'
    ],
    tags: ['knee', 'mcl', 'valgus', 'inner knee', 'collateral']
  },
  {
    id: 'ligament_lcl',
    name: 'Lateral Collateral Ligament (LCL / Fibular Collateral)',
    latinName: 'Ligamentum collaterale fibulare',
    commonName: 'LCL / Outer knee ligament',
    system: 'ligamentous',
    region: 'knee_joint',
    meshId: 'ligament_lcl',
    location: 'Lateral aspect of the knee joint',
    description: 'Cord-like extracapsular ligament separated from the lateral meniscus by the popliteus tendon.',
    attachmentPoints: [
      'Origin: Lateral epicondyle of the femur proximal and posterior to the popliteus groove',
      'Insertion: Lateral surface of the head of the fibula, anterior to the styloid process'
    ],
    function: ['Primary restraint to varus (bow-legged) stress', 'Restrains external tibial rotation at lower flexion angles'],
    jointAssociation: 'Knee joint (lateral compartment)',
    stabilityProvided: 'Lateral coronal stability and posterolateral corner restraint',
    commonInjuries: [
      'Varus stress from a direct blow to the medial knee',
      'Often injured in conjunction with the posterolateral corner (PLC) and common peroneal nerve',
      'Clinical exam: Varus stress test at 30° knee flexion'
    ],
    clinicalNotes: [
      'Because the LCL does not adhere to the lateral meniscus, it slides freely; complete rupture often requires surgical reconstruction due to poor spontaneous healing.'
    ],
    tags: ['knee', 'lcl', 'varus', 'fibular collateral', 'outer knee']
  },
  {
    id: 'ligament_patellar',
    name: 'Patellar Ligament',
    latinName: 'Ligamentum patellae',
    commonName: 'Patellar tendon',
    system: 'ligamentous',
    region: 'knee_joint',
    meshId: 'ligament_patellar',
    location: 'Anterior knee spanning from patella apex to tibial tuberosity',
    description: 'Extremely strong, thick fibrous band representing the distal continuation of the quadriceps femoris tendon.',
    attachmentPoints: [
      'Origin: Apex and adjacent margins of the patella and posterior rough depression of inferior pole',
      'Insertion: Tibial tuberosity of the proximal anterior tibia'
    ],
    function: ['Transfers the entire mechanical force of quadriceps contraction to the tibia to extend the knee joint'],
    jointAssociation: 'Patellofemoral and tibiofemoral knee joints',
    stabilityProvided: 'Anterior extensor mechanism alignment and patellar tracking',
    commonInjuries: [
      'Jumper’s knee (patellar tendinopathy): Overuse traction apophysitis/tendinopathy at inferior patellar pole',
      'Osgood-Schlatter disease: Traction apophysitis at the tibial tuberosity in rapidly growing adolescents',
      'Patellar tendon rupture: Catastrophic disruption causing high-riding patella (patella alta) and complete inability to perform straight-leg raise'
    ],
    clinicalNotes: [
      'Used as a standard bone-patellar tendon-bone (BPTB) autograft for anatomical ACL reconstruction.'
    ],
    tags: ['knee', 'patella', 'tendon', 'extensor mechanism', 'jumper knee']
  },

  // --- SHOULDER JOINT ---
  {
    id: 'ligament_glenohumeral',
    name: 'Glenohumeral Ligaments (Superior, Middle, Inferior)',
    latinName: 'Ligamenta glenohumeralia',
    commonName: 'Main shoulder joint ligaments',
    system: 'ligamentous',
    region: 'shoulder_joint',
    meshId: 'ligament_glenohumeral',
    location: 'Anterior capsule of the glenohumeral joint',
    description: 'Three distinct fibrous thickenings of the anterior capsule (SGHL, MGHL, IGHL) that provide static stability to the highly mobile shoulder joint.',
    attachmentPoints: [
      'Origin: Glenoid labrum and adjacent rim of the glenoid fossa of the scapula',
      'Insertion: Anatomical neck and lesser tubercle of the humerus'
    ],
    function: [
      'Superior GHL: Prevents inferior translation of humeral head with the arm adducted at the side',
      'Middle GHL: Restrains anterior translation from 0° to 45° of abduction',
      'Inferior GHL complex (anterior band, axillary pouch, posterior band): The primary static restraint against anterior, posterior, and inferior dislocation when the arm is abducted >90°'
    ],
    jointAssociation: 'Glenohumeral (shoulder) ball-and-socket joint',
    stabilityProvided: 'Anteroinferior capsular restraint against shoulder dislocation',
    commonInjuries: [
      'Bankart lesion: Avulsion of the anterior inferior glenoid labrum with detachment of the anterior band of the IGHL during traumatic anterior shoulder dislocation',
      'Hill-Sachs lesion: Compression fracture of posterosuperior humeral head impinging on anterior glenoid rim'
    ],
    clinicalNotes: [
      'Traumatic anterior dislocation accounts for ~95% of all shoulder dislocations, almost universally stretching or avulsing the IGHL complex.'
    ],
    tags: ['shoulder', 'glenohumeral', 'dislocation', 'bankart', 'ighl', 'labrum']
  },

  // --- ANKLE JOINT ---
  {
    id: 'ligament_atfl',
    name: 'Anterior Talofibular Ligament (ATFL)',
    latinName: 'Ligamentum talofibulare anterius',
    commonName: 'ATFL / Main sprained ankle ligament',
    system: 'ligamentous',
    region: 'ankle_foot',
    meshId: 'ligament_atfl',
    location: 'Anterolateral aspect of the talocrural joint',
    description: 'Short, flat ribbon-like ligament passing anteromedially from the lateral malleolus to the talar neck. It is the weakest of the lateral ankle ligaments.',
    attachmentPoints: [
      'Origin: Anterior margin of the lateral malleolus of the fibula',
      'Insertion: Lateral neck of the talus, anterior to the lateral articular facet'
    ],
    function: [
      'Resists ankle inversion (rolling inward) while the foot is plantarflexed',
      'Resists anterior displacement of the talus relative to the tibia/fibula mortise'
    ],
    jointAssociation: 'Talocrural (ankle) joint',
    stabilityProvided: 'Anterolateral talar stability and rotational constraint',
    commonInjuries: [
      'Inversion ankle sprain: The ATFL is the single most commonly injured ligament in the entire human body (>80% of all ankle injuries)',
      'Clinical examination: Positive anterior drawer test of the ankle (excessive forward glide of the foot relative to the leg)'
    ],
    clinicalNotes: [
      'Ottawa Ankle Rules are applied clinically to assess the necessity of radiographic evaluation after acute lateral ligament trauma.'
    ],
    tags: ['ankle', 'sprain', 'atfl', 'inversion', 'lateral malleolus']
  },
  {
    id: 'ligament_deltoid',
    name: 'Deltoid Ligament (Medial Collateral Ankle Ligament)',
    latinName: 'Ligamentum collaterale mediale articulationis talocruralis',
    commonName: 'Deltoid ligament of ankle',
    system: 'ligamentous',
    region: 'ankle_foot',
    meshId: 'ligament_deltoid',
    location: 'Medial aspect of the ankle',
    description: 'Extremely strong, thick, triangular fibrous band composed of superficial (tibionavicular, tibiocalcaneal, superficial tibiotalar) and deep (deep posterior and anterior tibiotalar) components.',
    attachmentPoints: [
      'Apex: Anterior and posterior borders and tip of the medial malleolus of the tibia',
      'Base: Navicular tuberosity, sustentaculum tali of calcaneus, and medial talar tubercle'
    ],
    function: [
      'Resists excessive eversion of the foot',
      'Maintains the medial longitudinal arch of the foot',
      'Firmly binds the talus into the ankle mortise'
    ],
    jointAssociation: 'Talocrural, subtalar, and talocalcaneonavicular joints',
    stabilityProvided: 'Exceptional medial ankle and hindfoot stability',
    commonInjuries: [
      'Eversion ankle sprain: Rare due to extreme ligament strength; severe eversion forces more commonly avulse the medial malleolus or produce a high fibular fracture (Pott fracture / Maisonneuve fracture)',
      'Associated with syndesmotic ruptures during severe rotational trauma'
    ],
    clinicalNotes: [
      'The deep posterior tibiotalar component is the strongest portion of the deltoid and is the primary stabilizer against lateral talar displacement.'
    ],
    tags: ['ankle', 'deltoid', 'eversion', 'medial malleolus', 'arch']
  }
];
