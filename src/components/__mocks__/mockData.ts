import { Skill } from 'models';

const lorem = 'lorem ipsum';

export const legsPushData: Skill[] = [
  {
    id: 'ass-squat',
    title: 'Assisted Squat',
    tooltipDescription: lorem,
    children: [
      {
        id: 'parallel-squat',
        title: 'Parallel Squat',
        tooltipDescription: lorem,
        children: [
          {
            id: 'full-squat',
            icon: './',
            title: 'Reverse Hyperextensions',
            tooltipDescription: lorem,
            children: [
              {
                id: 'cossack-squat',
                icon: './',
                title: 'Cossack Squat',
                tooltipDescription: lorem,
                children: [
                  {
                    id: 'ass-pistol-squat',
                    title: 'Pistol Squat (Assisted)',
                    tooltipDescription: lorem,
                    children: [
                      {
                        id: 'pistol-squat',
                        icon: './',
                        title: 'Pistol Squat',
                        tooltipDescription: lorem,
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'split-squat',
                title: 'Split Squat',
                tooltipDescription: lorem,
                children: [
                  {
                    id: 'bulgarian-split-squat',
                    icon: './',
                    title: 'Bulgarian Split Squat',
                    tooltipDescription: lorem,
                    children: [
                      {
                        id: 'deep-step-up',
                        title: 'Deep Step Up',
                        tooltipDescription: lorem,
                        children: [],
                      },
                      {
                        id: 'beg-shrimp-squat',
                        title: 'Beginner Shrimp Squat',
                        tooltipDescription: lorem,
                        children: [
                          {
                            id: 'shrimp-squat',
                            icon: './',
                            title: 'Shrimp Squat',
                            tooltipDescription: lorem,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
