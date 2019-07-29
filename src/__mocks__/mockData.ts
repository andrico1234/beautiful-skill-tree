import { Skill } from 'models';

const lorem = 'lorem ipsum';

export const legsPushData: Skill[] = [
  {
    id: 'ass-squat',
    title: 'Assisted Squat',
    tooltip: {
      content: lorem,
    },
    children: [
      {
        id: 'parallel-squat',
        title: 'Parallel Squat',
        optional: true,
        tooltip: {
          content: lorem,
        },
        children: [
          {
            id: 'full-squat',
            icon: './',
            title: 'Reverse Hyperextensions',
            tooltip: {
              content: lorem,
            },
            children: [
              {
                id: 'cossack-squat',
                icon: './',
                title: 'Cossack Squat',
                tooltip: {
                  content: lorem,
                },
                children: [
                  {
                    id: 'ass-pistol-squat',
                    title: 'Pistol Squat (Assisted)',
                    tooltip: {
                      content: lorem,
                    },
                    children: [
                      {
                        id: 'pistol-squat',
                        icon: './',
                        title: 'Pistol Squat',
                        tooltip: {
                          content: lorem,
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
                  content: lorem,
                },
                children: [
                  {
                    id: 'bulgarian-split-squat',
                    icon: './',
                    title: 'Bulgarian Split Squat',
                    tooltip: {
                      content: lorem,
                    },
                    children: [
                      {
                        id: 'deep-step-up',
                        title: 'Deep Step Up',
                        tooltip: {
                          content: lorem,
                        },
                        children: [],
                      },
                      {
                        id: 'beg-shrimp-squat',
                        title: 'Beginner Shrimp Squat',
                        tooltip: {
                          content: lorem,
                        },
                        children: [
                          {
                            id: 'shrimp-squat',
                            icon: './',
                            title: 'Shrimp Squat',
                            tooltip: {
                              content: lorem,
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
      content: lorem,
    },
    title: 'One-Legged Deadlift',
    children: [
      {
        id: '45deg-hip-nc',
        tooltip: {
          content: lorem,
        },
        title: '45° Hip Nordic Curl',
        children: [
          {
            id: 'nordic-curl-negative',
            tooltip: {
              content: lorem,
            },
            title: 'Nordic Curl (Negative)',
            children: [
              {
                id: 'nordic-curl',
                icon: './nnn',
                tooltip: {
                  content: lorem,
                },
                title: 'Nordic Curl',
                children: [
                  {
                    id: 'tuck-ol-nordic-curl',
                    tooltip: {
                      content: lorem,
                    },
                    title: 'Tuck One-Legged Nordic Curl',
                    children: [
                      {
                        id: 'ol-nordic-curl',
                        tooltip: {
                          content: lorem,
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
