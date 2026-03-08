export const jobCategories = {
  Plumber: {
    question: 'What kind of plumbing work is needed?',
    options: [
      {
        label: 'Leak repair',
        next: {
          question: 'Where is the leak located?',
          options: [
            {
              label: 'Kitchen',
              next: {
                question: 'What appliance is leaking?',
                options: ['Sink', 'Dishwasher', 'Refrigerator water line'],
              },
            },
            {
              label: 'Bathroom',
              next: {
                question: 'What is leaking?',
                options: ['Toilet', 'Shower', 'Sink'],
              },
            },
          ],
        },
      },
      {
        label: 'Install new fixture',
        next: {
          question: 'What kind of fixture?',
          options: ['Toilet', 'Faucet', 'Shower Head'],
        },
      },
    ],
  },

  Electrician: {
    question: 'What kind of electrical work is needed?',
    options: [
      {
        label: 'Light installation',
        next: {
          question: 'What type of light?',
          options: ['Ceiling light', 'Wall light', 'Outdoor light'],
        },
      },
      {
        label: 'Power outage issue',
        next: {
          question: 'Where is the issue occurring?',
          options: ['Entire house', 'One room', 'Specific outlet'],
        },
      },
    ],
  },

  Painter: {
    question: 'What kind of painting work do you need?',
    options: [
      {
        label: 'Interior walls',
        next: {
          question: 'How many rooms?',
          options: ['1 room', '2-3 rooms', 'Whole house'],
        },
      },
      {
        label: 'Exterior painting',
        next: {
          question: 'What is the surface type?',
          options: ['Brick', 'Wood', 'Stucco'],
        },
      },
    ],
  },
};
