[![Libero][Libero logo]][Libero]  
  
Article Page
============

[![Build status][Build badge]][Build]
[![Open issues][Open issues badge]][Open issues]
[![License][License badge]][License]
[![Slack][Slack badge]][Libero Community Slack]

⚠️ This app does not yet do anything.

It's written in [TypeScript].

Table of contents
-----------------

1. [Development](#development)
   1. [Running the app](#running-the-app)
   2. [Running the tests](#running-the-tests)
2. [Contributing](#contributing)
3. [Getting help](#getting-help)
4. [License](#license)

Development
-----------

<details>

<summary>Requirements</summary>

- [Docker]
- [GNU Bash]
- [GNU Make]
- [Node.js]

</details>

The project contains a [Makefile] which uses [Docker Compose] for development and testing.

You can find the possible commands by executing:

```shell
make help
```

### Running the app

To build and run the app for development, execute:

```shell
make dev
```

The application will then sleep for 24 hours.

<details>

<summary>Rebuilding the container</summary>

Code is attached to the containers as volumes so most updates are visible without a need to rebuild the container.
However, changes to NPM dependencies, for example, require a rebuild. So you may need to execute

```shell
make build
```

before running further commands.

</details>

### Running the tests

We use [Jest] to test the app. You can run it by executing: 

```shell
make test
```

Contributing
------------

Pull requests and other contributions are more than welcome. Please take a look at the [contributing guidelines] for
further details.

Getting help
------------

- Report a bug or request a feature on [GitHub][new issue].
- Ask a question on the [Libero Community Slack].
- Read the [code of conduct].

License
-------

We released this software under the [MIT license][license]. Copyright © 2020 [eLife Sciences Publications, Ltd][eLife].

[Build]: https://github.com/libero/article-page/actions?query=branch%3Amaster+workflow%3ACI
[Build badge]: https://flat.badgen.net/github/checks/libero/article-page?label=build&icon=github
[Contributing guidelines]: https://github.com/libero/community/blob/master/CONTRIBUTING.md
[Docker]: https://www.docker.com/
[Docker Compose]: https://docs.docker.com/compose/
[eLife]: https://elifesciences.org/
[Code of conduct]: https://libero.pub/code-of-conduct
[GNU Bash]: https://www.gnu.org/software/bash/
[GNU Make]: https://www.gnu.org/software/make/
[Jest]: https://jestjs.io/
[Libero]: https://libero.pub/
[Libero Community Slack]: https://libero.pub/join-slack
[Libero logo]: https://cdn.elifesciences.org/libero/logo/libero-logo-96px.svg
[License]: LICENSE.md
[License badge]: https://flat.badgen.net/badge/license/MIT/blue
[Makefile]: Makefile
[New issue]: https://github.com/libero/publisher/issues/new/choose
[Node.js]: https://nodejs.org/
[Open issues]: https://github.com/libero/publisher/issues?q=is%3Aissue+is%3Aopen+label%3Aarticle-page
[Open issues badge]: https://flat.badgen.net/github/label-issues/libero/publisher/article-page/open?icon=github&label=open%20issues&color=pink
[Slack badge]: https://flat.badgen.net/badge/icon/libero-community?icon=slack&label=slack&color=orange
[TypeScript]: https://www.typescriptlang.org/
