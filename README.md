## About
This is a Github action which translates the issue comments and pull request comments from english to yodish (Yoda language).

## Prerequisites
You have to create an secret, inside your repository where you intend to use the action, with Github Access Token inside ([here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) is Github doc about how to do it step by step). Also if you want to make more than 60 API calls daily (this is 5 calls per hour), you have to create a secret with token from [funtranslations](https://funtranslations.com/api/yoda) website.

## How to use it 
After you have added the Github Access Token as a secret you can start adding the configuration for your action within destined project. Here you can follow [this](https://docs.github.com/en/actions/language-and-framework-guides/using-nodejs-with-github-actions) doc from Github. But to surmise what needs to be done:
- you have to create, in the root of your project, directory called .github,
- then within this directory you have to add folder called workflows,
- inside workflows folder you should add main.yml file. Inside this file you should put code which is looking similar to this one (your Github user name will differ so you have to change the part with uses markiewiczjulian/yoda-translation-action@master and also you could have named your secrets other than me, so sections with properties: githubAccessToken, translationApiToken, would be your point of interest),
```yaml
name: Chuck Joke

on:
  pull_request_review_comment:
    types: [created, edited]
  issue_comment:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        name: Use Node.js 12.X
      - run: npm install
      - uses: markiewiczjulian/yoda-translation-master@master
        name: use chuck_norris_joke_action
        with:
          githubAccessToken: ${{secrets.GIT_ACCESS_TOKEN}}
          translationApiToken: ${{secrets.TRANSLATION_API_TOKEN}}
      - uses: actions/setup-node@v1
        name: use actions/setup-node
        with:
          node-version: "12.X"
        env:
          CI: true
```
Remember that translationApiToken is optional and if you don't have it (you want to use free tier on funtranslations), you simply don't include it in the yml file.

## How this works
After you or your colleague submits the comment inside an issue or pull request the action gets triggered. Action will replace the message to translation from funtranslations and also add the info at the text beginning (``[translated from english, to yodish]:``).

### MIT License

Copyright (c) 2020 Julian Markiewicz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
