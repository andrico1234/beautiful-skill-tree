# 🌲🌲🌲 Beautiful Skill Tree

A small library to help get you implement beautiful, responsive, and satisfying skill trees into your React applications.

For every star Beautiful Skill Tree gets, £1 will be donated to [Trees for Life](https://treesforlife.org.uk/). As cool as it is creating beautiful trees in your apps, it's even cooler doing so in real life!

Beautiful Skill Tree has currently raised £105 (+ Gift Aid) thanks to the lovely folk starring this repo.

Thanks to my friends, family, coworkers, and strangers in ensuring that it has been tested across a diverse range of people.

Tested across devices using [Browserstack](https://www.browserstack.com/), thanks to their continued support for open source projects.

![browserstack logo](public/browserstack.png)

This package uses [tsdx](https://github.com/jaredpalmer/tsdx) and [np](https://github.com/sindresorhus/np) develop, build, package, and publish beautiful-skill-tree. I can't recommend either of them enough and they both make for an excellent TypeScript/JavaScript developer experience.

## Table of Contents

1. [Examples](#examples)
2. [Getting started](#getting-started)
3. [Motivation](#motivation)
4. [API](#api)
5. [Features](#features)
6. [Contributing](#contributing)

## Examples

- [Calisthenics Progressions](https://calisthenicsskills.com/)
- [Borderlands Skill Tree](http://borderlands-skill-tree.s3-website.eu-west-2.amazonaws.com/)
- [Applying Skill Trees to Education/Business/Sports](https://skilltree-b6bba.firebaseapp.com/about)

## Getting started

`yarn add beautiful-skill-tree`

The package exposes three components `SkillTree`, `SkillTreeGroup` and `SkillProvider`.

The `SkillTree` takes your data and renders the tree.

The `SkillTreeGroup` groups skill trees and exposes various methods and properties related to the collection of skill tree.

The `SkillProvider` is the skill tree's context provider.

For those that like their data typed, you can also import `SkillType`, `SkillGroupDataType`, `SkillThemeType` and `SavedDataType` from the package.

Wrap your application like this:

```tsx
import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from 'beautiful-skill-tree';

const data: SkillType[] = [];

<SkillProvider>
  <SkillTreeGroup>
    {({ skillCount }: SkillGroupDataType) => (
      <SkillTree
        treeId="first-tree"
        title="Skill Tree"
        data={data}
        collapsible
        description="My first skill tree"
      />
    )}
  </SkillTreeGroup>
</SkillProvider>;
```

Or, if you are coding in ES6, here's the code:

```jsx
import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType
} from 'beautiful-skill-tree';


const data = [];

<SkillProvider>
  <SkillTreeGroup>
    {({ skillCount }) => (
      <SkillTree
        treeId="first-tree"
        title="Skill Tree"
        data={data}
        collapsible
        description="My first skill tree"
      />
    })
    </SkillTreeGroup>
</SkillProvider>
```

Run your application's starting script and access localhost to find an empty skill tree. The skill tree will remain empty until data of type `Skill[]` is passed to through as a prop.

Optional `SkillTree` props include `collapsible`, `disabled` and `description`. `collapsible` is a boolean that detemrines whether or not the skill tree can collapse when the header is clicked. `disabled` gives programmatic control over whether a skill tree can be opened or not. The `description` prop adds a tooltip to the SkillTree header that displays on hover/touch.

Add the following data to your skill tree and see what happens:

```typescript
const data: SkillType[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    tooltip: {
      content:
        'This node is the top most level, and will be unlocked, and ready to be clicked.',
    },
    children: [
      {
        id: 'hello-sun',
        title: 'Hello Sun',
        tooltip: {
          content:
            'This is a parent of the top node, and will locked while the parent isn’t in a selected state.',
        },
        children: [],
      },
      {
        id: 'hello-stars',
        title: 'Hello Stars',
        tooltip: {
          content:
            'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        },
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

Is there anything more satisfying than the feeling of progression; improving at something you care deeply about? Not likely! Be it in video games, web development, or your physical capabilities, very little gives us a sense of pride and accomplishment than gaining new skills and using them. My motivation was to make skill trees that feel satisfying and fun to use.

Unfortunately there aren't any React packages that enable us developers to easily create skill trees in their applications. This is where Beautiful Skill Tree comes in. BST is a small package that allows you to easily create your own skill trees that look great across devices and screen sizes.

---

## API

### SkillTree

#### treeId: `string` [*required*]

#### title: `string` [*required*]

#### data: `SkillType` [*required*]

#### collapsible: `boolean` [*optional*]

#### closedByDefault `boolean` [*optional*]

#### disabled `boolean` [*optional*]

#### description: `string` [*optional*]

#### savedData: `SavedDataType` [*optional*]

#### handleSave: `(context: ContextStorage, treeId: string, skills: SkillType) => void` [*optional*]

#### handleNodeSelect: `(event: NodeSelectEvent) => void` [*optional*]

### SkillTreeGroup

#### theme: `SkillThemeType` [*optional*]

#### children: `(treeData: SkillGroupDataType) => React.ReactNode` [*required*]

### SkillProvider

### SkillType

```tsx
type SkillType[] = {
  id: string;
  title: string;
  optional?: boolean;
  tooltip: {
    content: React.ReactNode;
    direction?: 'top' | 'left' | 'right' | 'bottom', // top = default
  };
  icon?: string;
  children: SkillType[];
}
```

### SkillGroupDataType

```tsx
type SkillGroupData = {
  skillCount: SkillCount;
  selectedSkillCount: SkillCount;
  resetSkills: () => void;
  handleFilter: (query: string) => void;
};

type SkillCount = {
  optional: number;
  required: number;
};
```

### SavedDataType

```tsx
type SavedDataType = {
  [key: string]: {
    optional: boolean;
    nodeState: 'selected' | 'unlocked' | 'locked';
  };
};
```

### NodeSelectEvent

```tsx
type NodeSelectEvent = {
  key: string;
  state: 'selected' | 'unlocked' | 'locked';
};
```

---

## Features

### Filtering

The `<SkillTreeGroup />` component exposes the `handleFilter()` method which can be used to close any trees that don't contain skills that match the query. This can be used in conjunction with your own input component like so:

```tsx
<input
  style={{ height: '32px' }}
  onChange={e => handleFilter(e.target.value)}
  placeholder="Filter through trees..."
/>
```

The `closedByDefault` prop can also be passed through to the skill tree to ensure that the tree isn't open by default.

### Custom Themes

It's likely that you're application won't look to hot with a dark blue/rainbow themed skill tree. Fortunately, a custom theme can be supplied to the `SkillTreeGroup` component. The styles passed through will override the defaults to allow your skill tree to fit nicely into your application. The theme object's type is exported in the package as `SkillThemeType`. I don't perform any object merging between the default styles and the user-defined object, so you'll need to fill out the whole object.

There are some gotcha related to some of my hacky CSS. Because I like me some gradients, to get the borders looking all swanky, i've had to use the `border-image` css property to define the border color. This means that you'll need to supply a gradient too if you want to change the border color. To create a solid gradient, pass through:

```css
linear-gradient(
  to right,
  #ffffff 0%,
  #ffffff 100%
)
```

### URL Navigation

As each `<SkillTree />` should have a unique `treeId`, beautiful-skill-tree adds this value to a DOM node surrounding your tree as an `id` attribute. This means you can navigate to your trees via an anchor tag. For an app that has two skill trees with ids of `treeOne` and `treeTwo` respectively, you can create your own navigation like so:

```tsx
<nav>
  <ul>
    <li>
      <a href="#treeOne">Tree One</a>
    </li>
    <li>
      <a href="#treeTwo">TreeTwo</a>
    </li>
  </ul>
</nav>
```

### Custom Saving

`beautiful-skill-tree` automatically handles saving out of the box, but the implementation is fairly rudimental. The package saves the skills tree data to local storage when the application loads, which is great for:

- Creating simple skill trees
- Web apps that require no authentication
- Rapid prototyping

Saving to local storage is not great for:

- Data persistence across devices
- Web apps that require authentication
- Giving control to power users

Saving and loading works automatically, but it's possible pass in your own implementation, should you want to extend the save/loading capabilities, or if your application utilises authentication. The `SkillTree` component takes 2 optional properties that pertain solely to saving: `savedData` and `handleSave`. The former is an object with the shape of `SavedDataType` that sets the current state of the skill tree on load, while the `handleSave` function is an event handler that fires on save, and takes a `Storage` object, `treeId`, and `skills`.

```tsx
// the state of the skill tree, as per my custom implementation
const savedData: SavedDataType = {
  'item-one': {
    optional: false,
    nodeState: 'unlocked',
  },
  'item-two': {
    optional: false,
    nodeState: 'locked',
  },
};

function handleSave(
  storage: ContextStorage,
  treeId: string,
  skills: SavedDataType
) {
  return storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
}

const App = () => {
  return (
    <SkillProvider>
      <SkillTreeGroup theme={{ headingFont: 'impact' }}>
        {() => {
          return (
            <SkillTree
              treeId="treeOne"
              title="Save Example"
              data={exampleData} // defined elsewhere
              handleSave={handleSave}
              savedData={savedData}
            />
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
};
```

### Keyboard only use

The tree is currently fully navigable using the keyboard. Pressing the tab button will cycle through the nodes, while pressing enter will select the focused node.

---

## Contributing

[contributing guidelines](/CONTRIBUTING.md)

### Running locally

You'll need to clone the repo on your local machine and install the dependencies using `yarn`. Once the dependencies have been install start the local server. You'll also need to be using Node 10 or above.

If you're using nvm, you can ran `nvm use` to automatically use the version of Node specified in the `.nvmrc` file.

`git clone https://github.com/andrico1234/beautiful-skill-tree.git`

`cd ./beautiful-skill-tree`

`yarn:test` // optional but useful as a sanity check

`yarn`

`yarn start`

If you're having issues with any of the steps above, then please open a ticket with any error logging the console outputs. If your local server is working without any issues then open up a new terminal window in the same directory and start the local example. Running the example will spin up a demo app on `localhost:1234` which I use as a playground to display bst's feature set.

`cd ./example`

`yarn`

`yarn start`

access localhost:1234 in your browser.

### Contributors

- [Andrico Karoulla](https://github.com/andrico1234)
- [Juan Melendez](https://github.com/juanmanual)
