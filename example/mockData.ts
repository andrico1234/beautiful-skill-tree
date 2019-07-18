import SquatIcon from './squat.svg';

export type Skill = MajorSkill | MinorSkill;

export type MajorSkill = {
  id: string;
  icon: string;
  title: string;
  tooltipDescription: string;
  children: Skill[];
};

export type MinorSkill = {
  id: string;
  title: string;
  tooltipDescription: string;
  children: Skill[];
};

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
            icon: SquatIcon,
            title: 'Reverse Hyperextensions',
            tooltipDescription: lorem,
            children: [
              {
                id: 'cossack-squat',
                icon: SquatIcon,
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
                        icon: SquatIcon,
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
                    icon: SquatIcon,
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
                            icon: SquatIcon,
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
  {
    id: 'something-else',
    tooltipDescription: 'burn those leg muscles',
    title: 'Something Else',
    children: [],
  },
];

export const legsPullData: Skill[] = [
  {
    id: 'ol-deadlift',
    tooltipDescription:
      "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
    title: 'One-Legged Deadlift',
    children: [
      {
        id: '45deg-hip-nc',
        tooltipDescription:
          "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
        title: '45° Hip Nordic Curl',
        children: [
          {
            id: 'nordic-curl-negative',
            tooltipDescription:
              "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
            title: 'Nordic Curl (Negative)',
            children: [
              {
                id: 'nordic-curl',
                icon: SquatIcon,
                tooltipDescription:
                  "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
                title: 'Nordic Curl',
                children: [
                  {
                    id: 'tuck-ol-nordic-curl',
                    tooltipDescription:
                      "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
                    title: 'Tuck One-Legged Nordic Curl',
                    children: [
                      {
                        id: 'ol-nordic-curl',
                        tooltipDescription:
                          "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
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
