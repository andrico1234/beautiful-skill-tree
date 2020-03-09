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

export const pushUpData: SkillType[] = [
  {
    id: 'ipu',
    title: 'Incline Push Up',
    tooltip: {
      content: 'hi',
    },
    children: [
      {
        id: 'pu',
        color: 'alternative',
        title: 'Push Up',
        tooltip: {
          content: 'hii',
        },
        children: [
          {
            id: 'dpu',
            title: 'Diamond Push Up',
            tooltip: {
              content: 'hi',
            },
            children: [],
          },
        ],
      },
    ],
  },
];

export const webDevData = [
  {
    id: 'Computer Science',
    title: 'Computer Science',
    tooltip: { content: 'Basic of computer science' },
    icon: SquatIcon,
    children: [
      {
        id: 'HTML',
        title: 'HTML',
        tooltip: {
          content:
            'HTML basics, Forms and Validations, Conventions and Best Practices',
        },
        children: [
          {
            id: 'HTML advanced',
            title: 'HTML advanced',
            tooltip: {
              content: 'Writing Semantic HTML, Accessibility, SEO Basics',
            },
            icon: SquatIcon,
            children: [
              {
                id: 'Web Components',
                title: 'Web Components',
                tooltip: {
                  content: 'Shadow DOM, Custom Elements, HTML Templates',
                },
                icon: SquatIcon,
                children: [],
              },
            ],
          },
        ],
        icon: SquatIcon,
      },
      {
        id: 'CSS',
        title: 'CSS',
        tooltip: {
          content:
            'Learn the basics, Making Layouts, Responsive design and Media Queries',
        },
        icon: SquatIcon,
        children: [
          {
            id: 'CSS3',
            title: 'CSS3',
            tooltip: {
              content:
                'Transform, Transition, Animation, @font-face, Flex, Grid, Pseudo-selector',
            },
            icon: SquatIcon,
            children: [
              {
                id: 'CSS Architecture',
                title: 'CSS Architecture',
                tooltip: { content: 'BEM, OOCSS, SMACSS' },
                icon: SquatIcon,
                children: [],
              },
              {
                id: 'CSS Preprocessor',
                title: 'CSS Preprocessor',
                tooltip: { content: 'Sass, PostCSS, Less' },
                icon: SquatIcon,
                children: [
                  {
                    id: 'CSS Frameworks',
                    title: 'CSS Frameworks',
                    tooltip: {
                      content:
                        'Reactstrap, Material UI, Tailwind CSS, Chakra UI, Bootstrap, Materialize CSS, Bulma',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                  {
                    id: 'Modern CSS',
                    title: 'Modern CSS',
                    tooltip: {
                      content:
                        'Styled Component, CSS Modules, Styled JSX, Emotion, Radium, Glamorous',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'JavaScript',
        title: 'JavaScript',
        icon: SquatIcon,
        tooltip: {
          content:
            'Syntax and Basic Construct, Learn DOM Manipulation, Learn Fetch API / Ajax (XHR), ES6+ and modular JavaScript',
        },
        children: [
          {
            id: 'Framework',
            title: 'Framework',
            icon: SquatIcon,
            tooltip: { content: 'React.js, Angular, Vue.js' },
            children: [
              {
                id: 'SSR',
                title: 'SSR',
                icon: SquatIcon,
                tooltip: { content: 'Next.js, Universal, Nuxt.js' },
                children: [],
              },
            ],
          },
          {
            id: 'Type Checkers',
            title: 'Type Checkers',
            icon: SquatIcon,
            tooltip: { content: 'TypeScript, Flow' },
            children: [],
          },
        ],
      },
      {
        id: 'Node Basic',
        title: 'Node Basic',
        tooltip: { content: 'Know the basics' },
        icon: SquatIcon,
        children: [
          {
            id: 'Package Managers',
            title: 'Package Managers',
            tooltip: { content: 'NPM, Yarn' },
            icon: SquatIcon,
            children: [
              {
                id: 'GraphQL',
                title: 'GraphQL',
                icon: SquatIcon,
                tooltip: { content: 'Apollo, Relay Modern' },
                children: [],
              },
              {
                id: 'Module Bundlers',
                title: 'Module Bundlers',
                icon: SquatIcon,
                tooltip: { content: 'Webpack, Rollup, Parcel' },
                children: [
                  {
                    id: 'Test Your Apps',
                    title: 'Test Your Apps',
                    tooltip: { content: 'Mocha, Chai, Ava, Jest' },
                    icon: SquatIcon,
                    children: [],
                  },
                  {
                    id: 'Applications',
                    title: 'Applications',
                    tooltip: {
                      content: 'React Native, Flutter, Ionic, Electron',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'Static Site Generators',
            title: 'Static Site Generators',
            tooltip: { content: 'GatsbyJS, Vuepress, Jekyll, Hugo' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
      {
        id: 'Version Control System',
        title: 'Version Control System',
        tooltip: { content: 'Git, SVN' },
        icon: SquatIcon,
        children: [
          {
            id: 'Repo Hosting Services',
            title: 'Repo Hosting Services',
            tooltip: { content: 'GitHub, Gitlab, Bitbucket' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
      {
        id: 'Internet',
        title: 'Internet',
        tooltip: { content: 'DNS, HTTP, Browsers, Domain' },
        icon: SquatIcon,
        children: [
          {
            id: 'Web Security',
            title: 'Web Security',
            tooltip: { content: 'HTTPS, CORS, Attacks' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
    ],
  },
];
