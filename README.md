# Beautiful Skill Tree

A small library to help get you implement beautiful, responsive, and satisfying skill trees to your React applications

---

## Examples

[Calisthenics Progressions](https://calisthenicsskills.com/)

---

## Getting started

`yarn add beautiful-skill-tree`

The package exposes the thre components `SkillTree`, `SkillTreeGroup` and `SkillTreeGroupProvider`.You'll also need to import the style sheet `beautiful-skill-tree/styles.css`.

The `SkillTree` is the component that takes your data and renders the tree of components.

The `SkillTreeGroup` is the component that groups skill trees and will expose in the future expose various methods and properties related to the skill tree.

The `SkillTreeGroupProvider` is the skill tree's context provider.

For those that like their data typed, you can import `SkillType` from the package.

Wrap your application like this:

```typescript
import { SkillTreeGroup, SkillTree, SkillProvider, SkillType } from 'beautiful-skill-tree';
import 'beautiful-skill-tree/styles.css';

const data: Skill[] = [];

<SkillProvider appId="test-example">
  <SkillTreeGroup>
    {skillCount => {
      <SkillTree title="Skill Tree" data={data} />
    }}
    </SkillTreeGroup>
<SkillProvider>
```

Run your application's starting script, access localhost to find an empty skill tree. The skill tree group will be empty until data is passed to the skill tree.

Add the following data to your skill tree and see what happens:

```typescript
const data: Skill[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    tooltipDescription:
      'This node is the top most level, and will be unlocked, and ready to be clicked.',
    children: [
      {
        id: 'hello-sun',
        title: 'Hello Sun',
        tooltipDescription:
          'This is a parent of the top node, and will locked while the parent isn’t in a selected state.',
        children: [],
      },
      {
        id: 'hello-stars',
        title: 'Hello Stars',
        tooltipDescription:
          'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        children: [],
      },
    ],
  },
];
```

Go to your browser and you should see this:

![Skill Tree Demo](https://media.giphy.com/media/j2qzDGItebWCtFA7lW/giphy.gif)

---

## Motivation

Is there anything more satisfying than the feeling of progression; you know, improving at something you care deeply about? Not likely! Be it in video games, web development, or your physical capabilities, very little gives us a sense of pride and accomplishment than gaining new skills and using them. My motivation was to make skill trees that feel satisfying and fun to use.

Unfortunately there aren't any React packages that enable us developers to easily create skill tree in their applications. This is where Beautiful Skill Tree comes in. BST is a small package that allows you to easily create your own skill trees that look great across devices and screen sizes.

---

## Component API

### SkillTree

#### id: `string` [*required*]

#### title: `string` [*required*]

#### data: `Skill` [*required*]

### SkillTreeGroup

#### children: `skillCount: () => React.ReactNode` [*required*]

### SkillProvider

#### appId: `string` [*required*]

### Skill (export as SkillType)

```typescript
type Skill[] = {
	id: string;
	title: string;
	tooltipDescription: string;
	icon?: string;
	children: Skill[];
}
```

---

## V1 Checklist

- [x] Skill
- [x] Animations
- [x] Progress saving
- [x] Tooltips
- [x] Icons
- [x] Responsive
- [ ] Reset skill sree
- [ ] CSS theming
- [ ] Expose skill tree state
- [ ] Optional nodes
- [ ] Side nodes
- [ ] Collapsable skill trees
- [ ] Keyboard only use
- [ ] Secret special surprise on tree completion

---

## Contributing

[contributing guidelines](/CONTRIBUTING.md)
