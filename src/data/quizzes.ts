import { QuizQuestion } from '../types/anatomy';

export const ANATOMY_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz_1',
    type: 'multiple_choice',
    question: 'Which ligament provides ~85% of total restraint against anterior displacement of the tibia relative to the femur?',
    system: 'ligamentous',
    targetStructureId: 'ligament_acl',
    options: [
      { id: 'opt_1', text: 'Posterior Cruciate Ligament (PCL)', isCorrect: false },
      { id: 'opt_2', text: 'Anterior Cruciate Ligament (ACL)', isCorrect: true, explanation: 'The ACL is the primary restraint resisting anterior tibial translation.' },
      { id: 'opt_3', text: 'Medial Collateral Ligament (MCL)', isCorrect: false },
      { id: 'opt_4', text: 'Patellar Ligament', isCorrect: false }
    ],
    explanation: 'The Anterior Cruciate Ligament (ACL) originates on the posteromedial lateral femoral condyle and inserts into the anterior intercondylar tibia, restraining anterior translation.'
  },
  {
    id: 'quiz_2',
    type: 'multiple_choice',
    question: 'A fracture of the humeral midshaft in the radial groove most commonly endangers which nerve?',
    system: 'skeletal',
    targetStructureId: 'bone_humerus',
    options: [
      { id: 'opt_1', text: 'Median nerve', isCorrect: false },
      { id: 'opt_2', text: 'Radial nerve', isCorrect: true, explanation: 'The radial nerve courses directly in the spiral (radial) groove along the midshaft humerus.' },
      { id: 'opt_3', text: 'Ulnar nerve', isCorrect: false },
      { id: 'opt_4', text: 'Axillary nerve', isCorrect: false }
    ],
    explanation: 'Midshaft humeral fractures can cause radial nerve neuropraxia or laceration, presenting clinically with wrist drop and loss of sensation over the dorsal first web space.'
  },
  {
    id: 'quiz_3',
    type: 'multiple_choice',
    question: 'Which muscle is the prime mover of arm abduction between 15° and 90°?',
    system: 'muscular',
    targetStructureId: 'muscle_deltoid',
    options: [
      { id: 'opt_1', text: 'Supraspinatus', isCorrect: false, explanation: 'Supraspinatus initiates abduction for the first 0°–15°.' },
      { id: 'opt_2', text: 'Deltoid (middle fibers)', isCorrect: true, explanation: 'The multipennate middle fibers of the deltoid power abduction from 15° to 90°.' },
      { id: 'opt_3', text: 'Pectoralis Major', isCorrect: false },
      { id: 'opt_4', text: 'Trapezius', isCorrect: false }
    ],
    explanation: 'While the supraspinatus initiates abduction (0°–15°), the middle fibers of the deltoid are the prime mover between 15° and 90°.'
  },
  {
    id: 'quiz_4',
    type: 'multiple_choice',
    question: 'The mental foramen is an anatomical landmark situated on which bone?',
    system: 'skeletal',
    targetStructureId: 'bone_mandible',
    options: [
      { id: 'opt_1', text: 'Maxilla', isCorrect: false },
      { id: 'opt_2', text: 'Mandible', isCorrect: true, explanation: 'The mental foramen transmits the mental nerve and vessels on the anterolateral body of the mandible.' },
      { id: 'opt_3', text: 'Frontal bone', isCorrect: false },
      { id: 'opt_4', text: 'Zygomatic bone', isCorrect: false }
    ],
    explanation: 'The mental foramen transmits the mental nerve (terminal sensory branch of inferior alveolar nerve, CN V3) to supply the chin and lower lip.'
  },
  {
    id: 'quiz_5',
    type: 'multiple_choice',
    question: 'Which is the most commonly injured ligament in an inversion ankle sprain?',
    system: 'ligamentous',
    targetStructureId: 'ligament_atfl',
    options: [
      { id: 'opt_1', text: 'Calcaneofibular ligament (CFL)', isCorrect: false },
      { id: 'opt_2', text: 'Anterior Talofibular Ligament (ATFL)', isCorrect: true, explanation: 'The ATFL is the weakest and most frequently torn lateral ankle ligament.' },
      { id: 'opt_3', text: 'Deltoid ligament', isCorrect: false },
      { id: 'opt_4', text: 'Posterior Talofibular Ligament (PTFL)', isCorrect: false }
    ],
    explanation: 'The ATFL is taut during plantarflexion and inversion, making it the primary structure damaged during lateral ankle sprains.'
  }
];
