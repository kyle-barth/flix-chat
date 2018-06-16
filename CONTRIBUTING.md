# Contributing to `flix-chat`

## Questions, Bugs, Features

### Have questions?

Avoid having to create issues for questions on GitHub. Use third party communication channels such as Messenger, Slack etc. if you have any questions.

### Found a bug?

Submit an issue on the GitHub repo with the tag `bug`.

### Feature request

Submit an issue on the GitHub repo with the tag `request`. 

## Submission Guidelines

Check that the same issue has not been submitted before.

If your issue appears to be a gub, use the `bug` tag to report it. 

It would be beneficial if you could provide the following information in issue submissions:

- Overview of the issue
- Explain why this is an issue/ bug 
- Particular browser and version a bug is reproducable on
- Steps to reproduce error
- Relation to similar issues?
- Suggestions for fix

## Pull Requests

Before submitting the pull request, consider the following: 

- Search for PR that relates to your submission - to avoid duplication.
- Make changes in a new branch from `develop` 
```
git checkout -b feature/feature_name develop 
```
- Update relevant documentation if your PR changes major aspects of the software
- Commit changes using a descriptive commit message that can be easily interpreted (no specific rules, just use your head)
- Check if automated tests are passing and fix if necessary (not yet imlemented)
- Give yourself a pat on the back for contributing
- Don't forget to clean up after yourself:

Delete remote branch (can also be done via GitHub web UI too):

    git push origin --delete branch_name

Checkout the develop branch:

    git checkout develop -f

Delete local branch:

    git branch -D branch_name

Update your develop with the latest version from the upstream

    git pull --ff upstream develop
