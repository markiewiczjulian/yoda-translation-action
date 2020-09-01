const github = require("@actions/github");
const core = require("@actions/core");
const axios = require('axios').default;

async function run() {
    const githubAccessToken = core.getInput("githubAccessToken");
    const translationApiToken = core.getInput("translationApiToken");
    const result = await replaceGithubComments(translationApiToken, githubAccessToken);
}

async function getYodaTranslation(textToTranslate, translationApiToken) {
    try {
        const response = await axios.get(`https://api.funtranslations.com/translate/yoda.json`, {
            headers: prepareHeaders(translationApiToken),
            params: prepareParams(textToTranslate)
        })
        return response.data.contents.translated;
    } catch (err) {
        console.error(err);
    }
}

async function replaceGithubComments(translateApiToken, githubToken) {
    const { eventName, payload, repo } = github.context;
    const octokit = github.getOctokit(githubToken);
    if (eventName === 'issue_comment' || eventName === 'pull_request_review_comment') {
        const comment = payload.comment.body;
        const result = await getYodaTranslation(comment, translateApiToken);
        if (result) {
            await octokit.issues
                .updateComment({ ...repo, comment_id: payload.comment.id, body: `[translated from english, to yodish]:\n${result}` })
                .then(() => core.info("Translated comment to yodish..."))
                .catch((error) => core.error(error));
        } else {
            core.info(`There was no translation downloaded. Probably you exceeded the limits of a free version or your API key is not correct...`)
        }
    }
}

function prepareParams(textToTranslate) {
    if (textToTranslate) {
        return { 'text': textToTranslate };
    }
}

function prepareHeaders(apiToken) {
    if (apiToken) {
        return {
            'X-FunTranslations-Api-Secret': apiToken
        }
    }
}

run();
