## What?
New CI (continuous Integration) script that will be used to auto build and publish [@evercam/ui](https://www.npmjs.com/package/@evercam/ui) .

## Why?
in our current workflow, when we want to add something to `@evercam/ui`, we have to do everything locally, 

1. `yarn build`
2. `yarn publish`
3. commit and push our changes, get a code review, and merge it,

**_Imagine if you had a review that asked to make change in your code, or refactor it, then you have to build, publish,  and repeat all that steps. Also with every change, a new version will publish to npm._**

## How?
In the How we would do it, there is two side, in a `single repos or Polyrepos` or `monorepo`:

### Single repos:

In a single repo, I would use [changesets](https://github.com/changesets/changesets), we had a success on doing it and this is a [showcase](https://github.com/dr1tch/evercam-ui/blob/master/README.md) if you are interested.

The problem is that changeset will always make a PR when we want to publish a new release, and we also have to make a PR to get a review, this is so much and a long way and a developer will absolutely forget a step on that flow, changesets are used for that kind of projects (publishing npm packages), also on open-source projects, that two PRs and releasing process doesn't suit us for now. 

also we have a `monorepo` that is a bit complicated. So now we have to search for another solution to make it run on a monorepo project. 

### Monorepos

in monorepos, after a lot of trying to make it work with github actions, or changesets, it appears that the best way to do it is by a `js script` **(old school way)** and run it with github action script, here is a [showcase](https://github.com/dr1tch/reactify),

#### The flow:

1. We'll look inside the changed files and see if anything in the `packages/ui` repo changed, else the ci will be canceled.

![Capture d'écran 2023-11-14 115239](https://github.com/dr1tch/reactify/assets/35114389/b24f5a78-94c0-46da-a9c7-f842ac4c7b7c)


2. If there's changes inside ui repo, we'll upgrade the package version

![Capture d'écran 2023-11-14 115307](https://github.com/dr1tch/reactify/assets/35114389/bd9e751c-eed6-45a0-b65f-dfde3d67d271)


3. commit and push that changes
4. build the package 

![Capture d'écran 2023-11-14 115348](https://github.com/dr1tch/reactify/assets/35114389/cfa7cc5d-74e7-4a71-a430-8e8460033d22)


6. publish it to npm

![Capture d'écran 2023-11-14 115425](https://github.com/dr1tch/reactify/assets/35114389/f28ae178-a96f-4dca-a90a-c624fa0d15b7)


And this workflow will run only once when we merge our PR
