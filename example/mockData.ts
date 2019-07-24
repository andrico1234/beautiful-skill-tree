import SquatIcon from './squat.svg';
import { SkillType } from '../src';

const lorem = 'lorem ipsum';

export const legsPushData: SkillType[] = [
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
        tooltip: {
          description: lorem,
          direction: 'left',
          visible: true,
        },
        children: [
          {
            id: 'full-squat',
            icon: SquatIcon,
            title: 'Reverse Hyperextensions',
            tooltip: {
              direction: 'right',
              description: lorem,
            },
            children: [
              {
                id: 'cossack-squat',
                icon: SquatIcon,
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
                        icon: SquatIcon,
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
                    icon: SquatIcon,
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
                            icon: SquatIcon,
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
  {
    id: 'something-else',
    tooltip: {
      description: 'burn those leg muscles',
    },
    title: 'Something Else',
    children: [],
  },
];

export const legsPullData: SkillType[] = [
  {
    id: 'ol-deadlift',
    tooltip: {
      description:
        "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
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
                icon: SquatIcon,
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
