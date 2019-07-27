import { Skill } from 'models';

const lorem = 'lorem ipsum';

export const legsPushData: Skill[] = [
  {
    id: 'ass-squat',
    title: 'Assisted Squat',
    tooltip: {
      description: lorem,
    },
    children: [
      {
        id: 'parallel-squat',
        title: 'Parallel Squat',
        optional: true,
        tooltip: {
          description: lorem,
        },
        children: [
          {
            id: 'full-squat',
            icon: './',
            title: 'Reverse Hyperextensions',
            tooltip: {
              description: lorem,
            },
            children: [
              {
                id: 'cossack-squat',
                icon: './',
                title: 'Cossack Squat',
                tooltip: {
                  description: lorem,
                },
                children: [
                  {
                    id: 'ass-pistol-squat',
                    title: 'Pistol Squat (Assisted)',
                    tooltip: {
                      description: lorem,
                    },
                    children: [
                      {
                        id: 'pistol-squat',
                        icon: './',
                        title: 'Pistol Squat',
                        tooltip: {
                          description: lorem,
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'split-squat',
                title: 'Split Squat',
                tooltip: {
                  description: lorem,
                },
                children: [
                  {
                    id: 'bulgarian-split-squat',
                    icon: './',
                    title: 'Bulgarian Split Squat',
                    tooltip: {
                      description: lorem,
                    },
                    children: [
                      {
                        id: 'deep-step-up',
                        title: 'Deep Step Up',
                        tooltip: {
                          description: lorem,
                        },
                        children: [],
                      },
                      {
                        id: 'beg-shrimp-squat',
                        title: 'Beginner Shrimp Squat',
                        tooltip: {
                          description: lorem,
                        },
                        children: [
                          {
                            id: 'shrimp-squat',
                            icon: './',
                            title: 'Shrimp Squat',
                            tooltip: {
                              description: lorem,
                            },
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

export const legsPullData: Skill[] = [
  {
    id: 'ol-deadlift',
    tooltip: {
      description: lorem,
    },
    title: 'One-Legged Deadlift',
    children: [
      {
        id: '45deg-hip-nc',
        tooltip: {
          description: lorem,
        },
        title: '45° Hip Nordic Curl',
        children: [
          {
            id: 'nordic-curl-negative',
            tooltip: {
              description: lorem,
            },
            title: 'Nordic Curl (Negative)',
            children: [
              {
                id: 'nordic-curl',
                icon: './nnn',
                tooltip: {
                  description: lorem,
                },
                title: 'Nordic Curl',
                children: [
                  {
                    id: 'tuck-ol-nordic-curl',
                    tooltip: {
                      description: lorem,
                    },
                    title: 'Tuck One-Legged Nordic Curl',
                    children: [
                      {
                        id: 'ol-nordic-curl',
                        tooltip: {
                          description: lorem,
                        },
                        title: 'One-Legged Nordic Curl',
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
];
