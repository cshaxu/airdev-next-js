# `@airdev/next` Docs

This folder is the project-level source of truth for what `@airdev/next` is
becoming and how it should be organized.

Start here:

- [goals.md](/D:/home/repos.package/airdev-next-js/docs/goals.md)
- [principles.md](/D:/home/repos.package/airdev-next-js/docs/principles.md)
- [structure.md](/D:/home/repos.package/airdev-next-js/docs/structure.md)
- [milestones.md](/D:/home/repos.package/airdev-next-js/docs/milestones.md)
- [technical/README.md](/D:/home/repos.package/airdev-next-js/docs/technical/README.md)

This doc set assumes the following package model:

- repo root: package code and package build/setup
- `test-project/`: local mock consumer app for fast package-boundary testing
- `barebone-next`: real external consumer app

Core intent:

- `@airdev/next` owns shared Next app infrastructure
- consumer apps own Prisma, Airent entities, generated hooks, and business logic
- package code should be testable locally without requiring `barebone-next`
