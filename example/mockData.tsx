import React from 'react';
import SquatIcon from './squat.svg';
import { SkillType, SavedDataType } from '../src';

const lorem = 'lorem ipsum';

function FakeContent() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'white', textDecoration: 'none' }}
        href="https://calisthenicsskills.com"
      >
        Click here
      </a>
    </div>
  );
}

function DummyVideo() {
  return (
    <iframe
      style={{ border: 'none' }}
      id="ytplayer"
      width="100%"
      src="https://www.youtube.com/embed/J3TjDUnlclk"
    ></iframe>
  );
}

export const legsPushData: SkillType[] = [
  {
    id: 'ass-squat',
    title: 'Assisted Squat',
    tooltip: {
      content: <FakeContent />,
    },
    children: [
      {
        id: 'parallel-squat',
        title: 'Parallel Squat',
        optional: true,
        tooltip: {
          content: lorem,
          direction: 'left',
        },
        children: [
          {
            id: 'full-squat',
            icon: SquatIcon,
            title: 'Reverse Hyperextensions',
            tooltip: {
              direction: 'right',
              content: lorem,
            },
            children: [
              {
                id: 'cossack-squat',
                icon: SquatIcon,
                title: 'Cossack Squat',
                tooltip: {
                  content: lorem,
                },
                children: [
                  {
                    id: 'ass-pistol-squat',
                    title: 'Pistol Squat (Assisted)',
                    color: 'alternative',
                    tooltip: {
                      content: <DummyVideo />,
                    },
                    children: [
                      {
                        id: 'pistol-squat',
                        icon: SquatIcon,
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
                    icon: SquatIcon,
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
                        optional: true,
                        tooltip: {
                          content: lorem,
                        },
                        children: [
                          {
                            id: 'shrimp-squat',
                            icon: SquatIcon,
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
  {
    id: 'something-else',
    tooltip: {
      content: 'burn those leg muscles',
    },
    title: 'Something Else',
    children: [
      {
        id: 'shrimp-squat-1',
        icon: SquatIcon,
        title: 'Shrimp Squat',
        tooltip: {
          content: lorem,
        },
        children: [],
      },
      {
        id: 'other-squat',
        icon: SquatIcon,
        title: 'Other Squat',
        tooltip: {
          content: lorem,
        },
        children: [],
      },
    ],
  },
];

export const hpSavedData: SavedDataType = {
  'ol-deadlift': {
    optional: false,
    nodeState: 'selected',
  },
  '45deg-hip-nc': {
    optional: false,
    nodeState: 'unlocked',
  },
  'nordic-curl-negative': {
    optional: false,
    nodeState: 'locked',
  },
  'nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
  'tuck-ol-nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
  'ol-nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
};

export const legsPullData: SkillType[] = [
  {
    id: 'ol-deadlift',
    tooltip: {
      content:
        "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk. Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk. Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
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
                icon: SquatIcon,
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
