<p align="center">
  <img alt="Logo" src="assets/img/logo.svg" width="100px"/>
</p>

<h1 align="center">
  Groveld's Jekyll Theme
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-lightgrey.svg?label=license&style=flat-square">
  <img alt="Discord" src="https://img.shields.io/discord/412919788168413194?label=discord&style=flat-square">
</p>

## GitHub Pages

To start your project, fork this repository. After forking the repo, your site will be live immediately on your personal Github Pages account, e.g. https://yourusername.github.io/your-repo-name/.

Make sure GitHub Pages is enabled for your repo. It might take some time for the site to propagate entirely.

## Getting Started

```shell
git clone https://github.com/groveld/jekyll-theme.git
cd jekyll-theme
gem install bundler && bundle install # Ensures you have all RubyGems needed
bundle exec jekyll serve # Build site and run a local server
```

The _front-matter_ of a **post** should look like this;

```txt
---
layout      : post
updated     : "2018-05-27@12:23"
author      : "John Doe"
email       : "johndoe@example.email"
title       : "Some Title Here"
description : "A very descriptive description here"
tags        : [some, tags, here]
---
```

The _front-matter_ of a **page** should look like this;

```txt
---
layout      : page
permalink   : /page-url
title       : "Some Title Here"
description : "A very descriptive description here"
---
```
